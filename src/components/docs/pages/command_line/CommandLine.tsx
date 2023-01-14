import { CommandLineSection } from "./sections"


const CommandLine = ({
    subsections,
}: {
    subsections?: string[]
}) => {

    return (
        <div className="w-full">
            {
                subsections?.map(subSectionName => 
                    <div key={`sub-section-${subSectionName.toLowerCase().replace(/\s+./, '-')}`}>
                        <CommandLineSection subSectionName={subSectionName} />
                    </div>
                )
            }
        </div>
    )
}


export {
    CommandLine
}