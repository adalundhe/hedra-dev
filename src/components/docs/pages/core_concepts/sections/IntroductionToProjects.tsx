import { Section } from "../../../sections";
import { ArticleLink, CodeSegment, InlineCodeSegment, PointList } from "../../../segments";
import { VscFolderActive } from 'react-icons/vsc'


const projectCLIFileStructure = `/<your_project_name>
    /tests    
        /plugins
            __init__.py
        __init__.py
    .hedra.json
    .gitignore
`


const IntroductionToProjects = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const projectBenefitItems = [
        "Projects allow you to reference graphs by the name of the file (minus extension) instead of having to type the path each time",
        "Projects allow you to easily synchronize changes in graphs via Hedra's Git integration",
        "Projects allow you to run jobs on Hedra distributed clusters without having to provide authentication via CLI args each time",
        "Projects allow Hedra to easily discover and keep track of new graphs as you write them"
    ]

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                When testing applications or servicves, it's likely that you'll want to create and work with more than 
                one graph. <InlineCodeSegment reference="Projects#projects-overview">Projects</InlineCodeSegment> are Hedra's
                way of managing these collections.
            </div>
            <br/>
            <div>
                There are several advantages to working with projects:
            </div>
            <PointList
                name="project-benefits-items"
                icons={projectBenefitItems.map(_ => <VscFolderActive/>)}
                points={projectBenefitItems}
            />
            <div>
                Projects have three main components - the graph files within them, any plugins you create within that project,
                and a <InlineCodeSegment reference="Working with Projects#initializing-a-project">.hedra.json</InlineCodeSegment> file.
                Unlike some frameworks, Hedra does not strongly enforce Project directory and file structure, however
                if you create a Project via CLI you'll find Hedra does generate the following folders and files:
            </div>
            <CodeSegment showLines={false}>
                {projectCLIFileStructure}
            </CodeSegment>
            <div>
                If you want to learn more about why Hedra generates this folder/file structure 
                you can learn more <ArticleLink article="Projects" subsection="Directory structure" text="here"/>.
                Likewise, if you'd like to get started creating and working with Projects, feel free to jump to the <ArticleLink article="Working with Projects" subsection="Initializing a project" text="Working with Projects"/> section.
            </div>
        </div>
        </Section>
    )
}


export {
    IntroductionToProjects
}