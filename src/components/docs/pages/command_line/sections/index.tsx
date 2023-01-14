import { CLIOverview } from './CLIOverview';
import { CLIReference } from './CLIReference';
import { CLILoggingOptions } from './CLILoggingOptions';


type Section = typeof CLIOverview | typeof CLIReference | typeof CLILoggingOptions 

const CommandLineSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'CLI Overview': CLIOverview,
        'CLI Reference': CLIReference,
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