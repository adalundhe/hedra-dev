import { type NextPage } from "next";
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
        <>
        <header>
          <NavBar /> 
        </header>
          <main className="w-screen h-screen bg-[#eeeeee] inline-block overflow-y-scroll">
            <MainPageView />
          </main>
        </>
        </MobileNavView>
    </>
  );
};

export default Home;
