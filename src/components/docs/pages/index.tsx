import { Introduction } from './introduction'
import { Philosophy } from './philosophy'


const articles: {[key: string]: JSX.Element} = {
    'Introduction': <Introduction />,
    'Philosophy': <Philosophy />
}

export default articles