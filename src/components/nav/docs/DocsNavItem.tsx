import { RxDotFilled, RxDot } from 'react-icons/rx';
import { useInView } from "react-intersection-observer"
import { useCallback, useEffect, useMemo, useRef } from 'react';
import shallow from 'zustand/shallow'
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
                'text-xl text-[#038aff]/70 hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-medium underline' : 'text-xl text-[#14151a] hover:bold cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;
    
    const caretStyle = subSectionName === subsection ? 
        "h-full text-xl mr-2 text-[#038aff]/80 hover:text-[#038aff]/70" : "h-full text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";


    const {
        scrollRef,
        setLastScrollY

    } = useScrollStore(useCallback((state) => ({
        scrollRef: state.scrollRef,
        setLastScrollY: state.setLastScrollY
    }), []))
    


    const divRef = useRef<HTMLDivElement>(null);

    const { ref, inView } = useInView();

    useEffect(() => {

        if (router.isReady){
            setNavRefs({
                ...navRefs, 
                [subSectionName]: {
                    scrollRef: divRef,
                    height: divRef.current?.clientHeight,
                    viewRef: ref,
                    inView: inView
                }
            })
        }

    }, [router.isReady])


    return (
        <div
            className='pb-2'
        >
            <div className={`${subSectionName === subsection ? 'bg-[#038aff]/5 rounded-sm py-2' : ''}`}>
                <button 
                    className="w-fit text-left flex items-center"
                    type="button" 
                    onClick={() => {
                        setSection(sectionName)
                        setSubSection(subSectionName)


                        if (sectionName !== section || subSectionName !== subsection){
                            const selectedSubSectionIdx = subsections[sectionName]?.indexOf(subSectionName) as number
                            const sectionHeight = subsections[sectionName]?.slice(0, selectedSubSectionIdx).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                            setLastScrollY(sectionHeight)
                            
                            refs[subSectionName]?.scrollRef?.current?.scrollIntoView({ inline: 'nearest', block: 'center' })
                            scrollRef?.current?.focus({preventScroll: true})

                        }
                  
                    }}
                >
                    <div className={caretStyle}>
                        {
                            subSectionName === subsection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                        }
                    </div>
                    <div ref={ref}>
                        <p ref={divRef} className={subSectionStyle}>{subSectionName}</p>
                    </div>
                </button>
            </div>
        </div>
    )

}

export {
    DocsNavItem
}