import { cloneElement, useEffect, useState } from "react";
import { useWindowDimensions } from "../../../hooks";


const DocsArticle = ({ 
    children,
    selectedSection,
    selectedSubSection,
    pageSubSections,
    setSelectedSection,
    setSelectedSubSection
}: {
        children: JSX.Element,
        selectedSection: string,
        selectedSubSection: string,
        pageSubSections: string[],
        setSelectedSection(sectionName: string): void,
        setSelectedSubSection(subSectionName: string): void
}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions()

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    return (
        <div className="max-w-6xl ml-0 2xl:mx-auto overflow-x-hidden">
            <div className="font-rany text-[18px] leading-[30px] mb-auto">
                <div className="w-full">
                {
                cloneElement(children, {
                        subSections: pageSubSections, 
                        selectedSection: selectedSection, 
                        selectedSubSection: selectedSubSection,
                        setSelectedSection: setSelectedSection,
                        setSelectedSubSection: setSelectedSubSection
                    })
                }
                </div>
            </div>  
        </div>
    )
}

export {
    DocsArticle
}