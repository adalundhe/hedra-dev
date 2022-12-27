import { useData } from "../../../data";
import { useState, useEffect } from "react";
import { useWindowDimensions } from '../../../hooks'
import { RxDotFilled, RxDot } from 'react-icons/rx'

const DocsSectionGuide = ({
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
    selectedSection: string,
    selectedSubSection: string,
    setSelectedSection(sectionName: string): void,
    setSelectedSubSection(subSectionName: string): void

}) => {

    const data = useData();
    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    return (
        windowWidth > 1536 ? 
        <div className="top-[58px] absolute left-[82.5%]">
             <div className="flex flex-col justify-center items-center font-rany w-[20vmin] mt-20">
            <h3 className="text-[1.75vmin] text-left w-full ml-14">On this page</h3>
            {
                    data.subsections[selectedSection]?.map(subSectionName => {

                        const subSectionStyle = subSectionName === selectedSubSection ? 
                        'text-[1.40vmin] text-[#038aff] cursor-pointer hover:text-[#038aff]  w-fit font-medium underline' : 'text-[1.40vmin] text-[#14151a] cursor-pointer hover:text-[#038aff] w-fit font-light' ;

                        const caretStyle = subSectionName === selectedSubSection ? 
                        "h-full text-[1.40vmin] mr-2 text-[#038aff] hover:text-[#038aff]" : "h-full text-[1.40vmin] mr-2 text-[#14151a] hover:text-[#038aff]";


                        return (
                            <div
                                key={`${selectedSection}-${subSectionName}-Section-Guide`}
                                className='w-full pb-2'
                            >
                                <button
                                    className="text-left w-fit flex items-center "
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
                                    <p className={`${subSectionStyle} flex`}>{subSectionName}</p>
                                </button>
                            </div>
                        )
                    })
                }
            </div>
        </div> : <div></div>
    )
}


export {
    DocsSectionGuide
}