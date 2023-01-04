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
            let subSectionSlug = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
            if (subSectionSlug[subSectionSlug.length -1] === '-'){
                subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
            }

            history.pushState(window.history.state, "page 2", `${section}#${subSectionSlug}`);
            
        }

    }, [inView])

    let sectionHref = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
    if (sectionHref[sectionHref.length -1] === '-'){
        sectionHref = sectionHref.slice(0, sectionHref.length - 1)
    }

    return (
        <div ref={scrollRef}>
            <a id={sectionHref} href={`#${sectionHref}`}>
                <h1 ref={ref} className="text-[2rem] mb-4 font-semibold">{subSectionName}</h1>
            </a>
        </div>
    )
}


export {
    SectionHeader
}