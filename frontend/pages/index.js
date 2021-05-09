import dynamic from "next/dynamic";

const GoodbyeDynamic = dynamic(() => import("./home.js"));

// export async function getServerSideProps() {
//   // let res1 = await axios.get("http://localhost:8080/seek");
//   // const data1 = await res1.data;
//   // let res = await axios.get("http://localhost:8080/host");
//   // const data = await res.data;
//   // return {
//   //   props: { req: data, seek: data1 },
//   // };
// }

export default function Home({ req, seek }) {
  return (
    <div>
      <GoodbyeDynamic req={req} seek={seek} />
    </div>
  );
}
