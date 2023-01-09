import { EnginesPersonasAndOptimizers } from './EnginesPersonasAndReporters';
import { IntroductionToGraphs } from './IntroductionToGraphs';
import { IntroductionToHooks } from './IntroductionToHooks';
import { IntroductionToProjects } from './IntroductionToProjects';
import { IntroductionToStages } from './IntroductionToStages'
import { PuttingItAllTogether } from './PuttingItAllTogether';


type Section = typeof EnginesPersonasAndOptimizers | typeof IntroductionToGraphs | typeof IntroductionToHooks | typeof IntroductionToProjects | typeof IntroductionToStages | typeof PuttingItAllTogether


const CoreConceptsSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'Engines, Personas, Optimizers, and Reporters': EnginesPersonasAndOptimizers,
        'Introduction to Graphs': IntroductionToGraphs,
        "Introduction to Hooks": IntroductionToHooks,
        "Introduction to Projects": IntroductionToProjects,
        "Introduction to Stages": IntroductionToStages,
        'Putting it all together': PuttingItAllTogether,
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    CoreConceptsSection
}