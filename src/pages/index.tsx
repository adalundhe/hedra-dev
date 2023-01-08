import { type NextPage } from "next";
import Head from "next/head";
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
          <main className="w-screen h-[93vh] bg-[#eeeeee] flex flex-col fixed overflow-y-scroll overflow-x-hidden">
            <MainPageView />
            <Footer />
          </main>
        </>
        </MobileNavView>
    </>
  );
};

export default Home;
