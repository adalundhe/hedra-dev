import { Section } from "../../../sections"
import { ArticleLink } from "../../../segments"


const Welcome = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>Welcome to the Hedra documentation!</p>
            <br/>
            <p>
                This documentation covers everything you need to know to get up and running with Hedra, the philosophy guiding the framework, robust API reference, and insight into framework lifecycle and 
                logic. We prefer a "by example" approach that focuses on providing real-world benefit to <em>you</em>, so even sections that cover nitty gritty internals will contain plentiful working examples that
                show how you can put the information provided to use.
            </p>
            <br/>
            <p>
                If you haven't worked with Hedra before or if it's been a minute - we recommend starting with the <ArticleLink article="My First Graph" subsection="Getting started" text="My First Graph" />  tutorial.
            </p>
            <br/>
            <p>
                If you want to look up specfic topics, use the search on the left or simply browse the topics navbar to find what you need. You can find tips, tricks, and recipies, at <ArticleLink article="Examples and Recipies" subsection="Overview" text="Examples and Recipies" />.
            </p>
        </div>
        </Section>


export {
    Welcome
}