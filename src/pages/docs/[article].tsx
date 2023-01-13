import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { 
    DocsPageView,
    MobileNavView,
    NavBar,
    Footer
} from '../../components'


const Docs: NextPage = () => {

    return (
        <>
        <Head>
            <title>Hedra - Test at scale</title>
            <meta name="description" content="Hedra - Test at scale" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <MobileNavView>
            <>
                <NavBar />    
                <main className={`page fixed w-screen flex flex-col h-[calc(100%_-_150px)] overscroll-none`}>
                    <DocsPageView/>
                </main>
            </>
        </MobileNavView>
        </>
    );
};


export default Docs;