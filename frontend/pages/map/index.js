import React from "react";
import dynamic from "next/dynamic";
import styles from "../../styles/Map.module.css";
import pin from "../../public/images/pink.json";
import Lottie from "react-lottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: pin,
};

export default function Home() {
  const MapWithNoSSR = dynamic(
    (seeks = { seeks }) => import("../../Components/map"),
    {
      ssr: false,
    }
  );

  return (
    <main className={styles.Wrapper}>
      <div>
        <div>
          <h1>Help Map</h1>
        </div>

        <div>
          <Lottie options={defaultOptions} height={80} width={80} />
        </div>
      </div>

      <div className={styles.mapContent}>
        <div id="map">
          <MapWithNoSSR />
        </div>
      </div>
      <div className={styles.Legend}>
        <div>
          <h4>Legend</h4>
        </div>
        <div>
          <img src="/images/marker-icon.png" alt="blue"></img>
          <p>People who are offering help</p>
        </div>
        <div>
          <img src="/images/marker2.png" alt="blue"></img>
          <p>People who are seeking help</p>
        </div>
      </div>
    </main>
  );
}
