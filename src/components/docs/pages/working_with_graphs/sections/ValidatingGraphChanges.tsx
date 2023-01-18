import { Section } from "../../../sections"
import { ArticleLink, CodeSegment, CodeSegmentCopyable, HighlightedText, InlineCodeSegment, TerminalSegment } from "../../../segments"


const multipleHTTPBinRequests = `from hedra import (
	Analyze,
	Execute,
	Setup,
	Submit,
	action,
	depends,
	JSONConfig
)

class SetupTest(Setup):
    batch_size=1000
    total_time='1m'


@depends(SetupTest)
class TestHTTPBin(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')
    
    # Here we add our POST, PUT, and DELETE requests to HTTPBin.
    @action()
    async def http_post(self):
        # Just like with Python's Requests we can pass headers and data, which
        # Hedra will automatically encode to the correct type based on the 
        # headers passed.
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json
            }, 
            data={
                'test': 'this'
            }
        )

    @action()
    async def http_put(self):
        return await self.client.http.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': 'this too!'
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')


@depends(TestHTTPBin)
class ProcessResults(Analyze):
    pass


@depends(ProcessResults)
class SubmitResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`


const multipleSetupAndExecuteStages = `from hedra import (
	Analyze,
	Execute,
	Setup,
	Submit,
	action,
	depends,
	JSONConfig
)

class SetupTest(Setup):
    batch_size=1000
    total_time='1m'


# Here we add our second Setup stage with a significantly
# larger batch size of 16000.
class SetupAltTest(Setup):
    batch_size=16000
    total_time='1m'


@depends(SetupTest)
class TestHTTPBin(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')

    @action()
    async def http_post(self):
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': 'this'
            }
        )

    @action()
    async def http_put(self):
        return await self.client.http.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': 'this too!'
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')


# And here we specify our second Setup stage as a dependency
# of our second Execute stage.
@depends(SetupAltTest)
class TestHTTPBinAlt(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')

    @action()
    async def http_post(self):
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': 'this'
            }
        )

    @action()
    async def http_put(self):
        return await self.client.http.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': 'this too!'
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')


# Note that we need to now pass both our Execute stages
# as dependencies for ProcessResults.
@depends(TestHTTPBin, TestHTTPBinAlt)
class ProcessResults(Analyze):
    pass


@depends(ProcessResults)
class SubmitResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`

const checkOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Validating graph - My First Test - at - my_first_test.py.

Loaded graph.
Validating - 6 - stages.

Validation complete!`


const graphOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 6 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt - complete - Group Time Elapsed: 5s
✔ Stage - TestHTTPBinAlt completed 386294 actions at 6315 actions/second over 61 seconds 
  - Group Time Elapsed: 1m.15s
✔ Completed results analysis for 400342 actions and 2 stages over 11 seconds 
  - Group Time Elapsed: 15s
✔ Successfully submitted the results for 400342 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 1m.51s
`


const ValidatingGraphChanges = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                A single HTTP request doesn't make for a very interesting (or useful) test. Let's turn things up a notch by adding both new <HighlightedText>Action</HighlightedText>
                hooks and second <HighlightedText>Setup</HighlightedText> and <HighlightedText>Execute</HighlightedText> stages.
            </div>
            <br/>
            <div>
                HTTPBin also has POST, PUT, and DELETE endpoints. Let's add requests to all of these in our <InlineCodeSegment>TestHTTPBin</InlineCodeSegment> stage: 
            </div>
            <CodeSegment
                language="python"
                theme={{
                    lineNumberColor: "eeeeee",
                    lineNumberBgColor: "#14151a",
                    backgroundColor: "#2e3131",
                    textColor: "#eeeeee",
                    functionColor: "#00f9fe",
                    keywordColor: "#0dc9a9",
                    sectionColor: "#00f9fe",
                    numberColor: "#aaffaa",
                    stringColor: "#7dfeff",
                    commentColor: "#aaaaaa"
                }}
            >
                {multipleHTTPBinRequests}
            </CodeSegment>
            <div>
                Just as before, we add methods containing calls to the HTTP Client and wrap them with the Action hook.
            </div>
            <br/>
            <div>
                Let's now add our second Setup and Execute stages. We'll execute the same requests as our first Execute stage but provide our second Setup stage as the dependency 
                with a much larger batch size of 16000 VUs.
            </div>
            <CodeSegment
                language="python"
                theme={{
                    lineNumberColor: "eeeeee",
                    lineNumberBgColor: "#14151a",
                    backgroundColor: "#2e3131",
                    textColor: "#eeeeee",
                    functionColor: "#00f9fe",
                    keywordColor: "#0dc9a9",
                    sectionColor: "#00f9fe",
                    numberColor: "#aaffaa",
                    stringColor: "#7dfeff",
                    commentColor: "#aaaaaa"
                }}
            >
                {multipleSetupAndExecuteStages}
            </CodeSegment>
            <div>
                In addition to adding the second Setup/Execute stage and specifying SetupAltTest as a dependency of TestHTTPBinAlt, we also must pass TestHTTPBinAlt
                as a dependecy of our existing Analyze stage (ProcessResults). This ensures that the results for <em>both</em> our stages are aggregated and output.
            </div>
            <br/>
            <div>
                Before running our graph, let's use Hedra's <InlineCodeSegment reference="Command Line#graph-commands">check</InlineCodeSegment> command to validate 
                our changes. Run:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                which outputs:
            </div>
            <TerminalSegment command={checkOutput}/>
            <div>
                Awesome! Now that we know our graph is valid, let's run the test 
            </div>
            <TerminalSegment command={graphOutput}/>
            <div>
                Just as before Hedra runs all our stages. Unlike our previous test graph, since we specified two Execute stages with no shared dependencies, Hedra executes 
                both concurrently (starts both without waiting for one or the other to finish first). Previously our single Execute stage used all physical CPU cores on our 
                machine. Because we're running two Execute stages at the same time Hedra splits the number of physical CPU cores evenly between the two stages.
            </div>
            <br/>
            <div>
                All stages types Hedra offers requre a minimum of one CPU core in order to run. Stages that can use more than one CPU core (such as Execute, Optimize, and Analyze
                stages) are referred to as <ArticleLink article="Stages" subsection="pool-awareness" text="pool aware" />. 
            </div>
        </div>
        </Section>

    )
}

export {
    ValidatingGraphChanges
}
