import { Section } from "../../../sections"
import getConfig from "next/config"
import { WarningSegment } from "../../../segments";

const { publicRuntimeConfig } = getConfig();


const SystemRequirements = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const supportedPythonVersions = publicRuntimeConfig.hedraSupportedPythonVersions as string[];

    return (
        <Section subSectionName={subSectionName}>
            <div>
                <p>Hedra supports Python versions</p>
                <ul className="list-disc mx-10">
                    {
                        supportedPythonVersions.map(supportedVersion => <li key={`supported-version-${supportedVersion}`}>{supportedVersion}</li>)
                    }
                </ul>
                <WarningSegment text="Python 3.11 is still new and under active development. Hedra is compatibile with Python 3.11 releases, however unpredictable or reduced performance may occur." />
                <p>Windows (including WSL), MacOS, and major Linux distributions are supported.</p>
            </div>
        </Section>
    )
}


export {
    SystemRequirements
}