import { Section } from "../../../sections";
import { CodeSegment, HighlightedText, InlineCodeSegment } from "../../../segments";


const passStageExample = `@depends(ExecuteGRPC)
class AnalyzeGRPCResults(Analyze):
    # No additional config or hooks here!
    pass`


const PuttingItAllTogether = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                When working with Hedra, we starting by defining <HighlightedText>stages</HighlightedText> as Python classes. 
            </div>
            <br/>
            <div>
                We then provide any number of <HighlightedText>hooks</HighlightedText>, class methods wrapped by decorator functions that 
                tell Hedra both when to execute the code inside the method, what additional data to provide (as parameters), and how to 
                handle results. Within hooks, we may make calls to Hedra APIs such as the Client API for engines.
            </div>
            <br/>
            <div>
                Personas (which schedule actions/tasks while testing) or reporters (submits aggregate metrics and processed unaggregated 
                results as events) we do not call but rather provide configuration to via a stage's class attributes. Optimizers, which 
                automate the discovery of performant test configuration, require that we specify an <HighlightedText>Optimize</HighlightedText> stage,
                providing any additional configuration as desired.
            </div>
            <br/>
            <div>
                Additionally, we may provide configuration as class attributes. However, stages do not require hooks
                or configuration to be valid. If we want to execute a stage and simply use the default configuration, 
                we can simply specify the class and provide a <InlineCodeSegment>pass</InlineCodeSegment> statement
                underneath:
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
                {passStageExample}
            </CodeSegment>
            <div>
                We then specify dependencies between stages by wrapping stages that depend upon others with 
                the <InlineCodeSegment reference="Hooks#depends">@depends()</InlineCodeSegment> hook, passing
                the other stages a given stage depends upon as arguments to the hook.
            </div>
            <br/>
            <div>
                Hedra imports, loads, and validates the graph, ensuring that all stages can reach at least one 
                terminal <HighlightedText>Submit</HighlightedText> stage and that all stages have a backwards 
                path to at least one <HighlightedText>Setup</HighlightedText> stage.
            </div>
            <br/>
            <div>
                If we need to manage a collection of graphs, we then use <HighlightedText>projects</HighlightedText>,
                which allow us to better organize, synchronize, and run graphs. Projects can follow any general 
                folder and file structure, and contain graphs, plugins, and a <InlineCodeSegment reference="Working with Projects#initializing-a-project">.hedra.json</InlineCodeSegment> file.
            </div>
            <br/>
            <div>
                This concludes the overview of fundamental concepts and components of Hedra. From here, we recommend treating the rest of this
                documentation like an open-air park - explore as you want or need an have fun!
            </div>
        </div>
        </Section>


export {
    PuttingItAllTogether
}