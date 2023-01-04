import { Section } from "../../../sections"
import { ExternalLink } from "../../../segments"
import { CodeShortSegment } from "../../../segments"


const Setup = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
            <div>
                <p>Hedra is available via <ExternalLink link="https://pypi.org/project/hedra/" text="PyPi" /> and can be installed by running:</p>
                <CodeShortSegment>pip install hedra</CodeShortSegment>
                <p>in your terminal.</p>
            </div>
        </Section>


export {
    Setup
}