import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/signup.module.css";
import dynamic from "next/dynamic";

const Good = dynamic(() => import("../Components/navbar"));

function signup() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("https://picsum.photos/200/300");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [verified, setVerified] = useState(true);

  const [id, setId] = useState(1);

  const [user, setUser] = useState([]);

  const createUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user", {
        firstName: first,
        lastName: last,
        email: email,
        password: password,
        img: pic,
        phone: phone,
        pan: pan,
        verified: verified,
      });
      console.log(response.data.data);
      setUser([response.data.data]);
      console.log(user);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      <h1>Sign Up</h1>
      <form onSubmit={createUser}>
        <div>
          <p>First name</p>
          <input
            required
            type="text"
            onChange={(e) => setFirst(e.target.value)}
          />
          <p>Last name</p>
          <input
            required
            type="text"
            onChange={(e) => setLast(e.target.value)}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            required
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <p>Password</p>
          <input
            required
            type="text"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <p>Phone</p>
          <input
            required
            type="text"
            onChange={(e) => setPhone(e.target.value)}
          />
          <p>Pan no</p>
          <input
            required
            type="text"
            onChange={(e) => setPan(e.target.value)}
          />
        </div>
        <div>
          <p>Profile pic</p>
          <input required type="file" onChange={(e) => handleChange(e)} />
        </div>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default signup;
