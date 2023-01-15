import { Section } from "../../../sections";
import { CommandReferenceEntry } from './commands'
import { useCommandsStore } from "../../../../../store";
import { CommandReference } from "../../../../../store/types";
import { useCallback } from "react";
import { shallow } from "zustand/shallow";


const CLIReference = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const commands = useCommandsStore(useCallback((state) => state.commands, []), shallow)

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            <div>
                The following is a reference list of Hedra commands - including required and optional arguments, description, and an example.
            </div>
            <div className="my-12">
            {
                commands.map((command: CommandReference, idx: number) => <div key={`cli-command-${idx}`}>
                    <CommandReferenceEntry {...command} commandIdx={idx}/>
                </div>)
            }
            </div>
        </div>
        </Section>

    )
}

export {
    CLIReference
}