import React from "react";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { handleLogOut } from "../redux/Auth/actions";

function Navbar() {
  let a = useSelector((state) => state.auth.currentUser); //this is object of current User
  let isAuth = useSelector((state) => state.auth.isAuth);
  let dispatch = useDispatch();
  const onLogOutHandler = () => {
    dispatch(handleLogOut());
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("currentUser");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.navimg}>
        <Link href="/">
          <img width="110px" src="./images/logo.png" alt="logo"></img>
        </Link>
      </div>
      <div className={styles.navinfo}>
        <Link href="/map">Map</Link>
        <Link href="/seek-form">Seek </Link>
        <Link href="/host-form">Provide </Link>
        <FaFacebookSquare className={styles.icon} />
        <GrInstagram className={styles.icon} />
        <FaTwitter className={styles.icon} />

        {!isAuth ? (
          <>
            <Link href="/signin">
              <button className={styles.signin}>Sign In</button>
            </Link>
            <Link href="/signup">
              <button className={styles.signup}>Sign Up</button>
            </Link>
          </>
        ) : (
          <Link href="/">
            <button onClick={onLogOutHandler} className={styles.signup}>
              Logout
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
