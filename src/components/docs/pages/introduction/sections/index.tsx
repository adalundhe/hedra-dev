import { Setup } from './Setup';
import { SystemRequirements } from './SystemRequirements';
import { Welcome } from './Welcome';
import { DeveloperSetup } from './DeveloperSetup';

type Section = typeof Welcome | typeof SystemRequirements | typeof Setup


const IntroductionSection = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const sections: {[key:string]: Section} = {
        'Setup': Setup,
        'System requirements': SystemRequirements,
        'Welcome': Welcome,
        "Developer setup": DeveloperSetup
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    IntroductionSection
}