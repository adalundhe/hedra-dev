import { SectionHeader } from "./SectionHeader";



const Section = ({
    children,
    subSectionName
}: {
    children: JSX.Element,
    subSectionName: string
}) => {


    return (
        <div className="pb-8">
            <SectionHeader      
                subSectionName={subSectionName}
            />
            {children}
        </div>
    )
}


export {
    Section
}