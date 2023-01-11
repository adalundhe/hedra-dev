import { Section } from "../../../sections";


const IntroductionToHooks = ({
    subSectionName
}: {
    subSectionName: string
}) => <Section 
        subSectionName={subSectionName}
        >
        <div>
            <p>
                Hooks are the fundamental unit of a Hedra test - they represent the individual actions or tasks that you want the framework
                to execute.
            </p>
        </div>
        </Section>


export {
    IntroductionToHooks
}