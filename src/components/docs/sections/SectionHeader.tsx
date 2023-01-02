import { useEffect, useRef } from "react";
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

    const scrollRef = useRef<HTMLDivElement>(null)
    const { ref, inView } = useInView()


    useEffect(() => {

        if (inView && setSelectedSubSection){
            setSelectedSubSection(subSectionName)
        }

        if (subSectionName === selectedSubSection && setSelectedSection && setSelectedSubSection && !inView){

            scrollRef.current?.click();
            scrollRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'})
        }
    }, [selectedSection, selectedSubSection, inView])

    const sectionHref = subSectionName.toLowerCase().replace(/\s+/g, '-');

    return (
        <div ref={scrollRef}>
            <a id={sectionHref} href={`#${sectionHref}`}>
                <h1 ref={ref} className="text-2xl mb-4">{subSectionName}</h1>
            </a>
        </div>
    )
}


export {
    SectionHeader
}