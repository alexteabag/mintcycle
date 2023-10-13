import styles from '../styles/Home.module.css';
import { useMetaplex } from "./useMetaplex";
import { useState } from "react";
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@metaplex-foundation/js';
import QRCode from "qrcode";

export const ShowAllNFTs = () => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);     // For NFT
  const [qrcode, setQr] = useState(null);   // For NFT mint address QR Code

  // Collection Mint Address
  const collectionMintAddress = new PublicKey(
    process.env.NEXT_PUBLIC_NFT_COLLECTION_ID
  );

  const onClick = async () => {
    const myAssets = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });

    if (!myAssets.length) {
      setNft(null);
      return;
    }

    let nft = []
    for (let i = 0; i < myAssets.length; i++) {
      let result = await metaplex.nfts().load({ metadata: myAssets[i] });
      // Display NFT from selected collection only (Mint Cycle)
      if (collectionMintAddress.toString() == result.collection.address.toString()) {
        nft.push(result);
      }

    }

    setNft(nft);
  };


  const handleClickNFT = async e => {
    // Display popup
    const popUpWindow = document.getElementById("popUpWindow");
    popUpWindow.style.visibility = "visible";

    let name = null;
    let image = null;
    let attribute_level = null;
    let attribute_total = null;
    let address = e.target.id;
    // Generate QRCode of NFT mint address
    QRCode.toDataURL(address).then(setQr)

    // Get NFTs from user Wallet
    const myAssets = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });

    if (!myAssets.length) {
      setNft(null);
      return;
    }

    // Extract name and image of selected NFT
    for (let i = 0; i < myAssets.length; i++) {
      let result = await metaplex.nfts().load({ metadata: myAssets[i] });
      if (result.mint.address.toBase58() == address) {
        name = result.json.name;
        image = result.json.image;
        attribute_level = result.json.attributes[0].value
        attribute_total = result.json.attributes[1].value
        break;
      }

    }

    // Get element ID
    const popUpName = document.getElementById("popUpName");
    const popUpImage = document.getElementById("popUpImage");
    const popUpAttribute_level = document.getElementById("popUpAttribute_level");
    const popUpAttribute_total = document.getElementById("popUpAttribute_total");
    const popUpAddress = document.getElementById("popUpAddress");
    

    // Set value into pop up window
    popUpName.textContent = name
    popUpImage.src = image
    popUpAttribute_level.textContent = "Level : " + attribute_level
    popUpAttribute_total.textContent = "Total Recycled Items : " + attribute_total
    popUpAddress.textContent = address
  };


  const handleCloseNFT = () => {
    const popUpWindow = document.getElementById("popUpWindow");
    popUpWindow.style.visibility = "hidden";

  }

  if (!wallet.connected) {
    return null;
  }

  return (
    <div>
      <div>
        <div className={styles.container}>
          <h1 className={styles.title}>____________________________________________________________________</h1>
          <div className={styles.nftForm}>
            <button onClick={onClick}>Display All NFTs</button>
          </div>

          <div className="md:hero mx-auto p-4">
            <div className="md:hero-content flex flex-col">
              <h1>
                NFTs
              </h1>
              --The NFTs are displayed as shown below--
              <br></br>
              <br></br>
              <br></br>
              <div>
                {nft && (
                  <div className={styles.gridNFT}>

                    {/* List of NFTs from user wallet */}
                    {nft.map((nft) => (

                      // Assigning all elements below with the same mint address: To represent one nft
                      <div id={nft.mint.address.toBase58()} onClick={handleClickNFT} class={styles.NFTItem}>
                        <img id={nft.mint.address.toBase58()} src={nft.json.image} />
                        <p id={nft.mint.address.toBase58()}>{nft.json.name}</p>
                      </div>

                    ))}

                  </div>
                )}
              </div>
            </div>
          </div>

          <div id="popUpWindow" class={styles.popUp}>
            <div className={styles.xSymbol} onClick={handleCloseNFT}> X </div>
            <br></br>
            <br></br>
            <div>
              <img id="popUpImage" />
              <p id="popUpName"></p>
              <p id="popUpAttribute_level">Level: </p>
              <p id="popUpAttribute_total">Total recycled Items:</p>
              <br></br>
              <br></br>
              <br></br>
              <img
                src={qrcode || 'public/fallbackImage.jpg'}
                alt="QR Code of NFT mint address"
              />
              <p id="popUpAddress"></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};