import { Section } from "../../../sections";
import { CommandReferenceEntry } from './commands'
import { useCommandsStore } from "../../../../../store";
import { CommandReference } from "../../../../../store/types";
import { useCallback, useMemo } from "react";
import { shallow } from "zustand/shallow";


const CLIReferenceSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {


    const commands = useCommandsStore(useCallback((state) => state.commands, []), shallow);

    const cliCategory = useMemo(() => {

        const commandCategory = subSectionName.split(/\s+/).at(0)?.toLowerCase() ?? "";
        return {
            commands: commands.filter(command => command.commandCategory === commandCategory),
            category: commandCategory
        };
    }, []);

    return (
        <Section 
        subSectionName={subSectionName}
        >
        <div>
            {
                cliCategory.commands.length > 0 ?
                <>
                    <div>
                        The following is a reference list of {cliCategory.category} commands - including required and optional arguments, description, and an example.
                    </div>
                    <div className="my-12">
                    {
                        cliCategory.commands.map((command: CommandReference, idx: number) => <div key={`cli-command-${idx}`}>
                            <CommandReferenceEntry {...command} commandIdx={idx}/>
                        </div>)
                    }
                    </div>
                </> : <div>This functionality is currently under development and documentation will be added soon!</div>
            }
        </div>
        </Section>

    )
}

export {
    CLIReferenceSection
}