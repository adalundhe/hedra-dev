import { type NextPage } from "next";
import Head from "next/head";
import { useRef } from "react";
import { 
  MainPageView,
  NavBar, 
  MobileNavView,
  Footer
} from '../components'

const Home: NextPage = () => {

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
          <main className="page w-screen h-[calc(100%_-_138px)] bg-[#eeeeee] fixed overflow-y-scroll overflow-x-hidden flex flex-col">
            <MainPageView />
            <Footer/>
          </main>
        </>
        </MobileNavView>
    </>
  );
};

export default Home;
