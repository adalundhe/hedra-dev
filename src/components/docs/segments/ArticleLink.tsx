import { useRouter } from "next/router"
import { useCallback, useRef } from "react"
import { shallow } from "zustand/shallow"
import { useDocsStore, useScrollStore } from "../../../store"



const ArticleLink = ({
    article,
    subsection,
    text
}: {
    article: string,
    subsection: string,
    text: string
}) => {

    let subSectionSlug = subsection?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
    if (subSectionSlug[subSectionSlug.length -1] === '-'){
        subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
    }

    const {
        refs, 
        section,
        selectedSubsection,
        subsections,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        refs: state.subSectionRefs,
        navRefs: state.docsNavRefs,
        setNavRefs: state.setDocsNavRefs,
        section: state.selectedSection,
        selectedSubsection: state.selectedSubSection,
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
        <button 
        onClick={() => {


            setClickedScroll(true)
            if (article !== section || subsection !== selectedSubsection){


                const selectedSubSectionIdx = subsections[article]?.indexOf(subsection) as number;
                const subsectionCount = subsections[article]?.length ?? 1;
                const sectionHeight = subsections[article]?.slice(0, selectedSubSectionIdx + 1).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                setLastScrollY(sectionHeight)
                setSection(article)
                setSubSection(subsection)

                if (selectedSubSectionIdx === 0){
                    refs[subsection]?.scrollRef?.current?.scrollTo({top: 0});

                } else if (selectedSubSectionIdx === (subsectionCount - 1)){
                    scrollRef?.current?.scrollTo({top: scrollRef.current.clientHeight})

                }

                router.push(`/docs/${section}#${subsection}`)
                
            }
            
            
        
        }}

            className="text-[#038aff] hover:underline">
        {text}
        </button> 
    )
}


export {
    ArticleLink
}