import { IconType } from 'react-icons'


const PointList = ({ 
    name,
    icons,
    points
 }: {
    name: string
    icons: JSX.Element[],
    points: string[]
 }) => <ul className="mx-10 my-8">
        {
            points.map((point: string, idx: number) => 
                <li className="flex items-center" key={`${name}-${idx}`}>
                    <div className="mr-3 my-3">
                        {icons[idx]}
                    </div>
                    <p>{point}</p>
                </li>
            )
        }
        </ul>


export {
    PointList
}