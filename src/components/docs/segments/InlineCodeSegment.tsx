import { useRouter } from "next/router"
import { useCallback, useRef } from "react"
import shallow from "zustand/shallow"
import { useDocsStore, useScrollStore } from "../../../store"


const InlineCodeSegment = ({
    children,
    reference
}: {
    children: string,
    reference?: string
}) => {

    const segmmentStyle = useRef(`inline mx-1 font-creato font-[600] tracking-widest text-[0.8em] rounded bg-[#2e3131]/90 text-[#eeeeee] px-2 py-1 ${reference ? 'hover:bg-[#2e3131]/70 cursor-pointer' : ''}`)

    const {
        refs, 
        section,
        subsection,
        subsections,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        refs: state.subSectionRefs,
        navRefs: state.docsNavRefs,
        setNavRefs: state.setDocsNavRefs,
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        subsections: state.subsections,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection
    }), []), shallow)

    const router = useRouter();


    const {
        scrollRef,
        setLastScrollY,
        setClickedScroll

    } = useScrollStore(useCallback((state) => ({
        scrollRef: state.scrollRef,
        setLastScrollY: state.setLastScrollY,
        setClickedScroll: state.setClickedScroll
    }), []))
    

    return (
        reference ? 
        <button
            className={segmmentStyle.current} 
            
            onClick={() => {

                const referenceParts = reference.split('#') as string[]
                const sectionName = referenceParts.at(0) as string;
                const subSectionName = referenceParts.at(1) as string;


                setClickedScroll(true)
                if (sectionName !== section || subSectionName !== subsection){


                    const selectedSubSectionIdx = subsections[sectionName]?.indexOf(subSectionName) as number;
                    const subsectionCount = subsections[sectionName]?.length ?? 1;
                    const sectionHeight = subsections[sectionName]?.slice(0, selectedSubSectionIdx + 1).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                    setLastScrollY(sectionHeight)
                    setSection(sectionName)
                    setSubSection(subSectionName)

                    if (selectedSubSectionIdx === 0){
                        refs[subSectionName]?.scrollRef?.current?.scrollTo({top: 0});

                    } else if (selectedSubSectionIdx === (subsectionCount - 1)){
                        scrollRef?.current?.scrollTo({top: scrollRef.current.clientHeight})

                    }

                    router.push(`/docs/${section}#${subSectionName}`)
                    
                }
                
                
            
            }}
        
        >{children}</button>  :
        <p className={segmmentStyle.current}>
        {children}
        </p>
    )
}


export {
    InlineCodeSegment
}