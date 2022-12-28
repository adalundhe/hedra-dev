import { DocsArticle, WelcomeArticle } from "./docs";
import { useState, useContext, useEffect } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions } from '../hooks'
import { Footer } from "./footer";
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";
import { useData } from "../data";

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

    return (
        <>
            <DocsNavMobile   
                docsData={docsLinks}
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            />
           <div className={`grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden mt-0 h-full mt-10 ${isOpen || windowWidth <= 768 ?  'hidden' : ''}`}>
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
                    <div className="pt-10 flex justify-center">
                        <button className="px-8 mx-4 py-2 font-rany text-2xl">
                            <p>Next</p>
                        </button>
                        <button className="px-8 mx-4 py-2 font-rany  text-2xl">
                            <p>Previous</p>
                        </button>
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