import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { 
  TitleCard, 
  RepoDisplay, 
  NavBar, 
  DescriptionCard,
  FlippedDescriptionCard,
  TenantsCard,
  Footer,
  ParticlesBackground
} from '../components'

const Home: NextPage = () => {
  

  return (
    <>
      <Head>
        <title>Hedra - Testing at scale</title>
        <meta name="description" content="Hedra - Testing at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="2xl:w-[100vw] w-full h-[100vh] bg-[#eeeeee]">
        <NavBar />
        <div className="flex flex-col w-full">
          <ParticlesBackground />
          <div className="w-full h-100 grid grid-rows-6">
            <TitleCard />
            <RepoDisplay />
            <DescriptionCard />
          </div>
          <div className="w-full h-100 grid grid-rows-6">
            <FlippedDescriptionCard />
            <TenantsCard />
          </div>
          <Footer/>
        </div>
      </main>
    </>
  );
};

export default Home;
