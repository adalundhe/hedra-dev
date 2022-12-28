import { useEffect } from "react";
import { useInView } from "react-intersection-observer"


const SectionHeader = ({
    subSectionName,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    subSectionName: string,
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection?(sectionName: string): void,
    setSelectedSubSection?(subSectionName: string): void
}) => {


    const { ref, inView } = useInView();

    useEffect(() => {
        console.log(subSectionName, inView)
        if (inView && setSelectedSection && setSelectedSubSection){
            setSelectedSection(selectedSection)
            setSelectedSubSection(subSectionName)
        }
    }, [inView])

    return (
        <div>
            <a id={subSectionName.toLowerCase().replace(/\s+/g, '-')}>
                <h1 ref={ref} className="text-2xl mb-4">{subSectionName}</h1>
            </a>
        </div>
    )
}


export {
    SectionHeader
}