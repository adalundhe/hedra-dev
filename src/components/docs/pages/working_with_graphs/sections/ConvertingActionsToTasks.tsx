import { Section } from "../../../sections"
import { CodeSegment, CodeSegmentCopyable, HighlightedText, InlineCodeSegment, TerminalSegment } from "../../../segments"


const addTaskHook = `from hedra import (
	Analyze,
	Execute,
	Setup,
	Submit,
	action,
    # Import the task hook just like you would
    # the @action() hook.
    task,
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

    # Then replace this @action() hook with the @task() hook!
    @task()
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
    
    # Also replace the action hook here!
    @task()
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

    # Also replace the action hook here!
    @task()
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

    # Also replace the action hook here!
    @task()
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


const randomPayload = `# Let's import Python's random library
import random
from hedra import (
	Analyze,
	Execute,
	Setup,
	Submit,
	action,
    # Import the task hook just like you would
    # the @action() hook.
    task,
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

    @task()
    async def http_post(self):
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10) # Make this random!
            }
        )

    @task()
    async def http_put(self):
        return await self.client.http.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10) # Make this random too!
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

    @task()
    async def http_post(self):
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10) # Make this random!
            }
        )
    
    @task()
    async def http_put(self):
        return await self.client.http.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10) # Make this random too!
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

const graphOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 6 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt - complete - Group Time Elapsed: 5s
✔ Stage - TestHTTPBinAlt completed 346231 actions at 5676 actions/second over 61 seconds 
  - Group Time Elapsed: 1m.18s
✔ Completed results analysis for 372177 actions and 2 stages over 9 seconds 
  - Group Time Elapsed: 13s
✔ Successfully submitted the results for 370177 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 1m.51s
`


const ConvertingActionsToTasks = ({
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
                So far our test has executed based on hardcoded data. What if our actions require dynamic data though? This is where Hedra's <InlineCodeSegment reference="Hooks#task">@task()</InlineCodeSegment> hooks
                come in!
            </div>
            <br/>
            <div>
                Unlike Actions, Tasks allow us to use dynamic data, execute arbitrary code before and after a client call, or otherwise write our hook as we please <HighlightedText>so long as it returns a valid result 
                from a registered Engine</HighlightedText>. Let's convert the POST and PUT actions in our Execute stages to tasks. Import the Task hook and replace the Action hooks:
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
                {addTaskHook}
            </CodeSegment>
            <div>
                Then let's re-run our validation:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                which complete return as before:
            </div>
            <TerminalSegment command={checkOutput}/>
            <div>
                Before we run our test, let's make one more quick change. Right now, the payloads for our POST and PUT tasks are hardcoded (static). Let's change the payload to 
                be a randomly generated number between zero and ten:
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
                {randomPayload}
            </CodeSegment>
            <div>
                Now let's run our graph!
            </div>
            <CodeSegmentCopyable>hedra graph run my_first_test.py</CodeSegmentCopyable>
            <div>
                which returns:
            </div>
            <TerminalSegment command={graphOutput}/>
            <div>
                Upon the graph completing, you'll notice that the actions-per-second (the number of Action or Task hook executions completed per second) for our 
                graph has taken a notable dip. Because they allow execution of arbitrary code, Tasks are not optimized like Actions - incurring a 20-30% reduction in 
                performance.
            </div>
            <br/>
            <div>
                In general, you should use Actions where possible to take advantage of the optimizations and additional validaiton measures offered. For workflows 
                where authorizaton tokens, randomness, or passing state are required - Tasks are the preferred choice.
            </div>
        </div>
        </Section>

    )
}

export {
    ConvertingActionsToTasks
}
