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
                    description: 'Sets all Setup stages to skip verifying that all hosts specified in Action hooks can be reached.',
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