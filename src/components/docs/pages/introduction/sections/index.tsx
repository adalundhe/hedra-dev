import { Setup } from './Setup';
import { SystemRequirements } from './SystemRequirements';
import { Welcome } from './Welcome';
import { DevelopmentSetup } from './DevelopmentSetup';

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
        "Development setup": DevelopmentSetup
    }

    const Section = sections[subSectionName];

    return (
        Section ? <Section subSectionName={subSectionName} /> : <div></div>
    )

}


export {
    IntroductionSection
}