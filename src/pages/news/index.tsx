import { type NextPage } from "next";
import Head from "next/head";
import { 
  NavBar, 
  MobileNavView,
  NewsPageView
} from '../../components'

const News: NextPage = () => {


  return (
    <>
      <Head>
        <title>Hedra - Test at scale</title>
        <meta name="description" content="Hedra - Test at scale" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MobileNavView>
        <div className="flex flex-col h-[99.99vh]">
            <header>
                <NavBar /> 
            </header>    
            <NewsPageView />
        </div>
        </MobileNavView>
    </>
  );
};

export default News;
