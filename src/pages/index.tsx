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
        <title>Hedra - Test at scale</title>
        <meta name="description" content="Hedra - Test at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileNavView>
        <>
          <NavBar /> 
          <main className="w-screen h-screen bg-[#eeeeee] inline-block fixed overflow-y-scroll overflow-x-hidden">
            <MainPageView />
          </main>
        </>
        </MobileNavView>
    </>
  );
};

export default Home;
