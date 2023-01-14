import { Section } from "../../../sections";
import { ArticleLink, CodeSegment, ExternalLink, HighlightedText, InlineCodeSegment } from "../../../segments";


const hooksExample = `# The "@action()" decorator here is a hook
@action()
async def httpbin_get(self):
    return await self.client.http.get("https://httpbin.org/get")
`


const IntroductionToHooks = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                <HighlightedText>Hooks</HighlightedText> are decorators wrapping Python class methods, and the fundamental unit of a Hedra test. You can think of a hook as a 
                specific type of action or task that the Hedra will load, parse, and schedule.
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
            >{hooksExample}</CodeSegment>
            <div>
                Note that above we said a hook was a <em>type</em> of action or task, not the action or task itself. The class method you wrap 
                with a hook defines the actual work done. hooks only inform Hedra when to execute that method, what data to pass/is available,
                and how to handle any results returned by the method.
            </div>
            <br/>
            <div>
                Also note that any method wrapped by a hook must be <em>asynchronous</em>. If you're not familiar with asynchronous programming
                or it's been a minute, we recommend getting a start <ExternalLink link="https://realpython.com/async-io-python/" text="here"/>.
                hooks must wrap asynchronous methods because Hedra itself is an asynchronous framework. When working with hooks or most all of 
                Hedra's API, you must use async/await and avoid <em>blocking the event loop</em> (calling synchronous methods such as the Python 
                standard logger, file I/O, synchronous threading, etc).
            </div>
            <br/>
            <div>
                Hedra offers a multitude of hooks. While you can use any type and number of hooks in a given off test, hooks can only be used 
                within the context of certain groupings of functionality called <ArticleLink article="Stages" subsection="Stages overview" text="stages"/>.
            </div>
            <br/>
            <div>
                This is because certain types of funcionality only make sense to execute at certain points in a graph. For example, it wouldn't make 
                sense to call a <InlineCodeSegment reference="Hooks#setup">@setup()</InlineCodeSegment> hook to initialize a test during a stage where we're 
                making requests! For further documentation on which Stages support which hooks, view the <ArticleLink article="Hooks" subsection="hooks-overview" text="Hooks reference section"/>.
            </div>
        </div>
        </Section>


export {
    IntroductionToHooks
}