import styles from "../styles/Home.module.css";
import { useMemo, useState } from "react";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Html5QrcodeScanner } from 'html5-qrcode';
import React, { useEffect } from "react";
import { Connection, PublicKey } from "@solana/web3.js";


export const LandingView = () => {
  const [scanResult, setScanResult] = useState(null);
  const [tokenMint, setTokenMint] = useState(null);
  const [largestAccountsInfo, setLargestAccountsInfo] = useState(null);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear();
      setScanResult(result);
      setTokenMint(result);
    }

    function error(err) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    if (tokenMint) {
      const connection = new Connection("https://api.devnet.solana.com");

      const fetchLargestAccounts = async () => {
        try {
          const largestAccounts = await connection.getTokenLargestAccounts(
            new PublicKey(tokenMint)
          );

          const largestAccountInfo = await connection.getParsedAccountInfo(
            largestAccounts.value[0].address
          );

          localStorage.setItem("OwnerAddress", largestAccountInfo.value.data.parsed.info.owner);
          localStorage.setItem("MintAddress", tokenMint);
          localStorage.setItem("recycledItemsCount", 0);


          setLargestAccountsInfo(largestAccountInfo.value.data.parsed.info.owner);
        } catch (error) {
          console.error("Error fetching largest accounts:", error);
        }
      };

      fetchLargestAccounts();
    }
  }, [tokenMint]);

  return (
    <div className={styles.logoContainer}>

      <div className="App">
        <h1>NFT QR code Scanning</h1>
        {scanResult ? (
          <div>
            Success: <a href={"http://" + scanResult}>{scanResult}</a>
          </div>
        ) : (
          <div id="reader"></div>
        )}

        {largestAccountsInfo ? (
          <div>
            Largest Account Owners: {largestAccountsInfo}

            {/* Direct to another page */}
            <div class={styles.forwardSymbol}>
              <a href="/page2">
                &rarr;
              </a>
            </div>

          </div>
        ) : null}
      </div>
    </div>
  );
};