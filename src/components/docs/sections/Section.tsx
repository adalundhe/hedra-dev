import { SectionHeader } from "./SectionHeader";



const Section = ({
    children,
    subSectionName,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    children: JSX.Element,
    subSectionName: string,
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection?(sectionName: string): void,
    setSelectedSubSection?(subSectionName: string): void
}) => {


    return (
        <div className="pb-8">
            <SectionHeader      
                subSectionName={subSectionName}
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection} 

            />
            {children}
        </div>
    )
}


export {
    Section
}