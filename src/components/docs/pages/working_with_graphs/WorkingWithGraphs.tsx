import { WorkingWithGraphsSection } from "./sections"


const WorkingWithGraphs = ({
    subsections,
}: {
    subsections?: string[]
}) => {

    return (
        <div className="w-full">
            {
                subsections?.map(subSectionName => 
                    <div key={`sub-section-${subSectionName.toLowerCase().replace(/\s+./, '-')}`}>
                        <WorkingWithGraphsSection subSectionName={subSectionName} />
                    </div>
                )
            }
        </div>
    )
}


export {
    WorkingWithGraphs
}