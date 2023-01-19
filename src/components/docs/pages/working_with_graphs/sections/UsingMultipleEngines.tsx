import { Section } from "../../../sections"
import { AiFillCheckCircle } from 'react-icons/ai'
import { ArticleLink, CenterTextBlock, CodeSegment, CodeSegmentCopyable, HighlightedText, InlineCodeSegment, PointList, TerminalSegment } from "../../../segments"


const switchToHTTP2Engine = `import random
from hedra.reporting.events.types import HTTPEvent
from hedra import (
	Analyze,
	Execute,
    Optimize,
	Setup,
	Submit,
	action,
	depends,
	JSONConfig
)

class SetupTest(Setup):
    batch_size=1000
    total_time='1m'


class SetupAltTest(Setup):
    batch_size=16000
    total_time='1m'


@depends(SetupTest, SetupAltTest)
class OptimizeBatchSize(Optimize):
    algorithm='shg'
    stage_time_limit='1m'
    optimize_iterations=10


@depends(OptimizeBatchSize)
class TestHTTPBin(Execute):

    @action()
    async def http2_get(self):
        # All we need to do is switch HTTP to HTTP2
        return await self.client.http2.get('https://httpbin.org/get')

    @action()
    async def http_post(self):
        return await self.client.http.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10)
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
                'test': random.randint(0, 10)
            }
        )

    @action()
    async def http2_delete(self):
        # Let's also make our HTTP request here HTTP2
        return await self.client.http2.delete('https://httpbin.org/delete')
    
    @check('http_get', 'http_post', 'http_put', 'http_delete')
    async def check_response(self, result: HTTPEvent):
        assert result.status >= 200 and result.status < 300

     
@depends(OptimizeBatchSize)
class TestHTTPBinAlt(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')

    @action()
    async def http2_post(self):
        # Let's switch things up in this stage by making the POST
        # and PUT requests HTTP2
        return await self.client.http2.post(
            'https://httpbin.org/post', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10)
            }
        )

    @action()
    async def http2_put(self):
        # Here too
        return await self.client.http2.put(
            'https://httpbin.org/put', 
            headers={
                'Content-Type': 'application/json'
            },
            data={
                'test': random.randint(0, 10)
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')

    @check('http_get', 'http_post', 'http_put', 'http_delete')
    async def check_response(self, result: HTTPEvent):
        assert result.status >= 200 and result.status < 300
        

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


const validateOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.24


Validating graph - My First Test - at - test.py.

Loaded graph.
Validating - 7 - stages.

Validation complete!

`


const pingOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.24


Pinging target - https://httpbin.org/get - using engine - http2.
Successfully connected to - https://httpbin.org/get!

`

const graphOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.26


Loading graph - Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 7 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBin, TestHTTPBinAlt - complete - Group Time Elapsed: 12s
✔ Optimized - batch sizes for stages - TestHTTPBin: 40000, TestHTTPBinAlt: 40000 
  - over 493 seconds - Group Time Elapsed: 8m.20s
✔ Stage - TestHTTPBinAlt completed 383097 actions at 5745 actions/second over 67 seconds 
  - Group Time Elapsed: 2m.28s
✔ Completed results analysis for 750516 actions and 2 stages over 13 seconds 
  - Group Time Elapsed: 19s
✔ Successfully submitted the results for 750516 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 11m.34s`


const UsingMultipleEngines = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const goodTestingItems = [
        "Use the engine that best matches the protocols or interaction types the target.",
        "Work up to larger batch sizes, and ensure you increase the time limit accordingly.",
        "Avoid long-running or complex Task hooks.",
        "If mixing engines, keep like engines grouped in the same stage.",
        "Break up complex stages into smaller, more efficient stages."
    ]

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                Up to this point we've only used Hedra's <ArticleLink article="Engines" subsection="HTTP" text="HTTP engine"/>. Let's kick things up a notch by adding some HTTP2 
                requests!
            </div>
            <br/>
            <div>
                To do so, we need only change the call to <InlineCodeSegment>self.client.http.get()</InlineCodeSegment> to <InlineCodeSegment>self.client.http2.get()</InlineCodeSegment> in 
                our test:
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
                {switchToHTTP2Engine}
            </CodeSegment>
            <div>
                Let's validate our changes:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                which returns:
            </div>
            <TerminalSegment command={validateOutput}/>
            <div>
                We also might want to verify that the HTTPBin server we're targeting accepts HTTP2 using Hedra's <InlineCodeSegment reference="Command Line#helper-commands">ping</InlineCodeSegment> command.
                Run:
            </div>
            <CodeSegmentCopyable>hedra ping https://httpbin.org/get --engine http2</CodeSegmentCopyable>
            <div>
                which returns:
            </div>
            <TerminalSegment command={pingOutput}/>
            <div>
                Let's run our test!
            </div>
            <CodeSegmentCopyable>hedra graph run my_first_test.py</CodeSegmentCopyable>
            <div>

            </div>
            <div>
                Our test executes as before! Hedra allows you to mix and match <em>any</em> available engines (including Engine plugins) in stages. However,
                note that mixing different engines can impact the performance of a given stage:
            </div>
            <TerminalSegment command={graphOutput}/>
            <div>
                While all our stages ran, each took significantly longer. When Hedra runs a test, each Execute stage's Persona will continue to generate new actions/tasks 
                until it reaches the <HighlightedText>pool limit</HighlightedText> - the number of actions or tasks currently executing <em>and</em> waiting to be executed. 
                This is equal to:
            </div>
            <CenterTextBlock>(2 * Number of CPUs * Stage Batch Size)/(Stage Workers)</CenterTextBlock>
            <div>
                So for an Execute stage with a batch size of 1000 virtual users executing over four CPU cores on a machine with eight total CPUs, the pool limit would be 4000 
                users. So in addition to the 1000 actions or tasks that can actively execute at a given time, at most an additional 3000 actions/tasks can wait to execute at 
                any given time. Once this threshold is reached, the Persona will pause generating new actions or tasks until there are no waiting actions or tasks.
            </div>
            <br/>
            <div>
                The purpose of the pool limit is twofold - first to keep Hedra from causing out-of-memory issues (OOM) and second to ensure active actions or tasks have sufficient 
                resources to execute as quickly as possible. If we spend all our CPU power generating new requests, existing ones won't be able to complete as quickly!
            </div>
            <br/>
            <div>
                Because of the pool limit, Hedra will often complete execution with incomplete actions or tasks that need to be "cleaned up" in order to prevent memory leaks or 
                other issues. While Hedra will execute a test and adhere to the specified time limit as strictly as possible, extensive cleanup of these incomplete actions or tasks 
                can cause a stage to run significantly longer than just the exection time limit.
            </div>
            <br/>
            <div>
                To prevent stages from spending excessive time cleaning up, we recommend:
            </div>
            <PointList
                name="good-testing-items"
                icons={goodTestingItems.map(_ => <AiFillCheckCircle/>)}
                points={goodTestingItems}
            />
            <div>
                In the case of our current test, while HTTPBin's endpoints can be targeted using HTTP2 it isn't the best Engine for that sort of work. We should instead target 
                things like web pages or systems that explicitly use HTTP2.
            </div>
        </div>
        </Section>

    )
}

export {
    UsingMultipleEngines
}
