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
                    <IntroductionSection subSectionName={subSectionName} />
                )
            }
        </div>
    )
}


export {
    Introduction
}