import { RewardView } from "./ThirdPage";
import type { NextPage } from "next"
import Head from "next/head"
import React from 'react';

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>3nd page</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <RewardView />
    </div>
  )
}

export default Home
