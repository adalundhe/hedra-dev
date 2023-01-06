import { useState, useEffect, useCallback } from "react";
import { useWindowDimensions } from '../../../hooks'
import { RxDotFilled, RxDot } from 'react-icons/rx'
import { DocsLinkItem, DocsLinkSubsections } from "../../../store/types";
import { useDocsStore, useScrollStore } from "../../../store";
import shallow from 'zustand/shallow'


const DocsSectionGuide = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { 
        refs,
        section,
        subsection,
        subsections,
        setSection, 
        setSubSection
    } = useDocsStore(useCallback((state) => ({
        refs: state.subSectionRefs,
        section: state.selectedSection,
        subsection: state.selectedSubSection,
        subsections: state.selectedSubSections,
        setSection: state.setSelectedSection,
        setSubSection: state.setSelectedSubSection
    }), []), shallow)

    const {
        scrollThreshold,
        scrollRef,
        setLastScrollY,
        setClickedScroll

    } = useScrollStore(useCallback((state) => ({
        scrollRef: state.scrollRef,
        scrollDirection: state.scrollDirection,
        lastScrollY: state.lastScrollY,
        scrollThreshold: state.scrollThreshold,
        setScrollDirection: state.setScrollDirection,
        setLastScrollY: state.setLastScrollY,
        setClickedScroll: state.setClickedScroll
    }), []))
    

    return (
        <div className="hidden lg:max-w-xs 2xl:block sticky top-0 left-0 right-0 py-0 z-50 h-[70vh] pt-10">
            <div className="flex flex-col justify-center items-center font-rany w-[20vmin]">
                <div className="py-4 px-4 w-full">
                    <h3 className="text-2xl text-left w-full">On this page</h3>
                </div>
                {
                    subsections?.map(subSectionName => {

                        const subSectionStyle = subSectionName === subsection ? 
                        'text-xl hover:bold cursor-pointer w-fit font-medium underline' : 'text-xl hover:bold cursor-pointer w-fit font-light' ;

                        const caretStyle = subSectionName === subsection ? 
                        "h-full text-xl mr-2 text-[#038aff]/70 hover:text-[#038aff]" : "h-full text-xl mr-2 text-[#14151a] hover:text-[#14151a]";

                        let subSectionSlug = subSectionName?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
                        if (subSectionSlug[subSectionSlug.length -1] === '-'){
                            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
                        }
                    


                        return (
                            <div
                                key={`${section}-${subSectionName}-Section-Guide`}
                                className='w-full'
                            >   
                                <button
                                    className={`my-2 text-left outline-none w-[85%] cursor-pointer py-4 flex items-center ${subSectionName === subsection ? 'bg-[#038aff]/5 hover:text-[#038aff] text-[#038aff]/70  rounded-sm' : 'hover:bg-[#2e3131]/5 text-[#14151a]/70 hover:text-[#14151a]'}`}
                                    type="button" 
                                    onClick={() => {

                                        if (subSectionName !== subsection){
                                            const selectedSubSectionIdx = subsections?.indexOf(subSectionName) as number
                                            const sectionHeight = subsections?.slice(0, selectedSubSectionIdx).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;
                                            
                                            setClickedScroll(true)
                                            setLastScrollY(sectionHeight)
                                            setSection(section)
                                            setSubSection(subSectionName)
                                            
                                            
                                            refs[subSectionName]?.scrollRef?.current?.scrollIntoView({ inline: 'start', block: 'start' })

                                            scrollRef?.current?.focus({preventScroll: true})

                                            // setClickedScroll(false)
                                        }

                                    }}
                                >
                                    <div className={caretStyle}>
                                        {
                                            subSectionName === subsection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                                        }
                                    </div>
                                        <p className={subSectionStyle}>{subSectionName}</p>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export {
    DocsSectionGuide
}