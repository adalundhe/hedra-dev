import { Section } from "../../../sections"
import { ArticleLink, CodeSegment, CodeSegmentCopyable, InlineCodeSegment, TerminalSegment } from "../../../segments"


const preCheckpointExample = `import random
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

const checkpointsGraphOne = `# We import json to serialize and deserialize
# our data.
import json
import random
# Let's also import soe type hints.
from typing import List, Dict, Union, Any
from hedra.reporting.events.types import HTTPEvent
from hedra import (
	Analyze,
    # We'll need to import the Checkpoint stage.
    Checkpoint,
	Execute,
    Optimize,
	Setup,
	Submit,
	action,
    check,
	depends,
    # we'll also need to import the @save() and
    # @restore() hooks
    save,
    restore,
    task,
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
    async def http_get(self):
        return await self.client.http.get('https://httbin.org/get')

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



@depends(OptimizeBatchSize)
class TestHTTPBinAlt(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httbin.org/get')

    @action()
    async def http_post(self):
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
    async def http_put(self):
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


# This is our first Checkpoint stage, which
# saves our previous to Execute stages' results
# to the file specifeid in the @save() hook.
@depends(TestHTTPBin, TestHTTPBinAlt)
class SaveStagesToDisk(Checkpoint):
    
    # @save() hooks let you take data from context
    # under the given context key, transform it as
    # needed, and store it at the provided path.
    @save(key='results', checkpoint_filepath='./results.json')
    async def save_to_disk(self, results: Dict[str, Dict[str, Any]):        
        return json.dumps(results, indent=4)


@depends(SaveStagesToDisk)
class OptimizeBatchSizeTwo(Optimize):
    algorithm='shg'
    stage_time_limit='1m'
    optimize_iterations=10



@depends(OptimizeBatchSizeTwo)
class TestHTTPBinThree(Execute):

    @action()
    async def http_get_ip(self):
        return await self.client.http.get('https://httpbin.org/ip')

    @check('http_get_ip')
    async def check_response(self, result: HTTPEvent):
        assert result.status >= 200 and result.status < 300


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


const checkpointOneOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.26


Loading graph - Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 10 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBinAlt, TestHTTPBin, TestHTTPBinThree - complete 
  - Group Time Elapsed: 8s
✔ Optimized - batch sizes for stages - TestHTTPBin: 61000, TestHTTPBinAlt: 61000 
  - over 138 seconds - Group Time Elapsed: 2m.23s
✔ Stage - TestHTTPBinAlt completed 661703 actions at 10149 actions/second over 
  - 65 seconds - Group Time Elapsed: 2m.30s
✔ Checkpoint complete - Restored 0 items and saved 1 items 
  - Group Time Elapsed: 40s
✔ Optimized - batch sizes for stages - TestHTTPBinThree: 19437 - over 115 seconds 
  - Group Time Elapsed: 2m.1s
✔ Stage - TestHTTPBinThree completed 861386 actions at 14042 actions/second over 
  - 61 seconds - Group Time Elapsed: 1m.19s
✔ Completed results analysis for 861386 actions and 1 stages over 18 seconds 
  - Group Time Elapsed: 23s
✔ Successfully submitted the results for 861386 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 9m.39s
`

const checkpointFile = `{
    "TestHTTPBin": {
        "total_elapsed": 61.397530652997375,
        "total_results": 451633,
        "serialized_results": [
            {
                "url": "https://httpbin.org/delete",
                "method": "DELETE",
                "path": "/delete",
                "params": "",
                "query": "",
                "type": "HTTP",
                "headers": {
                    "date": "Thu, 19 Jan 2023 22:58:35 GMT",
                    "content-type": "application/json",
                    "content-length": "328",
                    "connection": "keep-alive",
                    "server": "gunicorn/19.9.0",
                    "access-control-allow-origin": "*",
                    "access-control-allow-credentials": "true"
                },
                "data": {
                    "args": {},
                    "data": "",
                    "files": {},
                    "form": {},
                    "headers": {
                        "Content-Lenth": "0",
                        "Host": "httpbin.org",
                        "User-Agent": "mercury-http",
                        "X-Amzn-Trace-Id": "Root=1-63c9cb1b-42cc120962b22d4340063009"
                    },
                    "json": null,
                    "origin": "104.190.136.35",
                    "url": "https://httpbin.org/delete"
                },
                "tags": [],
                "user": null,
                "error": "None",
                "status": 200,
                "reason": "OK",
                "name": "TestHTTPBin.http_delete",
                "source": "httpbin.org",
                "wait_start": 85536.507554908,
                "start": 85536.50756013,
                "connect_end": 85536.507564333,
                "write_end": 85536.507584567,
                "complete": 85536.548672412,
                "checks": [
                    "TestHTTPBin.check_response"
                ]
            },
...
`


const checkpointsGraphTwo = `# We import json to serialize and deserialize
# our data.
import json
import random
# Let's also import soe type hints.
from typing import List, Dict, Union, Any
from hedra.reporting.events.types import HTTPEvent
from hedra import (
	Analyze,
    # We'll need to import the Checkpoint stage.
    Checkpoint,
	Execute,
    Optimize,
	Setup,
	Submit,
	action,
    check,
	depends,
    # we'll also need to import the @save() and
    # @restore() hooks
    save,
    restore,
    task,
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
    async def http_get(self):
        return await self.client.http.get('https://httbin.org/get')

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



@depends(OptimizeBatchSize)
class TestHTTPBinAlt(Execute):

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httbin.org/get')

    @action()
    async def http_post(self):
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
    async def http_put(self):
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
class SaveStagesToDisk(Checkpoint):
    
    @save(key='results', checkpoint_filepath='./results.json')
    async def save_to_disk(self, results: Dict[str, Any]):        
        return json.dumps(results, indent=4)


# Checkpoint stages can execute @save() and
# @restore() hooks, with @restore() hooks executing
# first and @save() hooks second.
@depends(SaveStagesToDisk)
class RestoreStagesFromDisk(Checkpoint):

    # @restore() hooks load data from the file at the 
    # provided path into context, transform it and store 
    # it under the provided context key.
    @restore(key='results', restore_filepath='./results.json')
    async def restore_from_disk(self, results: Dict[str, Any], file_data: bytes):
        data = json.loads(file_data)
        results.update(data)
        return results
        

@depends(RestoreStagesFromDisk)
class OptimizeBatchSizeTwo(Optimize):
    algorithm='shg'
    stage_time_limit='1m'
    optimize_iterations=10



@depends(OptimizeBatchSizeTwo)
class TestHTTPBinThree(Execute):

    @action()
    async def http_get_ip(self):
        return await self.client.http.get('https://httpbin.org/ip')

    @check('http_get_ip')
    async def check_response(self, result: HTTPEvent):
        assert result.status >= 200 and result.status < 300


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

const checkpointGraphOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.26


Loading graph - Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 11 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBin, TestHTTPBinAlt, TestHTTPBinThree - complete 
  - Group Time Elapsed: 8s
✔ Optimized - batch sizes for stages - TestHTTPBin: 61000, TestHTTPBinAlt: 61000 
  - over 156 seconds - Group Time Elapsed: 2m.41s
✔ Stage - TestHTTPBin completed 447578 actions at 7274 actions/second over 
  - 62 seconds - Group Time Elapsed: 2m.28s
✔ Checkpoint complete - Restored 0 items and saved 1 items 
  - Group Time Elapsed: 33s
✔ Checkpoint complete - Restored 1 items and saved 0 items 
  - Group Time Elapsed: 1m.11s
✔ Optimized - batch sizes for stages - TestHTTPBinThree: 19625 - over 92 seconds 
  - Group Time Elapsed: 1m.38s
✔ Stage - TestHTTPBinThree completed 839807 actions at 13718 actions/second over 
  - 61 seconds - Group Time Elapsed: 1m.17s
✔ Completed results analysis for 1708028 actions and 3 stages over 44 seconds 
  - Group Time Elapsed: 48s
✔ Successfully submitted the results for 1708028 actions via Json reporter 
  - Group Time Elapsed: 5s

Graph - Test - completed! Total Time Elapsed: 10m.58s

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
                {checkpointsGraphOne}
            </CodeSegment>
            <div>
                Validate your changes as before (via the check command) and then run the graph, which outputs:
            </div>
            <TerminalSegment command={checkpointOneOutput}/>
            <div>
                The first thing we notice is that only the results from the final Execute stage are aggregated and output! When you run a Save hook,
                upon successfully saving the specified data to the specified file Hedra removes the checkpointed data from memory. Let's open up the 
                <InlineCodeSegment>results.json</InlineCodeSegment> file our graph generated.
            </div>
            <CodeSegment hideCopy={true}>
                {checkpointFile}
            </CodeSegment>
            <div>
                Sure enough, the results from our first two Execute stages are here! How do we get them back?
            </div>
            <br/>
            <div>
                Checkpoint stages can have both Save and Restore hooks. While Save hooks offload the specified in-memory data to file, Restore hooks 
                allow us to read back in checkpointed data from those files and store them back in memory. More specifically, Save and Restore hooks allow
                us to manage data stored in a graph's <ArticleLink article="Graphs" subsection="context" text="context"/> - an arbitrary key-value store 
                that Hedra uses to pass data between stages in a graph.
            </div>
            <br/>
            <div>
                Let's go ahead and add a second Checkpoint stage after our first, then provide a Restore hook:
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
                {checkpointsGraphTwo}
            </CodeSegment>
            <div>
                Let's validate our changes and run the graph again!
            </div>
            <TerminalSegment command={checkpointGraphOutput}/>
            <div>
                This time we see the results from all three Execute stages aggregated and output! By combining regular Checkpoint stages with Analyze and 
                Submit stages, we can minimize the memory usae of complex graph workflows.
            </div>
        </div>
        </Section>

    )
}

export {
    CheckpointingResults
}
