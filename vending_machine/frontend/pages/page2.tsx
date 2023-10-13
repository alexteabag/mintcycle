import { DetectBottleView } from "./SecondPage";
import type { NextPage } from "next"
import Head from "next/head"
import React from 'react';

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>2nd page</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <DetectBottleView />
    </div>
  )
}

export default Home
