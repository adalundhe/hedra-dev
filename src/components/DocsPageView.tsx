import { DocsArticle, WelcomeArticle } from "./docs";
import { useState, useContext, useEffect } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions } from '../hooks'
import { Footer } from "./footer";
import { DocsSectionGuide } from "./docs";
import { DocsNavMobile } from "./nav";

const DocsPageView = ({
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

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen } = useContext(NavOpenContext);

    return (
        <>
            <DocsNavMobile   
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            />
           <div className={`grid grid-cols-[auto] lg:grid-cols-[24rem_auto] 2xl:grid-cols-[24rem_auto_24rem] overflow-x-hidden mt-0 h-full mt-10 ${isOpen || width <= 768 ?  'hidden' : ''}`}>
                <DocsNav 
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
                            setSelectedSection={setSelectedSection}
                            setSelectedSubSection={setSelectedSubSection}
                        >
                        {children}
                        </DocsArticle>
                    </div> 
                    <Footer />
                </main>
                <DocsSectionGuide 
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