import { CLIOverview } from './CLIOverview';
import { CLIReferenceSection } from './CLIReferenceSection';
import { CLILoggingOptions } from './CLILoggingOptions';


type Section = typeof CLIOverview | typeof CLIReferenceSection | typeof CLILoggingOptions 

const CommandLineSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'CLI Overview': CLIOverview,
        'Graph commands': CLIReferenceSection,
        "Project commands": CLIReferenceSection,
        "Plugin commands": CLIReferenceSection,
        "Cloud commands": CLIReferenceSection,
        "Helper commands": CLIReferenceSection,
        'CLI Logging Options': CLILoggingOptions,
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    CommandLineSection
}