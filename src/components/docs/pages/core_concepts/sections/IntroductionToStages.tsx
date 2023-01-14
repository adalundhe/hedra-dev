import { Section } from "../../../sections";
import { HighlightedText, InlineCodeSegment, PointList } from "../../../segments";
import { CodeSegment } from "../../../segments";
import { GiCometSpark } from 'react-icons/gi'


const stageExample = `# This is a Setup class
class TestSetup(Setup):
    batch_size=1000
    total_time='1m'


# This is an Execute stage
class TestHTTPBin(Execute):
    @action()
    async def httpbin_get(self):
        return await self.client.http.get("https://httpbin.org/get")
`


const multipleHooksExample = `# This Stage contains both an @action() and @task() hook
@depends(SetupStage)
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

const IntroductionToStages = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const stageApiConventionItems = [
        "Configuration is specified as class attributes",
        "API methods and attributes are invoked as attributes within any methods",
        "Methods decorated by hooks are executed according to that Stage type's lifecycle",
        'Methods not decorated by hooks must be called in "hooked" methods or are ignored',
        'A Stage may contain any number of hooks of the types it supports',
        'If a Stage is provided an unsupported hook type, the Graph will terminate execution',
        'Stages do not necessarily require user-specified hooks or configuration to be valid'
    ]

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                <HighlightedText>Stages</HighlightedText> are groups of individual actions or tasks within a workflow, represented as Python
                classes that inherit from a single <InlineCodeSegment reference="Stages#stages-overview">Stage</InlineCodeSegment> class type.
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
                {stageExample}
            </CodeSegment>
            <div>
                Stages are responsible for executing the hooks assigned to them (if any) or otherwise providing the graph with additional information required 
                to complete the workflow such as test concurrency, time limit for subsetquent stages, reporter configuration, etc. Stages are not limited to a single 
                hook or hook type:
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
                {multipleHooksExample}
            </CodeSegment>
            <div>
                A Stage can execute as many hooks of the types it supports as you specify. Stages adhere to the following general rules:
            </div>
            <PointList
                name="stage-api-convention-items"
                icons={stageApiConventionItems.map(_ => <GiCometSpark/>)}
                points={stageApiConventionItems}
            />
            <div>
                The internal workings of a stage are encapsulated within protected methods, wrapped with the <InlineCodeSegment reference="Hooks#Internal">@Internal()</InlineCodeSegment>
                hook. This hook ensures that these methods aren't accidentally overriden, and Hedra will abort any graph that accidentally overrides a protected 
                method. Protected methods for a Stage vary, but <em>always</em> include the <InlineCodeSegment>run()</InlineCodeSegment> method. You should avoid 
                naming any methods you provide to a Stage "run" in order to avoid your graph terminating early.
            </div>
        </div>
        </Section>
    )
}


export {
    IntroductionToStages
}