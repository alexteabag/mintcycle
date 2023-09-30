import { FC } from "react"
import Link from "next/link"
import { LandingView } from "./LandingPage";

import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { BalanceDisplay } from "./BalanceDisplay";
import styles from "../styles/Home.module.css";

export const AppBar: FC = (props) => {

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>

        Mint Cycle

      </div>
    </div>
  )
}