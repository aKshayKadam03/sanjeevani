import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "../styles/signin.module.css";
import { AppWrapper, useAppContext } from "../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../redux/Auth/actions";

const Good = dynamic(() => import("../Components/navbar"));

function signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [show, setShow] = useState(false);
  let [wrong, setWrong] = useState(false);

  let dispatch = useDispatch();

  useEffect(() => {
    setShow(false);
    dispatch(getUsers());
  }, []);

  let a = useSelector((state) => state.auth.users.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      a.data.map((i) => {
        if (i.email === email && i.password === password) {
          dispatch(getCurrentUser(i));
          window.localStorage.setItem("currentUser", JSON.stringify(i));
          setShow(true);
        }
      });
    } catch (err) {
      console.log(err);
      setWrong(true);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Log In</h1>

      {show && (
        <Link href="/">
          <button> Go to Dashboard</button>
        </Link>
      )}
      {wrong && <div>Email or password is incorrect. Please try again</div>}

      <form onSubmit={handleSubmit}>
        <h2>Email</h2>
        <input
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <h2>Password</h2>
        <input
          required
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default signin;
