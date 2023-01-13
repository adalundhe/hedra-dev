import { Section } from "../../../sections";
import { InlineCodeSegment } from "../../../segments";


const IntroductionToProjects = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                When testing applications or servicves, it's likely that you'll want to create and work with more than 
                one graph. <InlineCodeSegment reference="Projects#projects-overview">Projects</InlineCodeSegment> are Hedra's
                way of managing these collections.
            </p>
            <br/>
            <p>
                Projects have three main components - the graph files within them, any plugins you create within that project,
                and a <InlineCodeSegment reference="Working with Projects#initializing-a-project">.hedra.json</InlineCodeSegment> file.
                Unlike some frameworks, Hedra does not strongly enforce Project directory and file structure, however
                if you create a Project via CLI you'll find Hedra does generate the following:
            </p>
        </div>
        </Section>


export {
    IntroductionToProjects
}