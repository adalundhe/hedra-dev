import { cloneElement, useEffect, useState } from "react";
import { useData } from "../../../data";
import { useWindowDimensions } from "../../../hooks";
import { Footer } from "../../footer";


const DocsArticle = ({ 
    children,
    selectedSection,
    selectedSubSection,
    setSelectedSection,
    setSelectedSubSection
}: {
        children: JSX.Element,
        selectedSection: string,
        selectedSubSection: string,
        setSelectedSection(sectionName: string): void,
        setSelectedSubSection(subSectionName: string): void
}) => {

    const docsLinks = useData();
    const pageSubSections = docsLinks.subsections[selectedSection] ?? [];
    const subSectionIdx = pageSubSections.indexOf(selectedSubSection);
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
                        selectedSection, 
                        selectedSubSection: subSectionIdx
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