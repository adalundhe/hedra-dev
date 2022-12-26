import { cloneElement, useEffect, useState } from "react";
import { useData } from "../../../data";
import { DocsSectionGuide } from "./DocsSectionGuide";
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
        <div className="col-span-6 2xl:col-span-5 my-20 overflow-hidden">
            {
                windowWidth > 768 ?
                <div className="grid grid-cols-6 overflow-y-scroll mb-10"> 
                    <DocsSectionGuide          
                        selectedSection={selectedSection}
                        selectedSubSection={selectedSubSection}
                        setSelectedSection={setSelectedSection}
                        setSelectedSubSection={setSelectedSubSection}
                    />
                </div> : null
            }
            <div className="">
                <div className="grid grid-cols-6 overflow-y-scroll h-[70vh]"> 
                    <div className="col-span-6 2xl:col-span-5 flex justify-center items-center">
                        <div className="h-full w-full 2xl:ml-20 2xl:mr-0 md:mx-20 font-rany text-xl mx-4">
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
            </div>
        </div>
    )
}

export {
    DocsArticle
}