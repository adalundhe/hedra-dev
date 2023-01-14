import { Section } from "../../../sections";
import { CodeSegmentCopyable } from "../../../segments";


const CLIOverview = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                Hedra's command line is the primary way you'll interact with Hedra - from running graphs to communicating 
                with distributed deployments.
            </div>
            <br/>
            <div>
                To get started, first run:
            </div>
            <CodeSegmentCopyable>hedra --help</CodeSegmentCopyable>
        </div>
        </Section>


export {
    CLIOverview
}