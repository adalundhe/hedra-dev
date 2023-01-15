import { create } from "zustand";
import { CommandReference } from "./types";


export interface CommandsState {
    commands: CommandReference[];
    setCommandsReference: (updatedCommands: CommandReference[]) => void;
}


const useCommandsStore = create<CommandsState>((set) => {

    const commands: CommandReference[] = [
        {
            command: "hedra graph create",
            description: 'Creates a graph starter template, with stages, engines, and reporters configurable by optional arguments.',
            requiredArguments: [],
            optionalArguments: [
                {
                    name: '--stages',
                    description: 'A comma-delimited list of stage types to generate.',
                    valueType: 'string',
                    example: 'setup,optimize,execute,analyze,submit',
                    defaultValue: 'setup,execute,analyze,submit',
                    isFlag: false
                },
                {
                    name: '--engine',
                    description: 'The engine to use for Execute stages in the graph. Note that this applies to all Execute stages.',
                    valueType: 'string',
                    example: 'playwright',
                    defaultValue: 'http',
                    isFlag: false
                },
                {
                    name: '--reporter',
                    description: 'The reporter to use for Submit stages in the graph. Note that this applies to all Submit stages.',
                    valueType: 'string',
                    example: 'honeycomb',
                    defaultValue: 'json',
                    isFlag: false
                },
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra graph create test.py",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Creating new graph at - test.py.
Generating - 4 stages:
-setup
-execute
-analyze
-submit

Graph generated!
`
        },
        {
            command: "hedra graph run",
            description: "Runs the specified graph, which can be referenced either by path or (if this command is run in a project directory) by name",
            requiredArguments: [
                {
                    name: "[path]",
                    description: "Path to the graph file or (if this command is run in a project directory) graph name.",
                    valueType: "string",
                    example: "./test.py"
                }
            ],
            optionalArguments: [
                {
                    name: '--cpus',
                    description: "Sets the maximum number of physical CPUs used for a given graph's execution.",
                    valueType: 'integer',
                    example: '4',
                    defaultValue: '[MAX_PHYSICAL_CPUS]',
                    isFlag: false
                },
                {
                    name: '--bypass-connection-validation',
                    description: 'Sets all Setup stages to skip verifying that all hosts specified in Action hooks can be reached. Overrides the project conifg value if provided.',
                    valueType: 'string',
                    example: '',
                    defaultValue: false,
                    isFlag: true
                },
                {
                    name: '--connection-validation-retries',
                    description: 'How many times Setup stages in the graph will attempt to verify hosts specified in Action hooks can be reached before failing the graph. Overrides the project conifg value if provided.',
                    valueType: 'integer',
                    example: 5,
                    defaultValue: 3,
                    isFlag: false
                },
                {
                    name: '--log-directory',
                    description: 'Output directory for logfiles. If the directory does not exist it will be created.',
                    valueType: 'string',
                    example: './graph_logs',
                    defaultValue: '[$PWD]/logs',
                    isFlag: false
                },
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra graph run test.py",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Loading graph - Test

✔ Executing stages - Idle - Group Time Elapsed: 4s
✔ Validated - 4 stages - Group Time Elapsed: 5s
✔ Setup for - ExecuteStage - complete - Group Time Elapsed: 5s
[=== ] > Executing stages - ExecuteStage - Total Time Elapsed: 20s`
        },
        {
            command: "hedra graph check",
            description: "Checks that the specified graph adheres to Hedra's rules for valid graphs.",
            requiredArguments: [
                {
                    name: "[path]",
                    description: "Path to the graph file or (if this command is run in a project directory) graph name.",
                    valueType: "string",
                    example: "./test.py"
                }
            ],
            optionalArguments: [
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra graph check test.py",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Validating graph - test - at - test.py.

Loaded graph.
Validating - 4 - stages.

Validation complete!

`
        },
        {
            command: "hedra plugin create",
            description: "Creates a plugin starter template for the specified type of plugin at the specified path.",
            requiredArguments: [
                {
                    name: "[plugin_type]",
                    description: "The type of plugin to create a starter template for. Valid options are Engine, Optmizer, Persona, and Reporter.",
                    valueType: "string",
                    example: "engine"
                },
                {
                    name: "[path]",
                    description: "Path to the graph file or (if this command is run in a project directory) graph name.",
                    valueType: "string",
                    example: "./test.py"
                }
            ],
            optionalArguments: [],
            exampleCommand: "hedra create plugin engine ./postgresql_engine.py",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Creating new - engine - plugin at - ./postgres_engine.py.
Saving template.

Plugin generated!

`
        },
        {
            command: "hedra project about",
            description: "Provides a summary of the project in the current directory - including known graphs, plugins, and project config options.",
            requiredArguments: [],
            optionalArguments: [
                {
                    name: "--path",
                    description: "Path to the graph file or (if this command is run in a project directory) graph name.",
                    valueType: "string",
                    example: "/home/myuser/myproject",
                    defaultValue: "[$PWD]",
                    isFlag: false
                }
            ],
            exampleCommand: "hedra project about",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Project - Example

Graphs:
 - test at /home/hedra/Documents/Workbench/tests/test.py
 - test_two at /home/hedra/Documents/Workbench/tests/test_two.py

Plugins:
 - No plugins registered

Core Options:
 - bypass_connection_validation set as False
 - connection_validation_retries set as 3

`
        },
        {
            command: "hedra project create",
            description: "Creates a project synced to the specified git repository URL at the specified path.",
            requiredArguments: [
                {
                    name: "[url]",
                    description: "The HTTPS url of the Git remote repository.",
                    valueType: "string",
                    example: "https://github.com/hedra/examples.git"
                }
            ],
            optionalArguments: [
                {
                    name: "--project-name",
                    description: "The name to use for the project.",
                    valueType: "string",
                    example: "my-first-project",
                    defaultValue: "hedra",
                    isFlag: false
                },
                {
                    name: "--path",
                    description: "Path to create the project at.",
                    valueType: "string",
                    example: "/home/myuser/myproject",
                    defaultValue: "[$PWD]",
                    isFlag: false
                },
                {
                    name: "--username",
                    description: "Optional username for the Git remote repository. Required for private repositories.",
                    valueType: "string",
                    example: "hedra-user",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: "--password",
                    description: "Optional password or API token for the Git remote repository. Required for private repositories.",
                    valueType: "string",
                    example: "HedraIsCool111!",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: '--bypass-connection-validation',
                    description: 'Sets all Setup stages is all graphs in the projects to skip verifying that all hosts specified in Action hooks can be reached.',
                    valueType: 'string',
                    example: '',
                    defaultValue: false,
                    isFlag: true
                },
                {
                    name: '--connection-validation-retries',
                    description: 'How many times Setup stages in the graph will attempt to verify hosts specified in Action hooks can be reached before failing the graph.',
                    valueType: 'integer',
                    example: 5,
                    defaultValue: 3,
                    isFlag: false
                },
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra project create .",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Checking if project exists at - /home/hedra/Documents/Workbench/test_hedra...
No project found! Creating project directories and files.
Initializing project manager.
Found - 0 - new graphs and - 0 - plugins.
Linking project to remote at - ..
Saving project state to .hedra.json config.
Project created!
`
        },
        {
            command: "hedra project get",
            description: "Clones down an existing project from the specified Git remote repository.",
            requiredArguments: [
                {
                    name: "[url]",
                    description: "The HTTPS url of the Git remote repository.",
                    valueType: "string",
                    example: "https://github.com/hedra/examples.git"
                }
            ],
            optionalArguments: [
                {
                    name: "--path",
                    description: "Path to create the project at.",
                    valueType: "string",
                    example: "/home/myuser/myproject",
                    defaultValue: "[$PWD]",
                    isFlag: false
                },
                {
                    name: "--branch",
                    description: "Git branch of the project repository to checkout after cloning down.",
                    valueType: "string",
                    example: "test-updates",
                    defaultValue: "main",
                    isFlag: false
                },
                {
                    name: "--remote",
                    description: "Name of the Git remote to use.",
                    valueType: "string",
                    example: "alt-origin",
                    defaultValue: "origin",
                    isFlag: false
                },
                {
                    name: "--username",
                    description: "Optional username for the Git remote repository. Required for private repositories.",
                    valueType: "string",
                    example: "hedra-user",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: "--password",
                    description: "Optional password or API token for the Git remote repository. Required for private repositories.",
                    valueType: "string",
                    example: "HedraIsCool111!",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: '--bypass-connection-validation',
                    description: 'Sets all Setup stages is all graphs in the projects to skip verifying that all hosts specified in Action hooks can be reached.',
                    valueType: 'string',
                    example: '',
                    defaultValue: false,
                    isFlag: true
                },
                {
                    name: '--connection-validation-retries',
                    description: 'How many times Setup stages in the graph will attempt to verify hosts specified in Action hooks can be reached before failing the graph.',
                    valueType: 'integer',
                    example: 5,
                    defaultValue: 3,
                    isFlag: false
                },
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra project get https://github.org/hedra/example.git",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Fetching project at - https://github.com/hedra/example.git - and saving at - /home/hedra/Documents/Workbench/example...
Initializing project manager.
Found - 5 - new graphs and - 3 - plugins.
Saving project state to .hedra.json config.
Project fetch complete!

`
        },
        {
            command: "hedra project sync",
            description: "Pulls down the latest changes on the set or speciied branch of the project's remote Git repository, discoveres new graphs and plugins, then pushes any changes made locally.",
            requiredArguments: [],
            optionalArguments: [
                {
                    name: "--url",
                    description: "The HTTPS url of the Git remote repository. If one is not provided the one in the project's .hedra.json will be used.",
                    valueType: "string",
                    example: "https://github.com/hedra/examples.git",
                    defaultValue: "[hedra_config_file_value]",
                    isFlag: false
                },
                {
                    name: "--path",
                    description: "Path to create the project at.",
                    valueType: "string",
                    example: "/home/myuser/myproject",
                    defaultValue: "[$PWD]",
                    isFlag: false
                },
                {
                    name: "--branch",
                    description: "Git branch of the project repository to checkout after cloning down.",
                    valueType: "string",
                    example: "test-updates",
                    defaultValue: "main",
                    isFlag: false
                },
                {
                    name: "--remote",
                    description: "Name of the Git remote to use.",
                    valueType: "string",
                    example: "alt-origin",
                    defaultValue: "origin",
                    isFlag: false
                },
                {
                    name: "--username",
                    description: "Optional username for the Git remote repository. Required for private repositories. If one is not provided the one in the project's .hedra.json will be used.",
                    valueType: "string",
                    example: "hedra-user",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: "--password",
                    description: "Optional password or API token for the Git remote repository. Required for private repositories. If one is not provided the one in the project's .hedra.json will be used.",
                    valueType: "string",
                    example: "HedraIsCool111!",
                    defaultValue: "None",
                    isFlag: false
                },
                {
                    name: "--sync-message",
                    description: "The message used for the local Git commit that is then pushed to the project's remote Git repository.",
                    valueType: "string",
                    example: "'hedra-dev: added two new graphs to test the new refunds API'",
                    defaultValue: "Hedra graph update: [project_path] [timestamp]",
                    isFlag: false
                },
                {
                    name: "--ignore",
                    description: "A comma-delimited list of files or paths to add to the project's .gitignore.",
                    valueType: "string",
                    example: "party.py,bad_test.py",
                    defaultValue: "[None]",
                    isFlag: false
                },
                {
                    name: '--bypass-connection-validation',
                    description: 'Sets all Setup stages is all graphs in the projects to skip verifying that all hosts specified in Action hooks can be reached.',
                    valueType: 'string',
                    example: '',
                    defaultValue: false,
                    isFlag: true
                },
                {
                    name: '--connection-validation-retries',
                    description: 'How many times Setup stages in the graph will attempt to verify hosts specified in Action hooks can be reached before failing the graph.',
                    valueType: 'integer',
                    example: 5,
                    defaultValue: 3,
                    isFlag: false
                },
                {
                    name: '--log-level',
                    description: 'Sets the log level for the Hedra logger when running this command.',
                    valueType: 'string',
                    example: 'error',
                    defaultValue: 'info',
                    isFlag: false
                }
            ],
            exampleCommand: "hedra project sync",
            exampleOutput: `      :::    :::       ::::::::::       :::::::::       :::::::::           :::  
     :+:    :+:       :+:              :+:    :+:      :+:    :+:        :+: :+: 
    +:+    +:+       +:+              +:+    +:+      +:+    +:+       +:+   +:+ 
   +#++:++#++       +#++:++#         +#+    +:+      +#++:++#:       +#++:++#++: 
  +#+    +#+       +#+              +#+    +#+      +#+    +#+      +#+     +#+  
 #+#    #+#       #+#              #+#    #+#      #+#    #+#      #+#     #+#   
###    ###       ##########       #########       ###    ###      ###     ###     0.6.21


Running project sync at - /home/hedra/Documents/Workbench/example...
Initializing project manager.
Found - 2 - new graphs and - 0 - plugins.
Synchronizing project state with remote at - https://github.com/hedra/example.git...
Saving project state to .hedra.json config.
Sync complete!

`
        }
    ]

    return ({
        commands,
        setCommandsReference: (updatedCommands) => set(() => ({ commands: updatedCommands }))
    })
})


export {
    useCommandsStore
}