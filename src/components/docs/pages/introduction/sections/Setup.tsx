import { Section } from "../../../sections"
import { ExternalLink } from "../../../segments"
import { CodeShortSegment, TerminalSegment, ArticleLink } from "../../../segments"


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

const Setup = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
            <div>
                <p>Hedra is available via <ExternalLink link="https://pypi.org/project/hedra/" text="PyPi" />. Install by running:</p>
                <CodeShortSegment>pip install --no-cache --upgrade hedra</CodeShortSegment>
                <p>Then run:</p>
                <CodeShortSegment>hedra --help</CodeShortSegment>
                <p>which should output:</p>
                <TerminalSegment 
                    command={hedraOutput}
                />
                <p className="mt-8">
                    From here, you can start <ArticleLink article="" subsection="" text="creating graphs" />, <ArticleLink article="" subsection="" text="running tests" />,  and <ArticleLink article="" subsection="" text="using results" /> to gain insight about the target service or application.</p>
            </div>
        </Section>


export {
    Setup
}