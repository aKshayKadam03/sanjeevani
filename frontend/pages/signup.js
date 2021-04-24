import React, { useState } from "react";
import axios from "axios";

function signup() {
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [phone, setPhone] = useState("");
  const [pan, setPan] = useState("");
  const [verified, setVerified] = useState(true);

  const createUser = () => {
    return axios
      .post("http://localhost:8080/user", {
        first,
        last,
        email,
        password,
        pic,
        phone,
        pan,
        verified,
      })
      .then((res) => {
        console.log("user posted successfully", res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <p>First name</p>
      <input type="text" onChange={(e) => setFirst(e.target.value)} />
      <br />
      <p>Last name</p>
      <input type="text" onChange={(e) => setLast(e.target.value)} />
      <br />
      <p>Email</p>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <br />
      <p>password</p>
      <input type="text" onChange={(e) => setPassword(e.target.value)} />
      <br />
      <p></p>
      {/* <input type="text" onChange = {(e) => setPic(e.target.value)}/> */}
      <br />
      <p>phone</p>
      <input type="text" onChange={(e) => setPhone(e.target.value)} />
      <br />
      <p>Pan no</p>
      <input type="text" onChange={(e) => setPan(e.target.value)} />
      <br />

      <button onClick={createUser}>Sign up</button>
    </div>
  );
}

export default signup;
