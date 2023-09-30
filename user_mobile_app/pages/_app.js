import '../styles/globals.css'
import Head from 'next/head'
import Link from 'next/link'
import { AppBar } from "./AppBar";
import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
} from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { MetaplexProvider } from "./MetaplexProvider";
import { MintNFTs } from "./MintNFTs";
import { ShowNFTs } from "./ShowNFTs";
import { BalanceDisplay } from "./BalanceDisplay";
import "@solana/wallet-adapter-react-ui/styles.css";
import dynamic from 'next/dynamic';
import mintCycle from '../public/images/Logo.png'
import Image from 'next/image';
import { ShowAllNFTs } from "./ShowAllNFTs";
import { useWallet } from "@solana/wallet-adapter-react";

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
