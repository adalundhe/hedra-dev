import { Section } from "../../sections"
import { IntroductionSection } from "./sections"


const Introduction = ({
    subsections,
}: {
    subsections?: string[]
}) => {

    return (
        <div className="w-full">
            {
                subsections?.map(subSectionName => 
                    <div key={`sub-section-${subSectionName.toLowerCase().replace(/\s+./, '-')}`}>
                        <IntroductionSection subSectionName={subSectionName} />
                    </div>
                )
            }
        </div>
    )
}


export {
    Introduction
}