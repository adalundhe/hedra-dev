import { CheckpointingResults } from './CheckpointingResults';
import { CreatingAGraphFromTemplate } from './CreatingAGraphFromTemplate';
import { CrossGraphCommunication } from './CrossGraphCommunication';
import { MyFirstGraph } from './MyFirstGraph';
import { UsingAnOptimizer } from './UsingAnOptimizer';
import { UsingMultipleReporters } from './UsingMultipleReporters';
import { ValidatingGraphChanges } from './ValidatingGraphChanges';


type Section = typeof CheckpointingResults | typeof CreatingAGraphFromTemplate | typeof MyFirstGraph | typeof UsingAnOptimizer | typeof UsingMultipleReporters | typeof ValidatingGraphChanges


const WorkingWithGraphsSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'Checkpointing results': CheckpointingResults,
        'Creating a graph from template': CreatingAGraphFromTemplate,
        'My first graph': MyFirstGraph,
        'Validating graph changes': ValidatingGraphChanges,
        'Using an optimizer': UsingAnOptimizer,
        'Cross-graph communication': CrossGraphCommunication,
        'Using multiple reporters': UsingMultipleReporters,
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    WorkingWithGraphsSection
}