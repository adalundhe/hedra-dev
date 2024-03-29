import { Section } from "../../../sections"
import { ArticleLink, CodeSegment, CodeSegmentCopyable, ExternalLink, HighlightedText, TerminalSegment } from "../../../segments"


const firstExecuteStageResults = `"TestHTTPBin.http_get": {
    "name": "TestHTTPBin.http_get",
    "stage": "TestHTTPBin",
    "errors": [
        {
            "message": "Connection timed out.",
            "count": 483
        }
    ],
    "total": 4526,
    "succeeded": 4043,
    "failed": 483,
    "actions_per_second": 74.13623585122167,
    "groups": {
        "total": {
            "name": "TestHTTPBin.http_get",
            "stage": "TestHTTPBin",
            "total": {
                "median": 0.2903212170000131,
                "mean": 1.8890877528177508,
                "variance": 0.0,
                "stdev": 0.0,
                "minimum": 0.043641741000016054,
                "maximum": 11.145562369000004
            },
...
`


const secondExecuteStageResults = `"TestHTTPBinAlt.http_get": {
    "name": "TestHTTPBinAlt.http_get",
    "stage": "TestHTTPBinAlt",
    "errors": [
        {
            "message": "Connection timed out.",
            "count": 922
        }
    ],
    "total": 112945,
    "succeeded": 112023,
    "failed": 922,
    "actions_per_second": 1846.27119420209,
    "groups": {
        "total": {
            "name": "TestHTTPBinAlt.http_get",
            "stage": "TestHTTPBinAlt",
            "total": {
                "median": 0.9169666980000102,
                "mean": 5.177468422695528,
                "variance": 0.0,
                "stdev": 0.0,
                "minimum": 0.043614537999985714,
                "maximum": 17.090946803999998
            },
...
`


const addOptimizeStage = `import random
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
    optimize_iterations=10


# Here we provide both our Setup stages as dependencies
# since we want to optimize both configs for both
# our stages.
@depends(SetupTest, SetupAltTest)
class OptimizeBatchSize(Optimize):
    algorithm='shg'
    stage_time_limit='1m'



# We then set OptimizeBatchSize as our dependency
# since we want to use the optimized params.
@depends(OptimizeBatchSize)
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

    @check('http_get', 'http_post', 'http_put', 'http_delete')
    async def check_response(self, result: HTTPEvent):
        assert result.status >= 200 and result.status < 300

# Likewise set OptimizeBatchSize as our dependency
# since we want to use the optimized params.       
@depends(OptimizeBatchSize)
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


const optimizeOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.24


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 7 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt, TestHTTPBin - complete - Group Time Elapsed: 8s
[ ===] > Optimizer - OptimizeStages optimizing TestHTTPBin, TestHTTPBinAlt w/ SHG 
- Total Time Elapsed: 26s
`


const optimizeCompleteOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 7 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt, TestHTTPBin - complete - Group Time Elapsed: 8s
✔ Optimized - batch size for - TestHTTPBin: 4026, TestHTTPBinAlt: 4355 
  - over 268 seconds 
  - Group Time Elapsed: 4m.33s
✔ Stage - TestHTTPBin, TestHTTPBinAlt completed 
  - 783305 actions at 12634 actions/second over 62 seconds 
  - Group Time Elapsed: 1m.24s
✔ Completed results analysis for 783305 actions and 2 stages over 15 seconds 
  - Group Time Elapsed: 20s
✔ Successfully submitted the results for 783305 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 6m.39s
`

const optimizedFirstStageResults = `"TestHTTPBin.http_get": {
    "name": "TestHTTPBin.http_get",
    "stage": "TestHTTPBin",
    "errors": [
        {
            "message": "Connection timed out.",
            "count": 36
        }
    ],
    "total": 110514,
    "succeeded": 110118,
    "failed": 36,
    "actions_per_second": 1798.3249396709055,
    "groups": {
        "total": {
            "name": "TestHTTPBin.http_get",
            "stage": "TestHTTPBin",
            "total": {
                "median": 1.553227528998832,
                "mean": 5.171917713023394,
                "variance": 0.0,
                "stdev": 0.0,
                "minimum": 0.04299453900057415,
                "maximum": 11.815108962999147
            },
...
`


const optimizedSecondStageResults = `"TestHTTPBinAlt.http_get": {
    "name": "TestHTTPBinAlt.http_get",
    "stage": "TestHTTPBinAlt",
    "errors": [
        {
            "message": "Connection timed out.",
            "count": 156
        }
    ],
    "total": 117635,
    "succeeded": 117479,
    "failed": 156,
    "actions_per_second": 1909.626859166739,
    "groups": {
        "total": {
            "name": "TestHTTPBinAlt.http_get",
            "stage": "TestHTTPBinAlt",
            "total": {
                "median": 1.3285210059993915,
                "mean": 5.023778111543646,
                "variance": 0.0,
                "stdev": 0.0,
                "minimum": 0.04296237699963967,
                "maximum": 12.440911997999137
            },`


const AddingAnOptimizer = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                Let's take a look at the results from our previous test! Comparing:
            </p>
            <CodeSegment hideCopy={true}>
                {firstExecuteStageResults}
            </CodeSegment>
            <p>
                to:
            </p>
            <CodeSegment hideCopy={true}>
                {secondExecuteStageResults}
            </CodeSegment>
            <p>
                it's clear that our second Execute stage greatly benefitted from the higher batch size. Is there a way to find 
                an optimal batch size so that <em>both</em> our Execute stages perform well?
            </p>
            <br/>
            <p>
                This is where <HighlightedText>Optimizers</HighlightedText> come in! Let's find a good batch size by adding an <HighlightedText>Optimize</HighlightedText> stage, 
                setting it as the dependency for both our Execute stages.
            </p>
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
                {addOptimizeStage}
            </CodeSegment>
            <div>
                We'll need to add both our Setup stages as dependencies for our Optimize stage and our Optimize stage as a dependency for both our 
                Execute stages. We then specify the algorithm as <ArticleLink article="Optimizers" subsection="shg" text="shg" />, set the total time limit 
                to one minutes, and the maximum number of iterations (times the algorithm will attempt to find the best parameters possible) to ten.
            </div>
            <br/>
            <div>
                Let's again vaidate our changes by running:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                which retruns:
            </div>
            <TerminalSegment command={validateOutput}/>
            <div>
                Perfect! Let's run our graph as before:
            </div>
            <CodeSegmentCopyable>hedra graph run my_first_test.py</CodeSegmentCopyable>
            <div>
                Our Optimize stage runs immediately after our Setup stages, taking in the initial config we provided each Setup stage as initial parameters 
                for the algorithm and basing the minimum and maximum range of batch sizes it will search over off of the Optimize stages's configuraiton:
            </div>
            <TerminalSegment command={optimizeOutput}/>
            <div>
                Upon completion of all iterations or reaching the specified time limit, our stage returns the batch size (or additional parameters) that 
                resulted in the highest actions-per-second rate, which our Execute stages will use instead of the batch sizes we specified in the earlier 
                Setup stages.
            </div>
            <br/>
            <TerminalSegment command={optimizeCompleteOutput}/>
            <div>
                Our Optimizer find a batch size of 4062 VUs works best for our first Execute stage and 4355 VUs works best for our second Execute stage. With our 
                test run complete, we immediately note that the combined completed requests and actions-per-second shown by Hedra for both stages is significantly
                higher than our previous test run.
            </div>
            <br/>
            <div>
                However, we also want to ensure that <em>both</em> stages performed relatively the same. Let's examine our results output in more detail by 
                opening the output JSON metrics file again:
            </div>
            <CodeSegment hideCopy={true}>
                {optimizedFirstStageResults}
            </CodeSegment>
            <div>
                Our first Execute stage has both higher overal actions completed and actions-per-second, but what about our second Execute stage?
            </div>
            <CodeSegment hideCopy={true}>
                {optimizedSecondStageResults}
            </CodeSegment>
            <div>
                Likewise, our second Execute stage also improves upon its previous performance and is much closer to our first Execute stage in 
                throughput than before. Using Optimizers, we achieved our goal of more balanced test performance while also improving the performance of 
                the test as whole.
            </div>
        </div>
        </Section>

    )
}

export {
    AddingAnOptimizer
}
