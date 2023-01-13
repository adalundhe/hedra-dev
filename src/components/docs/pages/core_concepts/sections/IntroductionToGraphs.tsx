import { Section } from "../../../sections";
import { ArticleLink, CenterTextBlock, CodeSegment, HighlightedText, InlineCodeSegment } from "../../../segments";


const graphExample = `from hedra import (
    Setup,
    Execute,
    action,
    Analyze,
    JSONConfig,
    Submit,
    depends,
)

# Hedra requires a Setup stage first for all Graphs.
class TestSetup(Setup):
    batch_size=1000
    total_time='1m'


# This Execute stage depends upon our previous Setup stage
class ExecuteHTTPStage(Execute):
    count=0

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')
    
    @task()
    async def http_get(self):
        count += 1
        return await self.client.http.get(f'https://httpbin.org/get?count={self.count}')


# Likewise, this Analyze stage depends upon our Execute stage        
@depends(ExecuteHTTPStage)
class AnalyzeResults(Analyze):
    pass


# Finally, this Submit stage depends upon our Analyze stage
@depends(AnalyzeResults)
class OutputJSONResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`


const setupExample = `class TestSetup(Setup):
    batch_size=1000
    total_time='1m'
`


const executeExample = `@depends(SetupStage)
class ExecuteHTTPBin(Execute):
    count=0

    @action()
    async def http_get(self):
        return await self.client.http.get('https://httpbin.org/get')

    @task()
    async def http_get(self):
        count += 1
        return await self.client.http.get(f'https://httpbin.org/get?count={self.count}')
`


const analyzeExample = `@depends(ExecuteHTTPBin)
class AnalyzeResults(Analyze):
    pass
`


const submitExample = `@depends(AnalyzeStage)
class OutputJSONResults(Submit):
    config=JSONConfig(
        events_filepath='./events.json',
        metrics_filepath='./metrics.json'
    )
`


const IntroductionToGraphs = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                By this point, you'll notice that each example script has been adding pieces of functionality. We've now reached the point where we can show and discuss
                a full graph.
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
                {graphExample}
            </CodeSegment>
            <p>
                <InlineCodeSegment reference="Graphs#graph-overview">Graphs</InlineCodeSegment> are <em>workflows</em>, organized actions and tasks that Hedra orchestrates for you represeted by stages and hooks.
            </p>
            <br/>
            <p>
                Hedra can orchestrate stages to execute in almost any order we need. Certain stage types are required in order for a Graph to run, and most all stages have some degree of 
                limitation on what stages the can execute after or before (see the <ArticleLink article="Stages" subsection="Stages overview" text="Stage reference guide"/> for more information 
                on stages can preceed or follow a certain stage type). If two stages have no shared dependencies, Hedra will execute them concurrently (start one without waiting for the other to complete).
                If a stage is dependent upon one or more other stages, it will wait for all stage dependencies to complete first. 
            </p>
            <br/>
            <p>
                To specify these dependcies we use the <InlineCodeSegment reference="Hooks#depends">@depends()</InlineCodeSegment> hook, wrapping stage classes and passing one more other stages 
                that the hooked stage depends upon (that we want to complete before and in order for hooked stage to run).
            </p>
            <br/>
            <p>
                Breaking down our example above - we first start with a <InlineCodeSegment reference="Stages#execute">Setup</InlineCodeSegment> stage called <HighlightedText>TestSetup</HighlightedText> We provide test configuration 
                to this stage, which the stage then consumes while running and provides to all dependant stages. The Setup stage also initializes any Action or Task hooks found in dependant stages.
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
                {setupExample}
            </CodeSegment>
            <p>
                Next comes our <InlineCodeSegment reference="Stages#execute">Execute</InlineCodeSegment> stage, <HighlightedText>ExecuteHTTPBin</HighlightedText>. This stage needs the confguration options we specified in 
                our Setup stage, so we wrap it in a Depends hook and pass the TestSetup class as a dependency.
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
                {executeExample}
            </CodeSegment>
            <p>
                Note that <HighlightedText>ExecuteHTTPBin</HighlightedText> contains <em>both</em> of the aformentoned Action and Task hook types. Since we passed <HighlightedText>TestSetup</HighlightedText> as a dependency of 
                <HighlightedText>ExecuteHTTPBin</HighlightedText>, <HighlightedText>TestSetup</HighlightedText> is aware of <HighlightedText>ExecuteHTTPBin</HighlightedText> and will setup the Execute stage's Action and Task hooks.
                Recall the general Stage rule:
            </p>
            <CenterTextBlock>A Stage may contain any number of hooks of the types it supports</CenterTextBlock>
            <p>
                Once our Execute stage has completed, it makes sense that we'll want to aggregate timings results for the requests we executed during <HighlightedText>ExecuteHTTPBin</HighlightedText>'s run. We can do this by specifying an 
                <InlineCodeSegment reference="Stages#execute">Analyze</InlineCodeSegment> stage like <HighlightedText>AnalyzeResults</HighlightedText>, wrapping it in a Depends hook, and passing our <HighlightedText>ExecuteHTTPBin</HighlightedText> 
                stage as a dependnecy.
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
                {analyzeExample}
            </CodeSegment>
            <p>
                The first thing you'll likely notice about our Analyze stage is that we aren't providing any confiuration via class attributes or Hooks. That's okay! Recall the general Stage rule:
            </p>
            <CenterTextBlock>Stages do not necessarily require user-specified hooks or configuration to be valid.</CenterTextBlock>
            <p>
                In the case of <HighlightedText>AnalyzeResults</HighlightedText>, we don't need to specify any addtional configuration or Hooks for it to know how to aggregate ExecuteHTTPBin's results into summary metrics.
            </p>
            <br/>
            <p>
                Finally we reach the <InlineCodeSegment reference="Stages#submit">Submit</InlineCodeSegment>  OutputJSONResults, the last stage in our graph.
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
                {submitExample}
            </CodeSegment>
            <p>
                Since our Submit stage is responsible for using Hedra's <InlineCodeSegment reference="Reporters#reporters-overview">Reporters</InlineCodeSegment> to store and output aggregate metrics and unaggregated results, 
                it should depend upon our Analyze stage (<HighlightedText>AnalyzeResults</HighlightedText>). As before, we wrap OutputJSONResults with the Depends hook, passing AnalyzeResults as a dependecy. We also pass an instance 
                of the configuration class <InlineCodeSegment reference="Reporters#JSON">JSONConfig</InlineCodeSegment>. This class tells OutputJSONResults both that we want to use the <ArticleLink article="Reporters" subsection="JSON" text="JSON Reporter"/> 
                and what configuration to use for the JSON Reporter.
            </p>
        </div>
        </Section>


export {
    IntroductionToGraphs
}