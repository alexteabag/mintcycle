import styles from '../styles/Home.module.css';
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@metaplex-foundation/js';
import { Connection } from "@solana/web3.js";
import QRCode from "qrcode";

export const ShowNFTs = () => {
// export const ShowNFTs = ({ onClusterChange }) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);   // For NFT
  const [qrcode, setQr] = useState(null);   // For NFT mint address QR Code
  const nftOwner = null;

  const onClick = async () => {
    const myAssets = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });

    if (!myAssets.length) {
      setNft(null);
      return;
    }

    const randIdx = Math.floor(Math.random() * myAssets.length);    // Generate random number
    const nft = await metaplex.nfts().load({ metadata: myAssets[randIdx] });    // Load random NFT from wallet


    const mintAddress = nft.mint.address.toBase58();    // Get mint address (Identifier) of loaded NFT

    // Get owner of loaded NFT
    // const connection = new Connection("https://api." + metaplex.cluster + ".solana.com");
    const connection = new Connection(metaplex.connection._rpcEndpoint);
    const largestAccounts = await connection.getTokenLargestAccounts(
      new PublicKey(mintAddress)
    );
    const largestAccountInfo = await connection.getParsedAccountInfo(
      largestAccounts.value[0].address
    );

    nftOwner = largestAccountInfo.value.data.parsed.info.owner;
    console.log("NFT Owner is = " + nftOwner);

    setNft(nft);

    // Generate QRCode of NFT mint address
    QRCode.toDataURL(mintAddress).then(setQr)

    // Read QRCode
    // var readQRCode = require('qrcode-reader');
    // var qr = new readQRCode();
    // console.log(QRCode_Reader.prototype.decode("https://www.google.com"))

  };

  if (!wallet.connected) {
    return null;
  }

  return (
    <div>
      {/* <select onChange={onClusterChange} className={styles.dropdown}>
        <option value="devnet">Devnet</option>
        <option value="mainnet">Mainnet</option>
        <option value="testnet">Testnet</option>
      </select> */}
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>VvvV Insert down NFT Mint Address VvvV</h1>
          <div className={styles.nftForm}>
            <input
              type="text"
              value={nft ? nft.mint.address.toBase58() : ""}
              readOnly
            />
            <button onClick={onClick}>Pick Random NFT</button>
          </div>

          {nft && (
            <div className={styles.nftPreview}>
              <h1>{nft.name}</h1>
              <img
                src={nft?.json?.image || 'public/fallbackImage.jpg'}
                alt="The downloaded illustration of the provided NFT address."
              />
              <img
                src={qrcode || 'public/fallbackImage.jpg'}
                alt="QR Code of NFT mint address"
              />
              <h1></h1>
              <h1>Pubkey = {nft ? nft.mint.address.toBase58() : ""}</h1>
              {/* <h1>CollectionID = {nft ? nft.collection.address.toBase58() : ""}</h1> */}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};