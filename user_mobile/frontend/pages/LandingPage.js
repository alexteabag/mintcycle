import styles from "../styles/Home.module.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import React from 'react'

export const LandingView = () => {
  return (
    <div className={styles.logoContainer}>
      <p>Your Everyday Recycling Helper</p>

      {/* Direct to another page */}
      <div class={styles.forwardSymbol}>
        <a href="/home">
          &rarr;
        </a>
      </div>

    </div>
  );
}