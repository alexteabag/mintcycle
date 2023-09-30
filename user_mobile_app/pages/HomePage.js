import styles from "../styles/Home.module.css";
import { useMemo, useState, useEffect } from "react";
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
import { useRouter } from 'next/router';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';


export const HomeView = () => {

  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const ButtonWrapper = dynamic(() =>
    import('@solana/wallet-adapter-react-ui', { ssr: true }).then((mod) => mod.WalletMultiButton)
  );

  return (
    <div>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>

              {/* Direct to another page */}
              <div class={styles.backSymbol}>
                <a href="/">
                  &larr;
                </a>
              </div>

              <div className={styles.Wallet}>
                <ButtonWrapper />   {/* Wallet Connect Button */}
              </div>
              <div className={styles.BalanceDisplay}>
                <BalanceDisplay />    {/* User Solana Balance */}
              </div>
              <div className={styles.App}>
                <MintNFTs />   {/* Minting NFT for new user */}
                <ShowAllNFTs />     {/* Displaying all NFTs */}
              </div>

            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}
