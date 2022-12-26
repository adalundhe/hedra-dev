import { type NextPage } from "next";
import { useContext } from "react";
import Head from "next/head";
import { 
  MainPageView,
  NavBar, 
  MobileNavView
} from '../components'

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Hedra - Testing at scale</title>
        <meta name="description" content="Hedra - Testing at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileNavView>
        <main className="w-screen h-screen bg-[#eeeeee] inline-block">
          <NavBar />   
          <MainPageView />
        </main>
        </MobileNavView>
    </>
  );
};

export default Home;
