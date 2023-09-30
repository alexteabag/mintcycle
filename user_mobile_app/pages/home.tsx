import { HomeView } from "./HomePage";

import type { NextPage } from "next"
import Head from "next/head"
import React from 'react';

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name="description" content="Basic Functionality" />
      </Head>
      <HomeView />
    </div>
  )
}

export default Home
