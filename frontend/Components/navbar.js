import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/navbar.module.css";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { GrInstagram } from "react-icons/gr";
import { FaTwitter } from "react-icons/fa";
import { AiFillThunderbolt } from "react-icons/ai";
import dynamic from "next/dynamic";
import axios from "axios";

const Users = dynamic(() => import("./seeks"));
const Hosts = dynamic(() => import("./hosting"));

function navbar({ req, seek }) {
  let [show, setShow] = useState(true);
  let del = req.data.filter((i) => i.category.name === "delivery"); //host
  let med = req.data.filter((i) => i.category.name === "medical"); //host
  let donate = req.data.filter((i) => i.category.name === "donation"); //host

  //seek
  let del1 = seek.data.filter((i) => i.category.name === "delivery"); //seek
  let med1 = seek.data.filter((i) => i.category.name === "medical"); //seek
  let donate1 = seek.data.filter((i) => i.category.name === "donation"); //seek

  let [cards, setCards] = useState(req.data);

  useEffect(() => {}, [cards]);

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


      

      {/* Filter && cards   */}

      <div className={styles.flex}>
        {/* filters bar */}
        <div className={styles.filters}>
          <h3>Filters for Seeking</h3>
          <div>
            <input
              type="checkbox"
              name="filter4"
              onChange={() => setCards(donate)}
            />
            <label htmlFor="filter4">Financial Help</label>
            <br />
            <input
              type="checkbox"
              name="filter5"
              onChange={() => setCards(del)}
            />
            <label htmlFor="filter5">Delivering Essentials</label>
            <br />
            <input
              type="checkbox"
              name="filter6"
              onChange={() => setCards(med)}
            />
            <label htmlFor="filter6">Medicines</label>
            <br />
          </div>

          <h3>Filters for Hosting</h3>
          <div>
            <input
              type="checkbox"
              name="fil1"
              onChange={() => setCards(donate1)}
            />
            <label htmlFor="fil1">Financial Help</label>
            <br />
            <input
              type="checkbox"
              name="fil2"
              onChange={() => setCards(del1)}
            />
            <label htmlFor="fil2">Delivering Essentials</label>
            <br />
            <input
              type="checkbox"
              name="fil3"
              onChange={() => setCards(med1)}
            />
            <label htmlFor="fil3">Medicines</label>
            <br />
          </div>
        </div>

        {/* Cards Section */}

        <div className={styles.cards}>
          <div style={{ display: "flex", margin: "2% 35%" }}>
            <button
              style={{ margin: "0% 5%" }}
              onClick={() => setCards(req.data)}
            >
              Seeking
            </button>
            <button
              onClick={() => setCards(seek.data)}
              style={{ margin: "0% 5%" }}
            >
              Hosting
            </button>
          </div>
          <Users cards={cards} />
        </div>
      </div>
    </div>
  );
}

export default navbar;
