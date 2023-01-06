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
        setLastScrollY

    } = useScrollStore(useCallback((state) => ({
        scrollDirection: state.scrollDirection,
        lastScrollY: state.lastScrollY,
        scrollThreshold: state.scrollThreshold,
        setScrollDirection: state.setScrollDirection,
        setLastScrollY: state.setLastScrollY
    }), []))
    

    return (
        <div className="hidden lg:max-w-xs 2xl:block sticky top-0 left-0 right-0 py-0 z-50 h-[70vh]">
            <div className="flex flex-col justify-center items-center font-rany w-[20vmin]">
                <div className="py-4 px-4 w-full">
                    <h3 className="text-2xl text-left w-full">On this page</h3>
                </div>
                {
                    subsections?.map(subSectionName => {

                        const subSectionStyle = subSectionName === subsection ? 
                        'text-xl text-[#038aff]/70 cursor-pointer hover:text-[#038aff]/70  w-fit font-medium underline' : 'text-xl text-[#14151a] cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;

                        const caretStyle = subSectionName === subsection ? 
                        "text-xl mr-2 text-[#038aff]/70 hover:text-[#038aff]/80" : "text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";

                        let subSectionSlug = subSectionName?.toLowerCase().replace(/[^A-Za-z0-9]/g, '-')
                        if (subSectionSlug[subSectionSlug.length -1] === '-'){
                            subSectionSlug = subSectionSlug.slice(0, subSectionSlug.length - 1)
                        }
                    


                        return (
                            <div
                                key={`${section}-${subSectionName}-Section-Guide`}
                                className='w-full pb-2'
                            >   
                                <div className={`${subSectionName === subsection ? 'bg-[#038aff]/5 rounded-sm py-2' : ''}`}>
                                    <button
                                        className={`text-left w-fit flex items-center`}
                                        type="button" 
                                        onClick={() => {

                                            const currentSubSectionIdx = subsections?.indexOf(subSectionName) as number
                                            const sectionHeight = subsections?.slice(0, currentSubSectionIdx + 1).reduce((sum: number, subSection: string) => sum + (refs[subSection]?.height ?? 0), 0) ?? 0;

                                            setLastScrollY(sectionHeight + 1)
                                            refs[subSectionName]?.scrollRef?.current?.scrollIntoView({ block: 'start' })

                                            setSection(section)
                                            setSubSection(subSectionName)
                                            

                                        }}
                                    >
                                        <div className={caretStyle}>
                                            {
                                                subSectionName === subsection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                                            }
                                        </div>
                                        <p className={`${subSectionStyle} flex`}>{subSectionName}</p>
                                    </button>
                                </div>
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