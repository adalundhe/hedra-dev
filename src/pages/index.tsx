import { type NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import { 
  TitleCard, 
  RepoDisplay, 
  NavBar, 
  DescriptionCard,
  FlippedDescriptionCard 
} from '../components'

const Home: NextPage = () => {
  

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Hedra - Testing at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-[100%] h-[100vh] bg-[#eeeeee]">
        <NavBar />
        <div className="flex flex-col">
          <div className="w-100 h-100 grid grid-rows-6">
            <TitleCard />
            <RepoDisplay />
            <DescriptionCard />
          </div>
          <div className="w-100 h-100 grid grid-rows-6">
            <FlippedDescriptionCard />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
