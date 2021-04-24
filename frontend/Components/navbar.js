import React, { useState, useEffect, useRef } from "react";
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
import map from "../public/images/map.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: map,
};

import Hero from "./hero";
import { useSelector } from "react-redux";

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

function navbar() {
  let [seeks, setSeeks] = useState([]);
  let [hosts, setHosts] = useState([]);
  let [tags, setTags] = useState([]);
  let [categoryArray, setCategoryArray] = useState(initState);
  let [active, setActive] = useState("seeks");
  let status = useRef(false);
  let persistentSeek = useRef([]);
  let persistentHost = useRef([]);

  const tagsCollector = () => {
    let arr = {};
    if (active === "seeks") {
      for (let i = 0; i < seeks.length; i++) {
        let temp = seeks[i].category.tags;
        for (let j = 0; j < temp.length; j++) {
          arr[temp[j]] = 0;
        }
      }
    } else {
      for (let i = 0; i < hosts.length; i++) {
        let temp = hosts[i].category.tags;
        for (let j = 0; j < temp.length; j++) {
          arr[temp[j]] = 0;
        }
      }
    }
    setTags([...Object.keys(arr)]);
  };

  React.useEffect(() => {
    tagsCollector();
  }, [seeks, hosts]);

  const onChangeHandler = (e) => {
    const { name, checked } = e.target;
    setCategoryArray({ ...categoryArray, [name]: checked });
  };

  const clearCheckBox = () => {
    let inputs = document.querySelectorAll("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].checked = false;
    }
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
    clearCheckBox();
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

  let a = useSelector((state) => state.auth.currentUser);
  console.log("Current", a);
  return (
    <div>
      <div className={styles.Hero}>
        <Hero></Hero>
      </div>

      {/* Filter && cards   */}
      <div>
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
      </div>

      <div className={styles.MainSection}>
        {/* filters bar */}

        <div className={styles.filters}>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHead}>
              <h2>Filters</h2>
            </div>
            <div className={styles.filterSectionContent}>
              {categories?.map((item) => (
                <div key={Object.values(item)[0]}>
                  <label>
                    <input
                      className="input"
                      onChange={onChangeHandler}
                      name={Object.values(item)[0]}
                      type="checkbox"
                    />
                    {Object.keys(item)[0]}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterSectionHead}>
              <h2>Tags</h2>
            </div>
            <div className={styles.filterSectionContent}>
              <div className={styles.allTags}>
                {tags?.map((item) => (
                  <button>{item}</button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.filterSection}>
            <div className={styles.filterSectionHead}>
              <h2>Search By Map</h2>
            </div>
            <div className={styles.filterSectionContent}>
              <Link href="/map">
                <div>
                  <Lottie options={defaultOptions} height={160} width={160} />
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Cards Section */}

        <div className={styles.display}>
          <div className={styles.Cards}>
            {active === "seeks" ? (
              <Seeks cards={seeks} />
            ) : (
              <Hosts cards={hosts} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
