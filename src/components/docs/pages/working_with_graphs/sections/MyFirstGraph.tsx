import { Section } from "../../../sections"
import { ArticleLink, CodeSegment, CodeSegmentCopyable, ExternalLink, HighlightedText, InlineCodeSegment, PointList, TerminalSegment } from "../../../segments"
import { BsFillClockFill } from 'react-icons/bs'


const initialImports = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends
)`

const createSetupStage = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends
)


class SetupTest(Setup):
    pass
`


const additionalStages = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends
)


class SetupTest(Setup):
    pass
    

class TestHTTPBin(Execute):
    pass


class ProcessResults(Analyze):
    pass


class SubmitResults(Submit):
    pass
`


const wrapWithDependsHook = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends
)


# Since SetupTest is responsible for providing configuration to 
# TestHTTPBin (and setting up the @action() hooks we'll add there in
# a moment), it doesn't have any dependencies - so we don't need to
# wrap in in the @depend() hook.
class SetupTest(Setup):
    pass
    

# Since the Execute stage is where our test actually runs, we'll want
# it to use whatever config we set in SetupTest. Let's do that by 
# wrapping the stage in a @depends() hook and passing SetupTest as a
# dependency.
@depends(SetupTest)
class TestHTTPBin(Execute):
    pass


# Next we'll want to aggregate the responses from our test into 
# summarized metrics so we can better understand how the system 
# performs. By wrapping our ProcessResults stage with a @depends() 
# hook and passing in TestHTTPBin as a dependency we do just that.
@depends(TestHTTPBin)
class ProcessResults(Analyze):
    pass


# After we process results we'll want to store them somewhere,
# so let's wrap SubmitResults with a @depends hook and pass 
# ProcessResults as a dependency!
@depends(ProcessResults)
class SubmitResults(Submit):
    pass
`

const addActionHook = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends
)


class SetupTest(Setup):
    pass
    

@depends(SetupTest)
class TestHTTPBin(Execute):
    pass


@depends(TestHTTPBin)
class ProcessResults(Analyze):
    
    # We also need to wrap our method in the @action() hook so Hedra knows
    # what we want to do with this method.
    @action()
    async def http_get(self):
        # Here's we make HTTP request to HTTPBin.org we want to execute,
        # calling the HTTP client and passing the URL.
        return await self.client.http.get("https://httpbin.org/get")


@depends(ProcessResults)
class SubmitResults(Submit):
    pass
`

const addReporterConfig = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends,
    # Import the JSONConfig here...
    JSONConfig
)


class SetupTest(Setup):
    pass
    

@depends(SetupTest)
class TestHTTPBin(Execute):
    pass


@depends(TestHTTPBin)
class ProcessResults(Analyze):
    
    @action()
    async def http_get(self):
        return await self.client.http.get("https://httpbin.org/")


@depends(ProcessResults)
class SubmitResults(Submit):
    # Then pass it down here to the config class attribute of 
    # our Submit stage!
    config=JSONConfig(
        events_filepath='./events.json', # You can specify any filepath for these.
        metrics_filepath='./metrics.json' # What you see here are the defaults.
    )
`

const addSetupConfig = `from hedra import (
    Analyze,
    Execute,
    Setup,
    Submit,
    action,
    depends,
    JSONConfig
)


class SetupTest(Setup):
    # We specify the number of virtual users (VUs) via the batch_size
    # class attribute and the total time for our test via the total_time
    # class attribute.
    batch_size=1000
    total_time='1m'
    

@depends(SetupTest)
class TestHTTPBin(Execute):
    pass


@depends(TestHTTPBin)
class ProcessResults(Analyze):
    
    @action()
    async def http_get(self):
        return await self.client.http.get("https://httpbin.org/")


@depends(ProcessResults)
class SubmitResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`

const hedraSetupOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 4 stages - Group Time Elapsed: 5s
[=   ] > Executing stages - SetupTest - Group Time Elapsed: 1s`

const hedraAnalyzeOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - My First Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 4 stages - Group Time Elapsed: 5s
✔ Setup for - TestHTTPBin - complete - Group Time Elapsed: 5s
✔ Stage - TestHTTPBin completed 178179 actions at 2919 actions/second over 61 seconds 
  - Group Time Elapsed: 1m.10s
[ ===] > Executing stages - ProcessResults - Group Time Elapsed: 1s`


const metricsResults = `{
    "ExecuteStage.http_get": {
        "name": "ExecuteStage.http_get",
        "stage": "ExecuteStage",
        "errors": [
            {
                "message": "Connection timed out.",
                "count": 76939
            }
        ],
        "total": 897189,
        "succeeded": 820250,
        "failed": 748732,
        "actions_per_second": 12221.132525356315,
        "groups": {
            "total": {
                "name": "ExecuteStage.http_get",
                "stage": "ExecuteStage",
                "total": {
                    "median": 11.303111359997274,
                    "mean": 14.442927680080219,
                    "variance": 0.0,
                    "stdev": 0.0,
                    "minimum": 0.042812350002350286,
                    "maximum": 50.81153624500439
                },
    ...
`

const MyFirstGraph = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const timingGroups = [
        "Total - Total time the Action/Task hook took to execute.",
        'Waiting - Total time spent waiting to for a concurrency "slot" to open.',
        "Connecting - Total time spent establishing a socket or other type of connection to the target.",
        "Writing - Total time spent sending data.",
        "Reading - Tota time spent reading the response returned."
    ]

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                In this section we're going to dive riht in into creating a test graph, explaining things from a pratical point of view as opposed to 
                nitty-gritty details or broad theoretical strokes.
            </p>
            <br/>
            <div>
                First create a file by running:
            </div>
            <CodeSegmentCopyable>touch my_first_test.py</CodeSegmentCopyable>
            <br/>
            <div>
                Open up the file in your editor of choice, and import the <HighlightedText>Setup</HighlightedText>, <HighlightedText>Execute</HighlightedText>, <HighlightedText>Analyze</HighlightedText>, and <HighlightedText>Submit</HighlightedText> stages 
                as well as the <HighlightedText>Action</HighlightedText> and <HighlightedText>Depends</HighlightedText> hooks:
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
                {initialImports}
            </CodeSegment>
            <div>
                These are the base imports you'll need for any valid graph. Next let's create our Setup stage. Create a Python class (any name you like), and 
                inherit from the Setup stage:
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
                {createSetupStage}
            </CodeSegment>
            <div>
                Don't worry about the <InlineCodeSegment>pass</InlineCodeSegment> statement for now - we'll come back and change it once we've got the 
                basic skeleton of our graph setup.
            </div>
            <br/>
            <div>
                Now, as with our Setup stage, create classes that inherit from the Execute, Analyze, and Submit stages:
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
                {additionalStages}
            </CodeSegment>
            <div>
                Right now our graph is just a disjointed collection of stages with nothing denoting which stages depend on another. We want our Setup 
                stage to run <em>before</em> our Execute stage so we can provide the Execute stage with configuration, followed by our Analyze stage 
                so we can process results, and then our Submit stage so we can store those results somewhere.
            </div>
            <br/>
            <div>
                To accomplish this, we need to use the Depends hook, wrapping stages that have dependencies and passing those dependencies as arguments to 
                each instance of the hook:
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
                {wrapWithDependsHook}
            </CodeSegment>
            <div>
                Now we're getting somewhere! Our test still hasn't specified what we're testing though. For that we'll need to add an asynchronous method to our 
                Execute stage, call the HTTP Client in it, and wrap the method with the Action hook:
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
                {addActionHook}
            </CodeSegment>
            <div>
                We've now added the HTTP request to <ExternalLink link="https://httpbin.org/get" text="httpbin"/>!
            </div>
            <br/>
            <div>
                We'll also need to tell our Submit stage which <HighlightedText>Reporter</HighlightedText> we want to use by passing it an instance of a Reporter 
                type's config class. Let's add the <HighlightedText>JSONConfig</HighlightedText> to your imports and provide it to our Submit stage as a class 
                attribute:
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
                {addReporterConfig}
            </CodeSegment>
            <div>
                Note that, by default, Hedra will only output aggregate metrics and not unaggregated events.
            </div>
            <br/>
            <div>
                Finally, let's return to our Setup stage and specify some configuration - we'll want 1000 concurrent virtual users (VUs) and to execute for a total 
                of one minute:
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
                {addSetupConfig}
            </CodeSegment>
            <div>
                Now for the exciting part - let's run our test! First (particularly if we're on a Unix operating system) we'll want to increase the 
                maximum number of files we can have open by running:
            </div>
            <CodeSegmentCopyable>ulimit -n 256000</CodeSegmentCopyable>
            <div>
                Let's go! Run:
            </div>
            <CodeSegmentCopyable>hedra graph run my_first_test.py</CodeSegmentCopyable>
            <div>
                Hedra first executes an <InlineCodeSegment reference="Stages#idle">Idle</InlineCodeSegment> stage and <InlineCodeSegment reference="Stages#validate">Validate</InlineCodeSegment> stage
                before our Setup stage. The first Hedra provides as a default starting point for all graphs, while the Validate stage is provided by Hedra as a means of ensuring hooks and other aspects 
                of our graph are correct. Note that you may also provide your <ArticleLink article="Stages" subsection="Validate" text="own Validate stage"/> if you want to add custom assertions
            </div>
            <TerminalSegment command={hedraSetupOutput}/>
            <div>
                As our graph continues to run, each stage will show as completed, providing useful context like current configuration parameters, etc. Hedra will also alternate between both the time elapsed 
                for the current stage's execution and the time elapsed for the total graph:
            </div>
            <TerminalSegment command={hedraAnalyzeOutput}/>
            <div>
                Once complete, you'll notice an addtional `metrics.json` file. Open it to see aggregated summary statistics of your test!
            </div>
            <CodeSegment>
                {metricsResults}
            </CodeSegment>
            <div>
                In addition to total, success, and failed counts Hedra provides metrics for timing "groups", including
            </div>
            <PointList
                name="timing-group-items"
                icons={timingGroups.map(_ => <BsFillClockFill/>)}
                points={timingGroups}
            />
            <div>
                Next up - let's add some more test targets and validate our changes to the graph!
            </div>
        </div>
        </Section>

    )
}

export {
    MyFirstGraph
}
