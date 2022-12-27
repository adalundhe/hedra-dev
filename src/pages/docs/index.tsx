import { type NextPage } from "next";
import Head from "next/head";
import { 
    DocsPageView,
    MobileNavView,
    NavBar, 
    DocsSectionGuide
} from '../../components'
import { useState } from "react";


const Docs: NextPage = () => {

    const [selectedSection, setSelectedSection] = useState("Introduction");
    const [selectedSubSection, setSelectedSubSection] = useState("Welcome");

    return (
        <>
        <Head>
            <title>Hedra - Testing at scale</title>
            <meta name="description" content="Hedra - Testing at scale" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MobileNavView>
            <>
                <header>
                    <NavBar />
                </header>
                <DocsSectionGuide 
                    selectedSection={selectedSection}
                    selectedSubSection={selectedSubSection}
                    setSelectedSection={setSelectedSection}
                    setSelectedSubSection={setSelectedSubSection}    
                />
                <main className="w-screen h-screen bg-[#eeeeee] inline-block overflow-hidden">
                    
                    <DocsPageView 
                            selectedSection={selectedSection}
                            selectedSubSection={selectedSubSection}
                            setSelectedSection={setSelectedSection}
                            setSelectedSubSection={setSelectedSubSection}
                        />
                
                </main>
            </>
        </MobileNavView>
        </>
    );
};


export default Docs;