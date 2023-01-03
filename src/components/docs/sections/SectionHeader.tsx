import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer"
import { useDocsStore } from "../../../store";
import shallow from 'zustand/shallow';

const SectionHeader = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const { ref, inView } = useInView()
    const scrollRef = useRef<HTMLDivElement>(null);

    const { 
        section,
        setSubsection,
    } = useDocsStore(useCallback((state) => ({
        section: state.selectedSection,
        setSubsection: state.setSelectedSubSection,
    }), []), shallow)



    useEffect(() => {
        if (inView){
            setSubsection(subSectionName)
            const subSectionSlug = subSectionName.toLowerCase().replace(/\s+/g, '-')
            history.pushState(window.history.state, "page 2", `${section}#${subSectionSlug}`);
            scrollRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'})

        }

    }, [inView, section])

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