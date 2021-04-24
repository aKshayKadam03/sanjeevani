import Head from "next/head";
// import styles from "../styles/Home.module.css";
import navbar from "../Components/navbar";
import dynamic from "next/dynamic";
import axios from "axios";

const GoodbyeDynamic = dynamic(() => import("../Components/navbar"));

export async function getServerSideProps() {
  let res1 = await axios.get("http://localhost:8080/seek");
  const data1 = await res1.data;
  let res = await axios.get("http://localhost:8080/host");
  const data = await res.data;

  return {
    props: { req: data, seek: data1 },
  };
}

export default function Home({ req, seek }) {
  return (
    <div>
      <GoodbyeDynamic req={req} seek={seek} />
    </div>
  );
}
