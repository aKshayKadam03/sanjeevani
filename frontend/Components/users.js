import React, { useState, useEffect } from "react";
import useSwr from "swr";
import axios from "axios";
import styles from "../../styles/users.module.css";
import Image from "next/image";

function users() {
  const [users, setUsers] = useState([]);
  const fetcher = (url) => {
    axios.get(url).then((res) => {
      setUsers(res.data);
    });
  };

  useSwr("https://protected-mesa-68876.herokuapp.com/app", fetcher);

  return (
    <div>
      {users.map((i) => (
        <div className={styles.card} key={i.id}>
          <div>
            <Image src="/hi.png" height={105} width={150} />
          </div>
          <div>
            <h3>Name</h3>
            <h4>Category</h4>
            <h4>location</h4>
          </div>
          <button>Pledge</button>
        </div>
      ))}
    </div>
  );
}

export default users;
