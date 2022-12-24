import { cloneElement } from "react";
import { docsSubSections } from "../../../data";


const DocsArticle = ({ 
    children,
    selectedSection,
    selectedSubSection,
}: {
        children: JSX.Element,
        selectedSection: string,
        selectedSubSection: string
}) => {


    const pageSubSections = docsSubSections[selectedSection] ?? [];
    const subSectionIdx = pageSubSections.indexOf(selectedSubSection);

    return (
        <div className="col-span-5 h-[70vh] overflow-y-scroll my-20">
            <div className="grid grid-cols-6"> 
                <div className="col-span-4 flex justify-center items-center">
                    <div className="h-full w-full mx-20 font-rany text-xl">
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
    )
}

export {
    DocsArticle
}