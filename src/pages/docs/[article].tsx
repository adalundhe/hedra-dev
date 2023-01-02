import { type NextPage } from "next";
import Head from "next/head";
import { 
    DocsPageView,
    MobileNavView,
    NavBar
} from '../../components'

import { WelcomeArticle } from "../../components";

const Docs: NextPage = () => {

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
                <DocsPageView >
                    <WelcomeArticle />
                </DocsPageView>
            </div>
        </MobileNavView>
        </>
    );
};


export default Docs;