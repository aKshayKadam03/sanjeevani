import React, { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "../styles/signin.module.css";
import { AppWrapper, useAppContext } from "../Context/UserContext";

const Good = dynamic(() => import("../Components/navbar"));

function signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [show, setShow] = useState();
  let [wrong, setWrong] = useState(false);

  let [global, setGlobalSet] = useState([]);

  let glo = useAppContext(AppWrapper);

  useEffect(() => {
    setShow(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:8080/user");
      response.data.data.map((i) => {
        if (i.email === email && i.password === password) {
          setGlobalSet(i);
          glo = i;
          setShow(true);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  //   console.log(global);

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
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <h2>Password</h2>
        <input type="text" onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default signin;
