import { CheckpointingResults } from './CheckpointingResults';
import { CreatingAGraphFromTemplate } from './CreatingAGraphFromTemplate';
import { CrossGraphCommunication } from './CrossGraphCommunication';
import { MyFirstGraph } from './MyFirstGraph';
import { AddingAnOptimizer } from './AddingAnOptimizer';
import { UsingMultipleReporters } from './UsingMultipleReporters';
import { ValidatingGraphChanges } from './ValidatingGraphChanges';
import { UsingMultipleEngines } from './UsingMultipleEngines';
import { ConvertingActionsToTasks } from './ConvertingActionsToTasks'
import { CheckingResults } from './CheckingResults'


type Section = typeof CheckpointingResults | typeof CreatingAGraphFromTemplate | typeof MyFirstGraph | typeof AddingAnOptimizer 
| typeof UsingMultipleReporters | typeof ValidatingGraphChanges | typeof ConvertingActionsToTasks | typeof CheckingResults


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
        'Adding an optimizer': AddingAnOptimizer,
        'Cross-graph communication': CrossGraphCommunication,
        'Using multiple reporters': UsingMultipleReporters,
        'Using multiple enignes': UsingMultipleEngines,
        'Converting actions to tasks': ConvertingActionsToTasks,
        'Checking results': CheckingResults
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    WorkingWithGraphsSection
}