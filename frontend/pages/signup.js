import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/signup.module.css";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUsers } from "../redux/Auth/actions";
import { useRouter } from "next/router";

const Good = dynamic(() => import("../Components/navbar"));

function signup() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("https://picsum.photos/200/200");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [verified, setVerified] = useState(true);

  const [wrong, setWrong] = useState(false);
  const dispatch = useDispatch();

  const router = useRouter();
  useEffect(() => {
    dispatch(getUsers());
  }, []);

  let a = useSelector((state) => state.auth.users.data);
  const createUser = async (e) => {
    await e.preventDefault();
    var flag = true;
    a.data.map((i) => {
      if (i.email === email) {
        flag = false;
        setWrong(true);
      }
    });

    if (flag) {
      await axios
        .post("http://localhost:8080/user", {
          firstName: first,
          lastName: last,
          email: email,
          password: password,
          img: pic,
          phone: phone,
          pan: pan,
          verified: verified,
        })
        .then((res) => {
          dispatch(
            getCurrentUser({
              firstName: first,
              lastName: last,
              email: email,
              password: password,
              img: pic,
              phone: phone,
              pan: pan,
              verified: verified,
            })
          );
          router.push("/");
        });
    }
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div>
      {wrong && (
        <div className={styles.wrong}>
          <h4>Please Enter unique email</h4>
        </div>
      )}
      <form onSubmit={createUser} className={styles.container}>
        <h1>Sign Up</h1>
        <label htmlFor="fst">First name</label>
        <input
          name="fst"
          required
          type="text"
          onChange={(e) => setFirst(e.target.value)}
        />
        <label htmlFor="lst">Last Name</label>
        <input
          name="lst"
          required
          type="text"
          onChange={(e) => setLast(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="pass">Password</label>
        <input
          required
          name="pass"
          type="text"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="cell">Phone</label>
        <input
          name="cell"
          required
          type="text"
          onChange={(e) => setPhone(e.target.value)}
        />
        <label htmlFor="pan">Pan No</label>
        <input
          name="pan"
          required
          type="text"
          onChange={(e) => setPan(e.target.value)}
        />
        <label htmlFor="pic">Profile Picture</label>
        <input
          name="pic"
          required
          type="file"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default signup;
