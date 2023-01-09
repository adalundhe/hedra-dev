import { Section } from "../../../sections"
import { CodeSegment } from "../../../segments"


const installCommand = `# clone the repo abd change to the destination directory
git clone https://github.com/scorbettUM/hedra
cd hedra

# create a virtual env and activate it
python3 -m venv ~/.hedra
source ~/.hedra/bin/activate

# install required dependencies
pip install setuptools wheel
pip install -r requirements.in

# install Hedra
python setup.py develop
`



const DevelopmentSetup = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const bashTheme = {
        commentColor: "#bdc3c7",
        lineNumberColor: "#eeeeee",
        lineNumberBgColor: "#14151a",
        backgroundColor: "#2e3131",
        textColor: "#eeeeee",
        keywordColor: "#eeeeee",
        sectionColor: "#eeeeee",
        numberColor: "white",
        stringColor: "#95a5a6",
    }

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div className="mb-12">
            <p>Setting up Hedra for local development can bet done by running the following:</p>
            <CodeSegment showLines={false} theme={bashTheme} language="bash">
                {installCommand}
            </CodeSegment>
        </div>
        </Section>

    )
}

export {
    DevelopmentSetup
}
