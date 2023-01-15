import { Section } from "../../../sections";
import { 
    CodeShortSegment,
    CodeSegmentCopyable, 
    InlineCodeSegment, 
    PointList, 
    TerminalSegment,
    WarningSegment 
} from "../../../segments";
import { BsFillTerminalFill } from 'react-icons/bs'


const hedraHelpOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
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
  project  Commands for managing collections of Hedra graphs.`


const hedraGraphHelpOutput = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Usage: hedra graph [OPTIONS] COMMAND [ARGS]...

  Commands to run, lint, generate, and manage graphs.

Options:
  --help  Show this message and exit.

Commands:
  check   Validate the specified test file.
  create  Creates basic scaffolding for a test graph at the specified path.
  run     Run a specified test file.
`


const hedraGraphCreateHelp = `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Usage: hedra graph create [OPTIONS] PATH

  Creates basic scaffolding for a test graph at the specified path.

Options:
  --stages TEXT     Optional comma delimited list of stages to generate for
                    the graph.
  --engine TEXT     Engine to use in generated graph
  --reporter TEXT   Reporter to use in generated graph
  --log-level TEXT  Set log level.
  --help            Show this message and exit.
`


const CLIOverview = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const cliCategoryItems = [
        "Cloud - Commands for managing both remote Hedra deployments and graphs/projects on those deployments.",
        "Graph - Commands for creating, linting, and running local graphs.",
        "Plugin - Commands for creating and managing local Hedra plugins.",
        "Project - Commands for creating and managing local Hedra projects"
    ]

    return (
        <Section 
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
            <div>
                which should output:
            </div>
            <TerminalSegment command={hedraHelpOutput} />
            <div>
                Hedra's CLI follows a structure similar to Docker or similar tooling, where comands a grouped by category names:
            </div>
            <PointList
                name="cli-category-items"
                icons={cliCategoryItems.map(_ => <BsFillTerminalFill/>)}
                points={cliCategoryItems}
            />
            <div>
                Hedra also offers a <InlineCodeSegment>ping</InlineCodeSegment> comand to quickly verify an application or service is 
                reachable before running a graph.
            </div>
            <WarningSegment
                text="The Cloud category of CLI commands is currently not specified and will be completed once Hedra's distributed rewrite completes."
            />
            <div>
                In general, Hedra commands follow the format:
            </div>
            <CodeShortSegment>{"hedra <command category> <action> [...args]"}</CodeShortSegment>
            <div>
                Both categories and actions have individual help messages which can be seen by passing the <InlineCodeSegment>--help</InlineCodeSegment>
                flag. For example, if we want to know more about graph commands we would run:
            </div>
            <CodeSegmentCopyable>hedra graph --help</CodeSegmentCopyable>
            <div>
                which returns:
            </div>
            <TerminalSegment command={hedraGraphHelpOutput}/>
            <div>
                If we then want to check out to run the command to create a graph, we run:
            </div>
            <CodeSegmentCopyable>hedra graph create --help</CodeSegmentCopyable>
            <div>
                which then displays the following information about the command:
            </div>
            <TerminalSegment command={hedraGraphCreateHelp}/>
            <div>
                All commands follow the format of required arguments being positional while optional arguments are specified via 
                keyword arguments. If you accidentally forget a required argument Hedra's CLI will output a helpful message, and all optional 
                arguments have safe defaults.
            </div>
        </div>
        </Section>
    )
}


export {
    CLIOverview
}