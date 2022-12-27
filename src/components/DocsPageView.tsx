import { DocsArticle, WelcomeArticle } from "./docs";
import { useState, useContext, useEffect } from "react";
import { NavOpenContext, DocsNav } from "./nav"
import { useWindowDimensions } from '../hooks'
import { Footer } from "./footer";



const DocsPageView = ({
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

    const [windowWidth, setWindowWidth] = useState(0);

    const { width } = useWindowDimensions();

    useEffect(() => {
        
        setWindowWidth(width)

    }, [windowWidth, width])

    const { isOpen } = useContext(NavOpenContext);

    return (
        !isOpen || width > 768 ?
        <>
            <div className="flex flex-col w-full flex-[1_0_auto] overflow-hidden">
                <div className="w-full h-100 2xl:grid 2xl:grid-cols-6 flex flex-col items-center justify-center">
                    {
                        windowWidth > 1536 ?
                        <DocsNav 
                            selectedSection={selectedSection}
                            selectedSubSection={selectedSubSection}
                            setSelectedSection={setSelectedSection}
                            setSelectedSubSection={setSelectedSubSection}

                        /> : null
                    }
                    <DocsArticle
                        selectedSection={selectedSection}
                        selectedSubSection={selectedSubSection}
                        setSelectedSection={setSelectedSection}
                        setSelectedSubSection={setSelectedSubSection}
                    >
                        <WelcomeArticle />
                    </DocsArticle>
                </div>
            </div>
            <div className="shrink-0 w-full">
            <Footer />
        </div>
       </> : <div></div>
    )
}


export {
    DocsPageView
}