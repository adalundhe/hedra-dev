import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import shallow from "zustand/shallow";
import { useDocsStore } from "../../../store";
import { SectionHeader } from "./SectionHeader";



const Section = ({
    children,
    subSectionName
}: {
    children: JSX.Element,
    subSectionName: string
}) => {

    const router = useRouter()
    const { ref, inView } = useInView()
    const sectionRef = useRef<HTMLDivElement>(null);
    const { 
        refs,
        setRefs
    } = useDocsStore(useCallback((state) => ({
        refs: state.subSectionRefs,
        setRefs: state.setSubSectionRefs
    }), []), shallow)

    

    useEffect(() => {
        refs[subSectionName] = {
            scrollRef: sectionRef,
            inView: inView,
            viewRef: ref,
            height: sectionRef.current?.scrollHeight
        }
    
        setRefs(refs)

    }, [router.isReady])

    return (
        <div ref={ref}>
            <div className="pb-8" ref={sectionRef} >
                <SectionHeader      
                    subSectionName={subSectionName}
                />
                {children}
            </div>
        </div>
    )
}


export {
    Section
}