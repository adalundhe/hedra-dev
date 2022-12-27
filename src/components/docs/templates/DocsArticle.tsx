import { cloneElement, useEffect, useState } from "react";
import { useData } from "../../../data";
import { useWindowDimensions } from "../../../hooks";


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
        <div className="col-span-6 2xl:col-span-5 my-20 overflow-y-scroll h-[70vh] grid grid-cols-6">
            <div className="h-full font-rany text-[1.25vmin] 2xl:col-span-5 col-span-6 flex justify-center">
                <div className="w-3/4">
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