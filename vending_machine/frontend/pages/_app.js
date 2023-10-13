import '../styles/globals.css'
import Head from 'next/head'
import { AppBar } from "./AppBar";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>Mint Cycle</title>
      </Head>
      <div className="flex flex-col h-screen">

        <div>
          <AppBar />
          <Component {...pageProps} />
        </div>

      </div>
    </>
  )
}

export default MyApp
