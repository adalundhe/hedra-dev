import { useData } from "../../../data";
import { useState, useContext, useEffect } from "react";
import { useWindowDimensions } from '../../../hooks'


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
        <div className="2xl:col-span-5 col-span-6 w-full flex justify-center items-center h-full font-ran font-rany">
           <div className="flex w-full md:mx-20 mx-4">
           {
                data.subsections[selectedSection]?.map(subSectionName => {

                    const subSectionStyle = subSectionName === selectedSubSection ? 
                    'text-[1.5vmin] text-[#038aff] cursor-pointer hover:text-[#038aff] w-fit' : 'text-[1.5vmin] text-[#14151a] cursor-pointer hover:text-[#038aff] w-fit' ;


                    return (
                        <button
                            key={`${selectedSection}-${subSectionName}-Section-Guide`}
                            className="w-full flex justify-center mx-2"
                            type="button" 
                            onClick={() => {
                                setSelectedSection(selectedSection)
                                setSelectedSubSection(subSectionName)
                            }}
                        >
                            <p className={subSectionStyle}>{subSectionName}</p>
                        </button>
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