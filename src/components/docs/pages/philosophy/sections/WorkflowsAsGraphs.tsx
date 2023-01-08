import { Section } from "../../../sections"
import { HighlightedText, PointList } from "../../../segments"
import { AiOutlineNodeIndex } from 'react-icons/ai'
import { useMemo } from "react"



const WorkflowsAsGraphs = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const graphsAdvantagesPoints = useMemo(() => [
        "Graphs make determining parallizable work easy",
        "Graphs make isolating and handling failure or errors in workflows efficient",
        "Graphs make authoring complex workflows natural",
        "Graphs make workflow progress visualization intuitive",
    ], [])

    return (
        <Section 
        subSectionName={subSectionName}
        >
            <div>
                <p>
                    When we want to execute a collection of tasks in some defined order, we often try to organize that work into 
                    contained steps and orchestrate them as a workflow. Computational frameworks such as Airflow ans Spark have particularly
                    popularized and made evident the power of this approach for data science and data analysis.
                </p>
                <br/>
                <p>
                    What Airflow, Spark, and other "workflow" centeric tooling commonly share is the use of <HighlightedText>graphs</HighlightedText> 
                    to characterize the dependencies between tasks, determine and group execution order, and even provision required resources. Graphs
                    are powerful data structures that make determining relationships between two disparate "things" computationally efficient.
                </p>
                <br/>
                <p>
                    The benefits of graphs in representing and managing workflows are numerous:
                </p>
                <PointList
                    name="graph-advantages-items"
                    icons={graphsAdvantagesPoints.map(_ => <AiOutlineNodeIndex />)}
                    points={graphsAdvantagesPoints}
                />
                <p>
                    Graphs also translate more naturally to distributed execution. Because Graphs allow us to better determine relationships between tasks we 
                    can then more easily isolate and delegate that work to disparte nodes in a cluster. We can also better handle failure not just of work but 
                    of nodes. Since graphs make keeping track of progress easy, we can simply decide whether we want a recovered node to resume that work, 
                    skip the work, or halt execution of the workflow as a whole.
                </p>
                <br/>
                <p>
                    Finally, graphs aow us to use a wide variety of interesting algorithms and possibilities - from shortest path algorithms helping us best 
                    determine how to optimize a workflow to probabilistic graphs allowing us to inject degrees of simulated human uncertainty.
                </p>
            </div>
        </Section>
    )
}


export {
    WorkflowsAsGraphs
}