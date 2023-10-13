import { FC } from "react"
import styles from "../styles/Home.module.css";

export const AppBar: FC = (props) => {

  return (
    <div className={styles.logoContainer}>
      <div className={styles.logo}>

        Vending Machine

      </div>
    </div>
  )
}