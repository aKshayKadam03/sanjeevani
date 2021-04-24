import React from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useSelector } from "react-redux";

function Navbar() {
  let a = useSelector((state) => state.auth.currentUser); //this is object of current User

  return (
    <div className={styles.container}>
      <div className={styles.navimg}>
        {/* <AiFillThunderbolt className={styles.logo} /> */}
        <img width="110px" src="./images/logo.png" alt="logo"></img>
      </div>
      <div className={styles.navinfo}>
        <Link href="/">About us</Link>
        <Link href="/">Contact us</Link>
        <Link href="/">Contribute</Link>
        <FaFacebookSquare className={styles.icon} />
        <GrInstagram className={styles.icon} />
        <FaTwitter className={styles.icon} />
        <button className={styles.signin}>Sign In</button>
        <button className={styles.signup}>Sign Up</button>
      </div>
    </div>
  );
}

export default Navbar;
