import { type NextPage } from "next";
import Head from "next/head";
import { 
  NavBar, 
  MobileNavView
} from '../../components'

const Post: NextPage = () => {


  return (
    <>
      <Head>
        <title>Hedra - Test at scale</title>
        <meta name="description" content="Hedra - Test at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileNavView>
        <>
        <header>
          <NavBar /> 
        </header>
          <main className="w-screen h-screen bg-[#eeeeee] inline-block overflow-y-scroll overflow-x-hidden">
     
          </main>
        </>
        </MobileNavView>
    </>
  );
};

export default Post;
