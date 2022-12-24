import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { 
    NavBar, 
    DocsNav,
    Footer,
    DocsArticle,
    DocsSectionGuide,
    WelcomeArticle
} from '../../components'
import { docsSubSections } from "../../data";


const Docs: NextPage = () => {
    
    const [selectedSection, setSelectedSection] = useState("Introduction");
    const [selectedSubSection, setSelectedSubSection] = useState("Welcome");

    const selectedSubSections = docsSubSections[selectedSection] ?? [];

    return (
        <>
        <Head>
            <title>Hedra - Testing at scale</title>
            <meta name="description" content="Hedra - Testing at scale" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="2xl:w-[100vw] w-full h-[100vh] bg-[#eeeeee] flex flex-col overflow-hidden">
            <NavBar />
            <DocsSectionGuide          
                selectedSection={selectedSection}
                selectedSubSection={selectedSubSection}
                setSelectedSection={setSelectedSection}
                setSelectedSubSection={setSelectedSubSection}
            />
            <div className="flex flex-col w-full flex-[1_0_auto]">
                <div className="w-full h-100 grid grid-cols-6">
                    <DocsNav 
                        selectedSection={selectedSection}
                        selectedSubSection={selectedSubSection}
                        setSelectedSection={setSelectedSection}
                        setSelectedSubSection={setSelectedSubSection}

                    />
                    <DocsArticle
                        selectedSection={selectedSection}
                        selectedSubSection={selectedSubSection}
                    >
                        <WelcomeArticle />
                    </DocsArticle>
                </div>
            </div>
            <div className="shrink-0 w-full">
                    <Footer />
            </div>
        </main>
        </>
    );
};


export default Docs;