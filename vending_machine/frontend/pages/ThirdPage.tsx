import { FC } from "react"
import "@solana/wallet-adapter-react-ui/styles.css";

// For NFT Upgrading
import styles from "../styles/Home.module.css";
import { Connection, Keypair, ParsedAccountData, PublicKey, RpcResponseAndContext, TokenAccountBalancePair } from "@solana/web3.js";
import { Metaplex, keypairIdentity, bundlrStorage, Nft, Sft, AccountInfo, UploadMetadataOutput, uploadMetadataOperation } from "@metaplex-foundation/js";
import secret from '../../guideSecret.json';
import cache from '../../cache.json';
import Arweave from "arweave";

import * as Web3 from "@solana/web3.js";


export const RewardView: FC = (props) => {
  // Predefined level up threshold
  const threshold_level_up = 2;

  const RPC = "https://api.devnet.solana.com"
  const SOLANA_CONNECTION = new Connection(RPC);

  const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));

  // Local Storage extraction
  let MINT_ADDRESS;
  // Perform localStorage action in Typescript
  if (typeof window !== 'undefined') {
    MINT_ADDRESS = localStorage.getItem("MintAddress");
  }

  let OwnerAddress;
  // Perform localStorage action in Typescript
  if (typeof window !== 'undefined') {
    OwnerAddress = localStorage.getItem("OwnerAddress");
  }

  let recycledItemsCount;
  // Perform localStorage action in Typescript
  if (typeof window !== 'undefined') {
    recycledItemsCount = localStorage.getItem("recycledItemsCount");

  }

  const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET))
    .use(bundlrStorage({
      address: 'https://devnet.bundlr.network',
      providerUrl: RPC,
      timeout: 60000,
    }));


  // Get New NFT Image
  async function getNewImage(nft: Nft | Sft) {
    // Get NFT number
    const nftNumber = nft.name.split('#').pop()
    console.log("nftNumber = " + nftNumber)

    var json = cache
    const size = Object.keys(json.items).length

    // (size - 1), counting out the first data (NFT collection data)
    for (let i = 0; i < size - 1; i++) {
      if (nftNumber == json.items[i].name.split('#').pop()) {
        // Returns new upgraded image link
        console.log(json.items[i].image_link)
        return (json.items[i].image_link)
      }
    }
    // Returns original image link
    return nft.json?.image
  }


  // Step 2 - Uploading MetaData
  async function uploadMetadata(imgUri: string, imgType: string, nftName: string, description: string, attributes: { trait_type: string, value: string }[]) {
    console.log(`Step 2 - Uploading MetaData`);

    // Initialize Arweave connection
    const arweave = Arweave.init({
      host: "arweave.net",
      port: 443,
      protocol: "https",
      timeout: 20000,
      logging: false,
    });

    // Upload metadata to Arweave
    const metadata = {
      name: nftName,
      description: description,
      image: imgUri,
      attributes: attributes,
      properties: {
        files: [
          {
            type: imgType,
            uri: imgUri,
          },
        ]
      }
    };

    // Format metadata
    const metadataRequest = JSON.stringify(metadata);

    // Arweave transaction
    const metadataTransaction = await arweave.createTransaction({
      data: metadataRequest,
    });
    metadataTransaction.addTag("Content-Type", "application/json");
    await arweave.transactions.sign(metadataTransaction, { "d": "FfkrQMFPaDsPAy-GwllSUcWjDjhiCVUdq0kkW38o-aRgdujT8YKQSLR4gJcsKVCBSSBzRQukUQoZsdWQcaSClRr76dbFcDREWcuig1wmhuUDZ6GYxKeSsrgDOh8sIZpp41wj112lcJ1a4pjumAbRsMuNOg1xYHD86_LgXGpCQiPVM3h3gCkuf4FyPjWyVj1womYJDW0E1Tz0MZ12i4y9gBWBd18Au_1U7NBJuOfJ5mblKrmg_pxl1fK_98AAaNQFOgukzgBZ8y_P-7TcK8IL_HDYlUQwLgBbRqJTlZoLrp2xO5Dpvc8-jKDYaZ06ao3BhsuL1i7mWi10H8I2yNlD1VEf4x4q2Nut8SvK_Tfww_wBQt_ofpSmEbmW0SG7vdpRXohi-v89DETBqvQHNhAHJpZ3VgOdr5b2wu7XkqrRg2ppdLVvj4N2pfLpY7_QbpexYiVqMP4AcS9_Bwt4mc2fh6MU_GWgehM-vJ3d2FSzfLvtDjLcIJHCpNZjexat0WxlSfvtq9bIVVO9ueE_M52qSQNPmiQfUNGfVT6Wf-StRyAyIz4WS3BOvUQO--m-2NvwdTz3EmIqWsY5okH0ItYwCAf06TfFd1NbQA1d-sYvRgB2bvuGXkCIMLqinChPZHhyGAksrArSc040IZtfqFApqCYzjAt7HQZazfWyIbR4uGk", "dp": "DcgLMBcEfMJOMGueWb4Gaq_QIXPOftdGB83KlwBAoTlTtAZ4vJ8Phpw3gy-51hi_64Cb9XcvKyuTAF9N4bnPseQDhMZpthFUxlzNrLO1C5edQTc9f6l5-rYZvl_WPNEq7wL0X2d8oGoy2XqQnwby47CVrpSDhmveuHNUHWHwQju2F_xLWZDQv5rTEvJncZ3_oejM6vfQNnYzXD5XVU0byUC33lmF3HMR6HJi-DqLyou5BjSOtkIKUXwV_G13IER8dXVYt3QSkkGI_kNc6_Pq3rf_fttFh0Ffd9dMQUOS_EQXEvmbxdVOPMcryfIuJsr_hDdOuI75n1Yrab_5H_WoGQ", "dq": "AbiK1Lhb90NPpHmz2yGfBDcl1IeFxz7QjSJSADGuufF7YmEMf33PlCxnuWoTGrGDzKm2xAU2u5vpxXeOlF9brCNGHhfAnXC37eMnkzulJmzuHFr7xPJUjr2uaGuC1-CI2CbPa6F07Gb389byiG1DDtnw6rVm4fFJEtaVHvb83Na6yNCZ8FumK6Zmhh0mr8EIPSr7oBAKM1lT6dhRJNpyE5cHe-139UZ_lGYXQe6cSHySNYOmziMBt79DvLEWgoryTXN8vG7eBc5uqFePBnl97hUtynMYl-GeMNTOLq4QOddeGQ9Kw67ROMllxox6mh3V5nTEz_yNTYcma53vBH1J-w", "e": "AQAB", "kty": "RSA", "n": "uKW9TDRkwb8t3Tk2MISApKW58oX_umI-k7zlAZey0pUHGXtI6jAuD9imY_kyd7NoJAhqiFFzNE2v-J94vHH5jcF4MsT9gSfVqH0jUbj2rePpcBBLTuOV2rwEql-YCWffoJy-oTfcfgHjLac3JOiWMXmM-Bx5HpJgmeArkWaqPfnfewyJwM1OtBMYgj8baBRyF-sa_z9Tz1jFsGvu1UWGP1Gvm7P7PXuddweI0d1-rUZlFnIGHP9Cez5EB3un7PnMRTkcL044PxTRAxSTu0WtsQ0QpVSjA4ekDsIRIdSEPVyX9EDnkb3FgI333-K4qitD_4KQjRrV2whyI3Y4OxYMPI2bVV8eBuX5m8ojBQLfeyW2W_aJqAyR_ksSw3GIxLyyI3Kw5Sv7vSK-rfyVmTcr1IpRPztP_YnlVZKgS77n6XPLM2oXojb1EMAnAB8b91tj5riqwQVdQFBgGuAoDHiUVOQiDEe4iD33G61l83LKE3mL5xZbzSmchCM_9a8_n88odTSuuDGY5cgCrjPiy2qdAa08WEqbNHl-ytvZCEts0W-buLcjkYri0E45ZtcUARwtJ_wVTLoXLSyhQkZksqYA9T2QeY5E_OxJV2kZ4eetRVeNHawn8K97qxhNhiQP_C_zrTYhqxHgoAaTtKEo1Thwd9Qp5r8ZHU1o8ERqvWbETJs", "p": "4elEREVyml4wEgtycsT5AIbnXVrLR3Hnm9evXtJB62EA-6gyZi6f7k-JHk1qibTT1YRBcgzY1clT4OZnSRrbOf6NsHfFYKCEp5vbNsWWLJvHtHlSh_A5pA4dvcOXzDlbUjW_WcOORdkFfHDUsDBGWRlRAtR3CAeANm4r1-tb1TmFjSbCxsQWDc223F1iOfowZv2_cN8I-2qJsoCMl2ZkjavOQGCS4z7GNlFpTts_NJpq7cnCdBL9iU9-bpy4x3-58gdPlDh6UnrktZ4bXKTfAA46lHmve0Fb5k7kwiJWTg9TT1C6bOxpJVtYkFOBBdYkk3RXllPkvgig1-BsmA_iNQ", "q": "0T2H9h3F4E9Ft374UmTCp0L9eM5GqGpLBLBFlmjtTJEENWaIF-T2BL3u0OJTAbgKiI429-qChzGTaouokzS9vfS47l1tVLM7qCxj7KGqirl8ks4waXytZFQjMdTnfJ4G-ala7PGKJP6-XYSwYrFjUbEMLrJjbctJrTHZyegrnQQYezI6ZmTw8Ywxo7RjOGLJebGIzuuzt5VCk1hWDCdjSD5BDFOJnW0rpZoyWyDfv8_il-tA99YijgC0di4qkgcNAzmO7FaodBrRWOtGyK0TRWUa5VlPyA5IaANUxbKJsPbybeZE2zrZVzXv03mo5C-A2di011O6sdkHfRS5bs9Njw", "qi": "GayspZH4o0CUkllMzya9zVkzfwQFaNQ4F9N2HUYRN5NmLbuaiTJ92SLr7eNeij0hfDhi7Ra4gMx3olQ36V3hrhPkmuClVIcamKuKySkUO8seVVpqT0o2YphVfYE9A4lnEUlBKMgg9enEfKcjm9LT1pHmopORKjTmMVk46z-liUMsAi5Maqwg4-TG_ArEb0htM0UpCEBnhF4NNZ7AZE-7kXYaVPYV3Xj-SVxkQnFzbliYI2sqSbpI6MNSE7lpC5LrEFYN_TitG2AAzGX4bu_IiFxGVseehPb03WuTpfdd4_ZBiWS_XaCDlMRwUhMrmWV7abY3Mmg_3w6DHg0d30auPw" }
    );
    console.log("metadata txid", metadataTransaction.id);
    const result = await arweave.transactions.post(metadataTransaction);
    console.log(result);

    // Uploaded metadata URI
    const newUri = "https://arweave.net/" + metadataTransaction.id;
    console.log("https://arweave.net/" + metadataTransaction.id);

    return newUri
  }


  // Step 3 - Updating NFT
  async function updateNft(nft: Nft | Sft, metadataUri: string, newName: string) {
    console.log(`Step 3 - Updating NFT`);
    await METAPLEX
      .nfts()
      .update({
        name: newName,
        nftOrSft: nft,
        uri: metadataUri
      }, { commitment: 'finalized' });
    console.log(`   Success!🎉`);
    console.log(`   Updated NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
  }



  // Step 4 - Rewarding user with Solana
  async function rewardSol(receiver: any) {
    const sender = Keypair.fromSecretKey(new Uint8Array(secret))
    // const receiver = Web3.Keypair.generate().publicKey;

    console.log("sender pubkey:", sender.publicKey.toBase58());
    console.log("receiver pubkey:", receiver);
    await sendSol(
      SOLANA_CONNECTION,
      0.1 * Web3.LAMPORTS_PER_SOL,
      receiver,
      sender
    );
  }

  async function sendSol(
    connection: Web3.Connection,
    amount: number,
    to: Web3.PublicKey,
    sender: Web3.Keypair
  ) {
    const transaction = new Web3.Transaction();

    // Airdrop Solana to sender's wallet if amount in wallet not enough
    await airdropSolIfNeeded(sender, connection);

    const sendSolInstruction = Web3.SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: to,
      lamports: amount,
    });

    transaction.add(sendSolInstruction);

    const tx = await Web3.sendAndConfirmTransaction(connection, transaction, [
      sender,
    ]);
    console.log(
      `You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${tx}?cluster=devnet`
    );
  }

  // Step 4(a) - Airdrop Solana to sender's wallet if amount in wallet not enough
  async function airdropSolIfNeeded(
    signer: Web3.Keypair,
    connection: Web3.Connection
  ) {
    const balance = await connection.getBalance(signer.publicKey);
    console.log("Current balance is", balance / Web3.LAMPORTS_PER_SOL, "SOL");

    if (balance / Web3.LAMPORTS_PER_SOL < 0.1) {

      console.log("Airdropping 1 SOL");
      const airdropSignature = await connection.requestAirdrop(
        signer.publicKey,
        Web3.LAMPORTS_PER_SOL
      );

      const latestBlockhash = await connection.getLatestBlockhash();

      await connection.confirmTransaction({
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        signature: airdropSignature,
      });

      const newBalance = await connection.getBalance(signer.publicKey);
      console.log("New balance is", newBalance / Web3.LAMPORTS_PER_SOL, "SOL");
    }
  }


  const onClick = async () => {
    // For Upgrading NFT
    console.log(`Updating Metadata of NFT: ${MINT_ADDRESS}`);
    //Step 1 - Fetch existing NFT
    console.log(`Step 1 - Fetching existing NFT`);
    const nft = await METAPLEX.nfts().findByMint({ mintAddress: new PublicKey(MINT_ADDRESS) });
    if (!nft || !nft.json?.image) { throw new Error("Unable to find existing nft or image uri!") }
    console.log(`   NFT Found!`)


    // Update NFT metadata details
    const NEW_METADATA = {
      imgType: 'image/png',
      imgName: nft.json.name,
      description: nft.json.description,
      attributes: [
        { trait_type: 'Level', value: '' },
        { trait_type: 'Total Recycled Items', value: '' },
      ]
    };


    // Total recycled item + Recent reycled item more or equal to a predefined threshold --> NFT LEVEL UP
    if ((+nft.json.attributes[1].value + (+recycledItemsCount)) >= threshold_level_up) {
      // New total recycled items count
      let totalItems = +nft.json.attributes[1].value + (+recycledItemsCount)
      // Update Metadata
      NEW_METADATA.attributes[1] = { trait_type: 'Total Recycled Items', value: totalItems.toString() }
      console.log("NFT Level up!")
      NEW_METADATA.attributes[0] = { trait_type: 'Level', value: '1' }
    } else {
      console.log("NFT level remains")
      let totalItems = +nft.json.attributes[1].value + 2
      NEW_METADATA.attributes[1] = { trait_type: 'Total Recycled Items', value: totalItems.toString() }
    }

    // Get Upgraded image arweave link
    const newImage = await getNewImage(nft)

    //Step 2 - Upload Metadata
    const newUri = await uploadMetadata(newImage, NEW_METADATA.imgType, NEW_METADATA.imgName, NEW_METADATA.description, NEW_METADATA.attributes);
    console.log(newUri);

    //Step 3 - Update NFT
    updateNft(nft, newUri, NEW_METADATA.imgName);

    //Step 4 - Rewarding user with Solana
    rewardSol(OwnerAddress)
  };


  return (
    <div className={styles.startStopCam}>
      <button onClick={onClick}>Check Out</button>
    </div>
  )
}