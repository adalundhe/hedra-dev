import { Section } from "../../../sections"
import { CodeSegment, CodeSegmentCopyable, InlineCodeSegment, TerminalSegment } from "../../../segments"


const preCheckpointExample = `from hedra import (
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
    # Change the first Optimize stage parameters
    # to run for ten iterations over one minute.
    stage_time_limit='1m'
    optimize_iterations=10


@depends(OptimizeBatchSize)
class TestHTTPBin(Execute):

    @action()
    async def http_get_google(self):
        # Use the HTTP Engine.
        return await self.client.http.get('https://httbin.org/get')

    @action()
    async def http_post(self):
        # Use the HTTP Engine.
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
        # Use the HTTP Engine.
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
        # Use the HTTP Engine.
        return await self.client.http.delete('https://httpbin.org/delete')


@depends(OptimizeBatchSize)
class TestHTTPBinAlt(Execute):

    @action()
    async def http_get_github(self):
        # Use the HTTP Engine.
        return await self.client.http.get('https://httbin.org/get')

    @action()
    async def http_post(self):
        # Use the HTTP Engine.
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
        # Use the HTTP Engine.
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
        # Use the HTTP Engine.
        return await self.client.http.delete('https://httpbin.org/delete')


# Here we add a second Optimize stage
@depends(TestHTTPBin, TestHTTPBinAlt)
class OptimizeBatchSizeTwo(Optimize):
    algorithm='shg'
    stage_time_limit='1m'
    optimize_iterations=10


# Here we add a third Execute stage
@depends(OptimizeBatchSizeTwo)
class TestHTTPBinThree(Execute):

    @action()
    async def http_get_github(self):
        return await self.client.http.get('https://httpbin.org/ip')


@depends(TestHTTPBinThree)
class ProcessResults(Analyze):
    pass


@depends(ProcessResults)
class SubmitResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`


const preCheckpointOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.26


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 9 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt, TestHTTPBin, TestHTTPBinThree - complete 
  - Group Time Elapsed: 8s
✔ Optimized - batch sizes for stages - TestHTTPBin: 61000, TestHTTPBinAlt: 61000 
  - over 148 seconds - Group Time Elapsed: 2m.34s
✔ Stage - TestHTTPBinAlt completed 636953 actions at 10066 actions/second over 63 seconds 
  - Group Time Elapsed: 2m.34s
✔ Optimized - batch sizes for stages - TestHTTPBinThree: 20000 - over 112 seconds 
  - Group Time Elapsed: 1m.58s
✔ Stage - TestHTTPBinThree completed 714529 actions at 11681 actions/second over 61 seconds 
  - Group Time Elapsed: 1m.16s
✔ Completed results analysis for 1976624 actions and 3 stages over 40 seconds 
  - Group Time Elapsed: 45s
✔ Successfully submitted the results for 1976624 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 9m.30s
`


const CheckpointingResults = ({
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
                Let's set all our actions to use the HTTP engine again, set our Optimize stage to run for ten iterations over one minute, and add another Optimize stage 
                after our existing two Execute stages followed by a third Execute stage:
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
                {preCheckpointExample}
            </CodeSegment>
            <div>
                Let's validate:
            </div>
            <CodeSegmentCopyable>hedra graph check my_first_test.py</CodeSegmentCopyable>
            <div>
                which should pass as before, then run our test:
            </div>
            <CodeSegmentCopyable>hedra graph run my_first_test.py</CodeSegmentCopyable>
            <div>
                which completes:
            </div>
            <TerminalSegment command={preCheckpointOutput}/>
            <div>
                Run the graph a few more times, taking care to note how much memory the graph now uses via Top or another usage monitoring tool. While on our persona machine 
                this usage may not be an issue, on smaller machines (like those run on cloud services) though this amount of memory may cause issues. 
            </div>
            <br/>
            <div>
                Once an Execute stage has completed its run, we don't necessarily need to store its results in-memory for the rest of the graph's execution. Instead, we can 
                use Hedra's <InlineCodeSegment reference="Stages#checkpoint">Checkpoint</InlineCodeSegment> stage type, <InlineCodeSegment reference="Hooks#save">@save()</InlineCodeSegment> hook,
                to write results to disk. We can then later load this checkpointed data via a Checkpoint stage and <InlineCodeSegment reference="Hooks#restore">@restore()</InlineCodeSegment> hook
                before passing it to an Analyze stage where it can be aggregated.
            </div>
            <br/>
            <div>
                Let's go ahead and the first Checkpoint stage we'll need with a Save hook. Import the Checkpoint stage and save hook, then modify the graph as below:
            </div>
        </div>
        </Section>

    )
}

export {
    CheckpointingResults
}
