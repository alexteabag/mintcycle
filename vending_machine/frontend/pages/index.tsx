import type { NextPage } from "next";
import Head from "next/head";
import { LandingView } from "./FirstPage";

const Landing: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>1st Page</title>
      </Head>
      <LandingView />
    </div>
  );
};

export default Landing;
