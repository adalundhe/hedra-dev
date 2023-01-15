import { RxDotFilled, RxDot } from 'react-icons/rx';
import { useInView } from "react-intersection-observer"
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { shallow } from 'zustand/shallow'
import { useDocsStore, useScrollStore } from '../../../store';
import { useRouter } from 'next/router';


const DocsNavItem = ({ 
    sectionName,
    subSectionName
 }: {
    sectionName: string,
    subSectionName: string
 }) => {

    const {
        refs, 
        navRefs,
        section,
        subsection,
        subsections,
        setSection, 
        setSubSection,
        setNavRefs
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
    
    const subSectionStyle = subSectionName === subsection ? 
                'text-xl hover:bold cursor-pointer w-fit font-medium underline' : 'text-xl hover:bold cursor-pointer w-fit font-light' ;
    
    const caretStyle = subSectionName === subsection ? 
        "h-full text-xl mr-2 text-[#038aff]/80 hover:text-[#038aff]" : "h-full text-xl mr-2 text-[#14151a]/70 hover:text-[#14151a]";


    const {
        scrollRef,
        setLastScrollY,
        setClickedScroll,
        setMobileLastScrollY,
        setShowMobileDocsNav,
        setDocsNavTimer
    } = useScrollStore(useCallback((state) => ({
        scrollRef: state.scrollRef,
        setLastScrollY: state.setLastScrollY,
        setClickedScroll: state.setClickedScroll,
        setMobileLastScrollY: state.setMobileLastScrollY,
        setShowMobileDocsNav: state.setShowMobileDocsNav,
        setDocsNavTimer: state.setDocsNavTimer
    }), []))
    


    const divRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView();

    useEffect(() => {

        if (router.isReady){
            navRefs[subSectionName] = {
                scrollRef: divRef,
                height: divRef.current?.clientHeight,
                viewRef: ref,
                inView: inView
            }
        
            setNavRefs(navRefs)
        }

    }, [section, subsection, router.isReady])


    return (
        <div
            className='w-full'
            ref={divRef}
        >
            <button 
                className={`w-full outline-none py-4 text-left flex items-center cursor-pointer px-2 my-1 ${subSectionName === subsection ? 'bg-[#038aff]/5 hover:text-[#038aff] text-[#038aff]/70  rounded-sm' : 'hover:bg-[#2e3131]/5 text-[#14151a]/70 hover:text-[#14151a]'}`}
                type="button" 
                onClick={() => {

                    setClickedScroll(true)
                    if (sectionName !== section || subSectionName !== subsection){


                        const selectedSubSectionIdx = subsections[sectionName]?.indexOf(subSectionName) as number;
                        const subsectionCount = subsections[sectionName]?.length ?? 1;
                        const sectionHeight = subsections[sectionName]?.slice(0, selectedSubSectionIdx + 1).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                        setLastScrollY(sectionHeight)
                        setSection(sectionName)
                        setSubSection(subSectionName)
                        setMobileLastScrollY(sectionHeight)
                        setShowMobileDocsNav(true)

                        if (selectedSubSectionIdx === 0){
                            refs[subSectionName]?.scrollRef?.current?.scrollTo({top: 0});

                        } else if (selectedSubSectionIdx === (subsectionCount - 1)){
                            scrollRef?.current?.scrollTo({top: scrollRef.current.clientHeight})

                        }

                        router.push(`/docs/${section}#${subSectionName}`)
                        
                    }    
                
                }}
            >
                <div className={caretStyle}>
                    {
                        subSectionName === subsection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                    }
                </div>
                <div ref={ref}>
                    <p className={subSectionStyle}>{subSectionName}</p>
                </div>
            </button>
        </div>
    )

}

export {
    DocsNavItem
}