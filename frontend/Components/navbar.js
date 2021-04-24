import React, { useState } from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import dynamic from "next/dynamic";
import axios from "axios";

const Seeks = dynamic(() => import("./seeks"));
const Hosts = dynamic(() => import("./hosting"));

function navbar({ req }) {
  console.log(req);

  let [show, setShow] = useState(true);
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.navimg}>
          <AiFillThunderbolt className={styles.logo} />
          <h3>Sanjeevani</h3>
        </div>
        <div className={styles.navinfo}>
          <Link href="/">About us</Link>
          <Link href="/">Contact us</Link>
          <Link href="/">Contribute</Link>
          <FaFacebookSquare className={styles.icon} />
          <GrInstagram className={styles.icon} />
          <FaTwitter className={styles.icon} />
          <button className={styles.donate}>Donate</button>
        </div>
      </div>

      {/* hero building */}

      <div className={styles.hero}>
        <h4>Important topics</h4>
      </div>

      {/* Filter && cards   */}

      <div className={styles.flex}>
        {/* filters bar */}
        <div className={styles.filters}>
          <h3>Filters</h3>
          <div>
            <input type="checkbox" name="filter1" />
            <label htmlFor="filter1">Trending</label>
            <br />
            <input type="checkbox" name="filter2" />
            <label htmlFor="filter2">Important</label>
            <br />
            <input type="checkbox" name="filter3" />
            <label htmlFor="filter3">COVID Essentials</label>
            <br />
            <input type="checkbox" name="filter4" />
            <label htmlFor="filter4">Financial Help</label>
            <br />
            <input type="checkbox" name="filter5" />
            <label htmlFor="filter5">Delivering Essentials</label>
            <br />
            <input type="checkbox" name="filter6" />
            <label htmlFor="filter6">Medicines</label>
            <br />
          </div>
        </div>

        {/* Cards Section */}

        <div className={styles.cards}>
          <div style={{ display: "flex", margin: "2% 35%" }}>
            <button style={{ margin: "0% 5%" }} onClick={() => setShow(false)}>
              Seeking
            </button>
            <button onClick={() => setShow(true)} style={{ margin: "0% 5%" }}>
              Hosting
            </button>
          </div>
          {!show ? <Seeks /> : <Hosts />}
        </div>
      </div>
    </div>
  );
}

export default navbar;
