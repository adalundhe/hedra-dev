import { Section } from "../../../sections"
import { CodeSegment, CodeShortSegment, TerminalSegment } from "../../../segments"


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

const hedraOutput = `
      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Usage: hedra [OPTIONS] COMMAND [ARGS]...

Options:
  --help  Show this message and exit.

Commands:
  cloud    Commands to run graphs on and manage distributed instances of...
  graph    Commands to run, lint, generate, and manage graphs.
  ping     Ping the specified uri to ensure it can be reached.
  plugin   Commands for creating and managing Hedra plugins.
  project  Commands for managing collections of Hedra graphs.
`

const DeveloperSetup = ({
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
        <div>
            <p>Setting up Hedra for local development can bet done by running the following:</p>
            <CodeSegment showLines={false} theme={bashTheme} language="bash">
                {installCommand}
            </CodeSegment>
            <p>Then run:</p>
            <CodeShortSegment>hedra</CodeShortSegment>
            <p>which should output:</p>
            <TerminalSegment 
                command={hedraOutput}
            />
        </div>
        </Section>

    )
}

export {
    DeveloperSetup
}
