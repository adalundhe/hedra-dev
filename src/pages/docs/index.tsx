import { type NextPage } from "next";
import Head from "next/head";
import { 
    DocsPageView,
    MobileNavView,
    NavBar, 
    Footer,
} from '../../components'


const Docs: NextPage = () => {

    return (
        <>
        <Head>
            <title>Hedra - Testing at scale</title>
            <meta name="description" content="Hedra - Testing at scale" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MobileNavView>
        <main className="w-screen h-screen bg-[#eeeeee] inline-block overflow-hidden">
            <NavBar />
            <DocsPageView />
        </main>
        </MobileNavView>
        </>
    );
};


export default Docs;