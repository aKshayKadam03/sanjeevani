import React, { useState, useEffect } from "react";
import styles from "../styles/signin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../redux/Auth/actions";

import { useRouter } from "next/router";
import Image from "next/image";

function signin() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [wrong, setWrong] = useState(false);

  let dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let a = useSelector((state) => state.auth.users.data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var flag = true;
    a.data.map((i) => {
      if (i.email === email && i.password === password) {
        dispatch(getCurrentUser(i));
        window.localStorage.setItem("currentUser", JSON.stringify(i));
        router.push("/");
        flag = false;
      }
    });
    if (flag) {
      setWrong(true);
    }
  };

  return (
    <div className={styles.wrapper}>
      {wrong && (
        <div className={styles.wrong}>
          <h4>Email or password is incorrect. Please try again</h4>
        </div>
      )}
      <div className={styles.parentContainer}>
        <div>
          <form onSubmit={handleSubmit} className={styles.container}>
            <h1 className={styles.h1}>Sign In</h1>
            <input
              placeholder="Email"
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              placeholder="Password"
              required
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button type="submit">Sign in</button>
          </form>
        </div>
        <div>
          <Image src="/un.svg" width={350} height={350} />
        </div>
      </div>
    </div>
  );
}

export default signin;
