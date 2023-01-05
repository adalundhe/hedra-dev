import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
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
            height: sectionRef.current?.clientHeight
        }
    
        setRefs(refs)

    }, [router.isReady])



    return (
        <div className="pb-8" ref={sectionRef}>
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