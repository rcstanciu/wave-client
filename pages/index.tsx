import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Wave from "../components/Wave/Wave";
import WavesList from "../components/WavesList/WavesList";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Say hi!</title>
        <meta name="description" content="Wave portal client" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Wave />
      <WavesList />
      <Footer />
    </>
  );
};

export default Home;
