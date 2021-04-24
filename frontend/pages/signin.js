import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "../styles/signin.module.css";
import { AppWrapper, useAppContext } from "../Context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../redux/Auth/actions";

import { useRouter } from "next/router";

const Good = dynamic(() => import("../Components/navbar"));

function signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [show, setShow] = useState(false);
  let [wrong, setWrong] = useState(false);

  let dispatch = useDispatch();

  const router = useRouter();

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
    <div>
      {wrong && (
        <div className={styles.wrong}>
          <h4>Email or password is incorrect. Please try again</h4>
        </div>
      )}

      <form onSubmit={handleSubmit} className={styles.container}>
        <h1 className={styles.h1}>Log In</h1>
        <p>Email</p>
        <input
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>Password</p>
        <input
          required
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default signin;
