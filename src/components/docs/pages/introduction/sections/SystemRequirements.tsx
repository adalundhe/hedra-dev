import { Section } from "../../../sections"
import getConfig from "next/config"
import { WarningSegment, PointList } from "../../../segments";
import { BsGearWide } from 'react-icons/bs';
import { FaPython } from 'react-icons/fa';

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
                <p>Hedra supports Python versions:</p>
                <PointList 
                    name="supported-version-items"
                    icons={supportedPythonVersions.map(_ => <FaPython />)}
                    points={supportedPythonVersions}
                />
                <p>with newer versions supported as soon as core dependencies are compatible with the release (i.e. as soon as Numpy, Aiodns, etc. support the newest Python version).</p>
                <WarningSegment 
                    text="Python 3.11 is still new and under active development. Hedra is compatibile with Python 3.11 releases, however unpredictable or reduced performance may occur." 
                />
                <p>
                    Windows (including WSL), MacOS, and major Linux distributions are supported. Hedra requres both CPython and Cython, 
                    and currently does not support alternative implementations such as PyPy or MicroPython. Hedra is a performance testing framework, and
                    we recommend running on instances or machines with a minimum of:
                </p>
                <PointList 
                    name="recommend-hardware-items"
                    icons={[
                        <BsGearWide />,
                        <BsGearWide />
                    ]}
                    points={[
                        "4 CPU cores (virtual or physical)",
                        "8GB of RAM"
                    ]}
                />
                <p>
                    for best performance. We also recommend CPUs with high clock speed. If you are saving results or checkpointing data to disk, we recommend
                    SSD storage. We also recommend machines running Hedra use a wired LAN connection, as wireless networks may throttle Hedra's performance and negatively impact
                    test result accuracy.
                </p>
            </div>
        </Section>
    )
}


export {
    SystemRequirements
}