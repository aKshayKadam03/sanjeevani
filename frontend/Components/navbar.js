import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import navbar1 from "../pages/navbar1";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import dynamic from "next/dynamic";
import useSwr from "swr";
import axios from "axios";

<<<<<<< HEAD
=======
import Hero from "./hero";

>>>>>>> 76a6faa76d4ab0c217374ce43406f287425b9942
const Seeks = dynamic(() => import("./seeks"));
const Hosts = dynamic(() => import("./hosting"));

let categories = [
  { delivery: "608307d7efc44f2f9c2cadc9" },
  { medical: "608307d7efc44f2f9c2cadca" },
  { donation: "608307d7efc44f2f9c2cadcb" },
  { fundRaiser: "608307d7efc44f2f9c2cadcc" },
  { recommendations: "608307d7efc44f2f9c2cadcd" },
];

let initState = {
  delivery: false,
  medical: false,
  donation: false,
  fundRaiser: false,
  recommendations: false,
};

function navbar({ req, seek }) {
  let [seeks, setSeeks] = useState([]);
  let [hosts, setHosts] = useState([]);
  let [cards, setCards] = useState(req.data);
  let [categoryArray, setCategoryArray] = useState(initState);
  let [active, setActive] = useState("seeks");

  const onChangeHandler = (e) => {
    const { name, checked } = e.target;
    setCategoryArray({ ...categoryArray, [name]: checked });
  };

  useEffect(() => {
    let arr = [];
    for (let key in categoryArray) {
      if (categoryArray[key]) {
        arr.push(key);
      }
    }

    if (active === "seeks") {
      getSeeksHandler(arr);
    } else {
      getHostsHandler(arr);
    }
  }, [categoryArray, active]);

  function tabToggle(n) {
    if (n === 1) {
      setActive("hosts");
    } else {
      setActive("seeks");
    }
    setCategoryArray(initState);
  }

  function getSeeksHandler(payload) {
    axios
      .post("http://localhost:8080/seek/getseeks", payload)
      .then((res) => {
        setSeeks(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  function getHostsHandler(payload) {
    axios
      .post("http://localhost:8080/host/gethosts", payload)
      .then((res) => {
        setHosts(res.data.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <div className={styles.Hero}>
        <Hero></Hero>
      </div>

      {/* Filter && cards   */}

      <div className={styles.MainSection}>
        {/* filters bar */}
        <div className={styles.filters}>
          {categories?.map((item) => (
            <div key={Object.values(item)[0]}>
              <label>
                <input
                  onChange={onChangeHandler}
                  name={Object.values(item)[0]}
                  type="checkbox"
                />
                {Object.keys(item)[0]}
              </label>
            </div>
          ))}
        </div>

        {/* Cards Section */}

        <div className={styles.display}>
          <div className={styles.toggleTab}>
            <button
              style={{
                backgroundColor: active === "hosts" ? "white" : "#4DA5E0",
                borderColor: active === "hosts" ? "#4DA5E0" : "white",
                color: active === "hosts" ? "#4DA5E0" : "white",
              }}
              className={styles.tabButton}
              onClick={() => tabToggle(2)}
            >
              Seeking Help
            </button>
            <button
              style={{
                backgroundColor: active === "seeks" ? "white" : "#4DA5E0",
                borderColor: active === "seeks" ? "#4DA5E0" : "white",
                color: active === "seeks" ? "#4DA5E0" : "white",
              }}
              className={styles.tabButton}
              onClick={() => tabToggle(1)}
            >
              Providing Help
            </button>
          </div>
<<<<<<< HEAD
          {!show ? <Seeks /> : <Hosts />}
=======
          <div className={styles.cards}>
            {active === "seeks" ? (
              <Seeks cards={seeks} />
            ) : (
              <Hosts cards={hosts} />
            )}
          </div>
>>>>>>> 76a6faa76d4ab0c217374ce43406f287425b9942
        </div>
      </div>
    </div>
  );
}

export default navbar;
