import { TerminalOutput } from "@shapes-org/react-terminal-ui"
import { Section } from "../../../sections"
import { CodeSegment, CodeSegmentCopyable, InlineCodeSegment } from "../../../segments"


const checkStatsExample = `"TestHTTPBin.http_put": {
    "name": "TestHTTPBin.http_put",
    "stage": "TestHTTPBin",
    "errors": [
        {
            "message": "Check - assert result.status >= 200 and result.status < 300 - for action - PUT_TestHTTPBin.http_put - failed.",
            "count": 635
        },
        {
            "message": "Connection timed out.",
            "count": 171
        }
    ],
    "total": 2387,
    "succeeded": 1581,
    "failed": 806,
    "actions_per_second": 39.12211622642689,
    "groups": {
        "total": {
            "name": "TestHTTPBin.http_put",
            "stage": "TestHTTPBin",
            "total": {
                "median": 11.168162793501324,
                "mean": 10.552396994703868,
                "variance": 0.0,
                "stdev": 0.0,
                "minimum": 4.19201497100039,
                "maximum": 19.937693990999833
            },`

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



const addChecks = `import random
# For help, let's import the HTTPEvent class to serve
# as a type hint.
from hedra.reporting.events.types import HTTPEvent
from hedra import (
	Analyze,
	Execute,
	Setup,
	Submit,
	action,
    check,
    # Import the check hook just like you would
    # the @action() hook.
    task,
	depends,
	JSONConfig
)

class SetupTest(Setup):
    batch_size=1000
    total_time='1m'


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
                'test': random.randint(0, 10)
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
                'test': random.randint(0, 10)
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')

    
    # We add our @check() hook here, passing in the method names of actions 
    # or tasks we want to check the results of!
    @check('http_get', 'http_post', 'http_put', 'http_delete')
    async def check_response(self, result: HTTPEvent):
        # Since we use only the HTTP enigne, we can be certain
        # the result type is an HTTPEvent.
        assert result.status >= 200 and result.status < 300


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
                'test': random.randint(0, 10)
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
                'test': random.randint(0, 10)
            }
        )

    @action()
    async def http_delete(self):
        return await self.client.http.delete('https://httpbin.org/delete')

    # We add our @check() hook here, passing in the method names of actions 
    # or tasks we want to check the results of!
    @check('http_get', 'http_post', 'http_put', 'http_delete')
    async def check_response(self, result: HTTPEvent):
        # Since we use only the HTTP enigne, we can be certain
        # the result type is an HTTPEvent.
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
✔ Stage - TestHTTPBinAlt completed 344937 actions at 5655 actions/second over 61 seconds 
  - Group Time Elapsed: 1m.12s
✔ Completed results analysis for 370226 actions and 2 stages over 14 seconds 
  - Group Time Elapsed: 18s
✔ Successfully submitted the results for 370226 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 1m.51s
`


const CheckingResults = ({
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
                So far we've executed quite a few requests but haven't validated any results! The <InlineCodeSegment reference="Hooks#check">@check()</InlineCodeSegment> hook 
                is responsible for Hedra's testing functionality, allowing you to add custom assertions are validate that results returned by applications or systems 
                are correct.
            </div>
            <br/>
            <div>
                Let's start by adding a single Check hook to both our stages that asserts that the response status is in the 2XX range (i.e. 200, 201, 202, etc.).
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
                {addChecks}
            </CodeSegment>
            <div>
                Note that, unlike Action or Task hooks, our Check hooks take arguments - the names of the Action/Task hook methods we want them to validate. Many hooks 
                in Hedra take arguments like this to further specify their behavior.
            </div>
            <br/>
            <div>
                Within our Check hook's method, we see assertions much like we'd expect in an unit or integration testing framework! The assert statements we write 
                here will be validated against each instance of an <InlineCodeSegment reference="Events#http">HTTPEvent</InlineCodeSegment>, which is the parsed version 
                of a single result of an HTTP request.
            </div>
            <br/>
            <div>
                Let's validate our changes:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                Looks good to go!
            </div>
            <TerminalOutput command={checkOutput} />
            <div>
                Let's run it!
            </div>
            <CodeSegmentCopyable>hedra graph run myy_first_test.py</CodeSegmentCopyable>
            <div>
                which returns:
            </div>
            <TerminalOutput command={graphOutput}/>
            <div>
                Awesome! Let's peek at our results!
            </div>
            <CodeSegment hideCopy={true}>
                {checkStatsExample}
            </CodeSegment>
            <div>
                Sure enough, some requests failed to return a 2XX response!
            </div>
            <br/>
            <div>
                Check hooks can be immensely useful for adding either granular or grouped validation to tests, helping us better understand how an application or 
                system performs both in throughput <em>and</em> correctness.
            </div>
        </div>
        </Section>

    )
}

export {
    CheckingResults
}
