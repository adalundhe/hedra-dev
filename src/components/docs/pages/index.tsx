import { Introduction } from './introduction'
import { Philosophy } from './philosophy'
import { CoreConcepts } from './core_concepts'


const articles: {[key: string]: JSX.Element} = {
    'Introduction': <Introduction />,
    'Philosophy': <Philosophy />,
    'Core Concepts': <CoreConcepts />
}

export default articles