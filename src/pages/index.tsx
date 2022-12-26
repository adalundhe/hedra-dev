import { type NextPage } from "next";
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
      <main className="w-screen h-screen bg-[#eeeeee]">
        <NavBar />
        <ParticlesBackground />
        <div className="h-screen w-screen">
          <TitleCard />
          <RepoDisplay />
          <DescriptionCard />
          <FlippedDescriptionCard />
          <div className="w-screen flex justify-center">
            <div className="border-t border-[#14151a] w-1/2"></div>
          </div>
          <TenantsCard />
          <Footer/>
        </div>
      </main>
    </>
  );
};

export default Home;
