import { RefObject, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { useInView } from "react-intersection-observer"
import { useDocsStore } from "../../../store";
import { shallow } from 'zustand/shallow';
import { ScrollRef } from "../../../store/types";
import { useRouter } from "next/router";

const SectionHeader = ({
    subSectionName
}: {
    subSectionName: string
}) => {


    const router = useRouter();
    const ref = useRef<HTMLDivElement>(null);

    const {
        subsection,
        subsections
    } = useDocsStore(useCallback((state) => ({
        subsection: state.selectedSubSection,
        subsections: state.selectedSubSections
    }), []))

    let sectionHref = subSectionName.toLowerCase().replace(/[^A-Za-z0-9]/g, '-');
    if (sectionHref[sectionHref.length -1] === '-'){
        sectionHref = sectionHref.slice(0, sectionHref.length - 1)
    }


    useEffect(() => {

        if (router.isReady && subSectionName === subsection && subsections.indexOf(subSectionName) > 0){

            const timeout = setTimeout(() => {
                ref.current?.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'})
            }, 500)

            return () => clearTimeout(timeout)
        }

    }, [router.isReady])

    return (
        <div ref={ref}>
            <a id={sectionHref} href={`#${sectionHref}`} >
                <h1 className="text-[2rem] mb-8 font-semibold">{subSectionName}</h1>
            </a>
        </div>
    )
}


export {
    SectionHeader
}