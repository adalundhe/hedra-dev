import { DocsArticle } from "./docs";
import { useState, useContext, useEffect } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions } from '../hooks'
import { Footer } from "./footer";
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";
import { useData } from "../data";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'


const DocsPageView = ({
    children
}: {
    children: JSX.Element
}) => {

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen } = useContext(NavOpenContext);

    const [selectedSection, setSelectedSection] = useState("Introduction");
    const [selectedSubSection, setSelectedSubSection] = useState("Welcome");

    const docsLinks = useData();

    const pageSubSections = docsLinks.subsections[selectedSection] ?? [];

    const docsSectionNames = docsLinks.all.map(docsLink => docsLink.sectionName);
    const currentSectionIdx = docsSectionNames.indexOf(selectedSection);
    const previousSection = currentSectionIdx - 1 > 0 ? docsSectionNames[currentSectionIdx - 1] : undefined;
    const nextSection = currentSectionIdx + 1 < docsSectionNames.length ? docsSectionNames[currentSectionIdx + 1] : undefined;

    return (
        <>
            <DocsNavMobile   
                docsData={docsLinks}
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            />
           <div className={`grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden mt-0 h-full mt-10 ${isOpen ?  'hidden' : ''}`}>
                <DocsNav 
                    docsData={docsLinks}
                    selectedSection={selectedSection}
                    selectedSubSection={selectedSubSection}
                    setSelectedSection={setSelectedSection}
                    setSelectedSubSection={setSelectedSubSection}

                /> 
                <main className="bg-[#eeeeee] min-w-0 lg:pl-6 h-full">
                    
                    <div className="max-w-7xl mx-auto px-5 sm:px-12 break-words block">
                        <DocsArticle
                            selectedSection={selectedSection}
                            selectedSubSection={selectedSubSection}
                            pageSubSections={pageSubSections}
                            setSelectedSection={setSelectedSection}
                            setSelectedSubSection={setSelectedSubSection}
                        >
                        {children}
                        </DocsArticle>
                    </div> 
                    <div className="grid grid-cols-2 max-w-6xl ml-0 2xl:mx-auto">
                        <div className="flex justify-center items-center">
                        {
                            previousSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSelectedSection(previousSection);
                                    setSelectedSubSection(docsLinks.subsections[previousSection]?.at(0) as string)
                                }}
                            >
                                <RxCaretLeft />
                                <div className="flex flex-col items-center justify-center ml-4">
                                    
                                     <p>Previous</p>
                                    <p className="mt-2">{previousSection}</p>        
                                </div>
                            </button> : null
                        }
                        </div>
                        <div className="flex justify-center items-center">
                        {
                            nextSection ? 
                            <button 
                                className="px-8 mx-4 py-2 font-rany text-2xl flex items-center"
                                onClick={() => {
                                    setSelectedSection(nextSection);
                                    setSelectedSubSection(docsLinks.subsections[nextSection]?.at(0) as string)
                                }}
                            >
                                <div className="flex flex-col items-center justify-center mr-4">
                                    
                                     <p>Next</p>
                                    <p className="mt-2">{nextSection}</p>        
                                </div>
                                <RxCaretRight />
                            </button> : null
                        }
                        </div>
                    </div>
                    <Footer />
                </main>
                <DocsSectionGuide 
                    docsData={docsLinks}
                    selectedSection={selectedSection}
                    selectedSubSection={selectedSubSection}
                    setSelectedSection={setSelectedSection}
                    setSelectedSubSection={setSelectedSubSection}    
                />
            </div>
        </>
    )
}


export {
    DocsPageView
}