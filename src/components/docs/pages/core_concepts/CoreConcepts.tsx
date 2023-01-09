import { CoreConceptsSection } from "./sections"


const CoreConcepts = ({
    subsections,
}: {
    subsections?: string[]
}) => {

    return (
        <div className="w-full">
            {
                subsections?.map(subSectionName => 
                    <div key={`sub-section-${subSectionName.toLowerCase().replace(/\s+./, '-')}`}>
                        <CoreConceptsSection subSectionName={subSectionName} />
                    </div>
                )
            }
        </div>
    )
}


export {
    CoreConcepts
}