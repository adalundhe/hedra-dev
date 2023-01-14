import { Introduction } from './introduction'
import { Philosophy } from './philosophy'
import { CoreConcepts } from './core_concepts'
import { CommandLine } from './command_line'


const articles: {[key: string]: JSX.Element} = {
    'Introduction': <Introduction />,
    'Philosophy': <Philosophy />,
    'Core Concepts': <CoreConcepts />,
    'Command Line': <CommandLine />
}

export default articles