import { PhilosophySection } from "./sections"


const Philosophy = ({
    subsections,
}: {
    subsections?: string[]
}) => {

    return (
        <div className="w-full">
            {
                subsections?.map(subSectionName => 
                    <div key={`sub-section-${subSectionName.toLowerCase().replace(/\s+./, '-')}`}>
                        <PhilosophySection subSectionName={subSectionName} />
                    </div>
                )
            }
        </div>
    )
}


export {
    Philosophy
}