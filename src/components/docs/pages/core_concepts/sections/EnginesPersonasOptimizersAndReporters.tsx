import { Section } from "../../../sections";
import { ArticleLink, CodeSegment, HighlightedText, InlineCodeSegment } from "../../../segments";

const exampleHTTPClientCall = `@action()
async def httpbin_get(self):
    # An example Client call to the HTTP engine
    return await self.client.http.get("https://httpbin.org/get")
`

const exampleGRPCClientCall = `from my_grpc_project.proto import (
    MyProtobuf
)

@action()
async def grpc_hello_world(self):
    # An example Client call to the HTTP engine
    return await self.client.grpc.get(
        "127.0.0.1:9000",
        MyProtobuf(message="Hello World!")
    )
`

const personasSetupExample = `class MyTestSetup(Setup):
    batch_size=2000
    total_time='1m'
    # Here we tell Hedra we want to use the Batched 
    # persona for any dependent stages
    persona_type='batched'`


const optimizeExample = `# We specify our Optimize stage as below
@depends(MyTestSetup)
class OptimizeBatchSize(Optimize):

    # We specify differential evolution instead of the default
    # SHG algorithm
    algorithm='diff-evolution'

    # We specify the parameters and multiples of the range
    # to search for optimized params over - in this case
    # we'll search over half of the batch size specified to 
    # twice the batch size specified in MyTestSetup
    optimize_params={
        'batch_size': (0.5,2)
    }
`

const reporterExample = `@depends(AnalyzeResults)
class OutputPostgresResults(Submit):

    # By passing an instance of PostgresConfig, we
    # tell Hedra we want to use the Postgresql reporter.
    config=PostgresConfig(
        host='197.222.121.90',
        port=5432,
        username=os.getenv('POSTGRES_USERNAME'),
        password=os.getenv('POSTGRES_PASSWORD'),
        metrics_table='Test_Metrics',
        events_table='Test_Events'

    )`


const EnginesPersonasOptimizersAndReporters = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                Where the previous sections covered concepts and funcionality required for writing graphs,
                this section delves into four components of the Hedra framework that are critical to actual 
                test execution.
            </p>
            <br/>
            <p>
                <InlineCodeSegment reference="Engines#engines-overview">Engines</InlineCodeSegment> are the underlying
                mechanism Hedra uses to execute actual requests, page clicks, etc. You make or schedule calls to engines 
                through Hedra's <InlineCodeSegment reference="Engines#the-client-interface">Client</InlineCodeSegment> 
                API, which is designed to mirror the interface of popular Python libraries like AioHTTP, Playwright, etc.
                Let's re-examine the first code example of a Hook we encountered:
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
                {exampleHTTPClientCall}
            </CodeSegment>
            <p>
                The code here looks exactly like making an HTTP GET request 
                in almost any other HTTP client. Let's view another example - this 
                time a GRPC request:
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
                {exampleGRPCClientCall}
            </CodeSegment>
            <p>
                The above example reads almost exactly like we're using Google's
                own GrpcIO library To make the RPC call, right down to passing in the 
                compiled protobuf from our generated code!
            </p>
            <br/>
            <p>
                Hedra currently offers eight engine types, with the ability to add your own via the <ArticleLink article="Plugins" subsection="Plugins overview" text="plugin system"/>.
                For further documentation on Engines and Engine types, consult the <ArticleLink article="Engines" subsection="Engines overivew" text="Engines reference"/> documentation.
            </p>
            <br/>
            <p>
                Another core mechanism of Hedra is <InlineCodeSegment reference="Personas#persona-overview">Personas</InlineCodeSegment>. 
                If engines are responsible for <em>what type</em> of action or task we're executing, personas are responsible for <em>when</em> those 
                actions or tasks are executed. 
            </p>
            <br/>
            <p>
                Unlike engines, you'll never directly interact with personas beyond specifying what type
                of persona you'd like to use to a <HighlightedText>Setup</HighlightedText> stage as configuration via class attribute:
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
                {personasSetupExample}
            </CodeSegment>
            <p>
                Hedra offers a variety of personas, each controlling the scheduling of new actions or tasks
                in different ways. For further documentation, view the <ArticleLink article="Personas" subsection="Personas overview" text="Personas Reference" /> documenation.
            </p>
            <br/>
            <p>
                <InlineCodeSegment reference="Optimizers#optimizers-overview">Optimizers</InlineCodeSegment> are Hedra's way of automating test configuration - allowing you to use
                powerful algorithms like dual annealing and differential evolution to identify ideal parameters for your test.
            </p>
            <br/>
            <div>
                Optimizers have a slightly different API than engines, which you invoke via calls to the Client API or personas (which you provide as a configuration option). 
             </div>
             <br/>
             <div>   
                You first specify that you want to run optimization by inserting an <InlineCodeSegment reference="Stages#optimize">Optimize</InlineCodeSegment> stage in your graph. 
                You then provide the <HighlightedText>Optimize</HighlightedText> stage the optimization algorithm you want to use and configuration parameters you want to optimize
                as configuration via class attributes.
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
                {optimizeExample}
            </CodeSegment>
            <p>
                Optimizers are a good way of exploring and identifying parameters for a test if you're unfamiliar with how the target application(s) or service(s) under test
                perform.
            </p>
            <br/>
            <p>
                <InlineCodeSegment reference="Reporters#reporters-overview">Reporters</InlineCodeSegment> are the final core mechanism Hedra uses, submitting both aggregate 
                <ArticleLink article="Reporters" subsection="Metrics" text="metrics"/> and unaggregated <ArticleLink article="Reporters" subsection="Events" text="events"/>
                (individual processed results) for storage via a variety of integrations.
            </p>
            <br/>
            <p>
                Like personas, you'll never directly call reporters - instead specifying which reporter you'd like to use by passing an instance of that
                reporter's config class to a <HighlightedText>Submit</HighlightedText> stage:
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
                {reporterExample}
            </CodeSegment>
            <p>
                You can only specify one reporter type per Submit stage. However, since Hedra places no limits
                on the number of Submit stages you can execute (so long as you adhere to the graph rules mentioned above),
                you <em>can</em> specify multiple reporters by creating multiple Submit stages and passing each stage a
                different reporter config class.
            </p>
        </div>
        </Section>


export {
    EnginesPersonasOptimizersAndReporters
}