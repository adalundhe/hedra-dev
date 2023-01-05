import { RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer"
import { useDocsStore } from "../../../store";
import shallow from 'zustand/shallow';
import { ScrollRef } from "../../../store/types";

const SectionHeader = ({
    subSectionName
}: {
    subSectionName: string
}) => {

    const { ref, inView } = useInView()
    const scrollRef = useRef<HTMLDivElement>(null);

    const { 
        refs,
        setRefs
    } = useDocsStore(useCallback((state) => ({
        refs: state.subSectionRefs,
        setRefs: state.setSubSectionRefs
    }), []), shallow)

    refs[subSectionName] = {
        scrollRef: scrollRef,
        inView: inView,
        viewRef: ref,
        height: refs[subSectionName]?.height ?? 0
    }

    setRefs(refs)

    let sectionHref = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
    if (sectionHref[sectionHref.length -1] === '-'){
        sectionHref = sectionHref.slice(0, sectionHref.length - 1)
    }

    return (
        refs[subSectionName]?.scrollRef ?
        <div >
            <a id={sectionHref} href={`#${sectionHref}`} ref={refs[subSectionName]?.viewRef}>
                <h1 ref={refs[subSectionName]?.scrollRef as RefObject<HTMLHeadingElement>} className="text-[2rem] mb-4 font-semibold">{subSectionName}</h1>
            </a>
        </div> : <></>
    )
}


export {
    SectionHeader
}