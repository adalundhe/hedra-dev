import { GuidingPrinciples } from './GuidingPrinciples';
import { TestsAsWorkflows } from './TestsAsWorkflows';
import { WhyHedra } from './WhyHedra';
import { WhatIsPerformanceTesting } from './WhatIsPerformanceTesting';
import { WorkflowsAsGraphs } from './WorkflowsAsGraphs'


type Section = typeof GuidingPrinciples | typeof TestsAsWorkflows | typeof WhyHedra | typeof WhatIsPerformanceTesting | typeof WorkflowsAsGraphs


const PhilosophySection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'Guiding principles': GuidingPrinciples,
        'Tests as workflows': TestsAsWorkflows,
        'Why Hedra?': WhyHedra,
        "What is performance testing?": WhatIsPerformanceTesting,
        "Workflows as graphs": WorkflowsAsGraphs
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    PhilosophySection
}