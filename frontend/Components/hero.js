import React from "react";
import styles from "../styles/navbar.module.css";
import { Carousel } from "antd";
import "antd/dist/antd.css";

const contentStyle = {
  height: "50vh",
  color: "white",
  fontSize: "30px",
  textAlign: "center",
  background: "black",
  opacity: "0.6",
  paddingTop: "25vh",
};

function hero() {
  return (
    <div>
      <Carousel
        className={styles.Carousel}
        effect="scrollx"
        dotPosition="left"
        autoplay
      >
        <div className={styles.CarouselItemOne}>
          <div>
            <h3 style={contentStyle}>
              Part of being a person is about helping others.
            </h3>
          </div>
        </div>
        <div className={styles.CarouselItemTwo}>
          <div>
            <h3 style={contentStyle}>What you give today you get tomorrow.</h3>
          </div>
        </div>
        <div className={styles.CarouselItemThree}>
          <div>
            <h3 style={contentStyle}>
              Let's feed the hungry and help the less fortunate among us, lets
              make the world a better place.
            </h3>
          </div>
        </div>
        <div className={styles.CarouselItemFour}>
          <div>
            <h3 style={contentStyle}>
              This Pandemic has been hard on all of us, lets fight our way out
              by helping each other.
            </h3>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default hero;
