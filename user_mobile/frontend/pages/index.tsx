import type { NextPage } from "next";
import Head from "next/head";
import { LandingView } from "./LandingPage";

const Landing: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Landing</title>
      </Head>
      <LandingView />
    </div>
  );
};

export default Landing;
