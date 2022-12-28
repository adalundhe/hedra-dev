import { useState, useEffect } from "react";
import { useWindowDimensions } from '../../../hooks'
import { RxDotFilled, RxDot } from 'react-icons/rx'
import { DocsLinkItem, DocsLinkSubsections } from "../../../data/types";


const DocsSectionGuide = ({
    docsData,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    docsData: {
        all: DocsLinkItem[],
        subsections: DocsLinkSubsections
    },
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void

}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    return (
        <div className="hidden lg:max-w-xs 2xl:block sticky top-0 left-0 right-0 py-0 z-50 h-[88vh]">
            <div className="flex flex-col justify-center items-center font-rany w-[20vmin]">
                <div className="py-4 px-4 w-full">
                    <h3 className="text-2xl text-left w-full">On this page</h3>
                </div>
                {
                    docsData.subsections[selectedSection]?.map(subSectionName => {

                        const subSectionStyle = subSectionName === selectedSubSection ? 
                        'text-xl text-[#038aff]/70 cursor-pointer hover:text-[#038aff]/70  w-fit font-medium underline' : 'text-xl text-[#14151a] cursor-pointer hover:text-[#038aff]/70 w-fit font-light' ;

                        const caretStyle = subSectionName === selectedSubSection ? 
                        "text-xl mr-2 text-[#038aff]/70 hover:text-[#038aff]/80" : "text-xl mr-2 text-[#14151a] hover:text-[#038aff]/70";


                        return (
                            <div
                                key={`${selectedSection}-${subSectionName}-Section-Guide`}
                                className='w-full pb-2'
                            >   
                                <div className={`${subSectionName === selectedSubSection ? 'bg-[#038aff]/5 rounded-sm py-2' : ''}`}>
                                    <button
                                        className={`text-left w-fit flex items-center`}
                                        type="button" 
                                        onClick={() => {
                                            setSelectedSection(selectedSection)
                                            setSelectedSubSection(subSectionName)
                                        }}
                                    >
                                        <div className={caretStyle}>
                                            {
                                                subSectionName === selectedSubSection ? <RxDotFilled /> : <RxDot className="opacity-0" />
                                            }
                                        </div>
                                        <a href={`#${subSectionName.toLowerCase().replace(/\s+/g, '-')}`}>
                                            <p className={`${subSectionStyle} flex`}>{subSectionName}</p>
                                        </a>
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