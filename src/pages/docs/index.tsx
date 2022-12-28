import { type NextPage } from "next";
import Head from "next/head";
import { 
    DocsPageView,
    MobileNavView,
    NavBar, 
    DocsSectionGuide,
    DocsNav,
    DocsNavMobile,
    Footer
} from '../../components'
import { useState } from "react";
import { WelcomeArticle } from "../../components";

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
                
            <div className="flex flex-col h-[99.99vh]">
                <header className="shrink-0">
                    <NavBar />
                </header>
                <DocsPageView 
                            selectedSection={selectedSection}
                            selectedSubSection={selectedSubSection}
                            setSelectedSection={setSelectedSection}
                            setSelectedSubSection={setSelectedSubSection}
                    >
                        <WelcomeArticle />
                    </DocsPageView>
            </div>
        </MobileNavView>
        </>
    );
};


export default Docs;