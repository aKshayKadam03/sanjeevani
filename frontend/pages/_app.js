import "../styles/globals.css";
import Navbar1 from "../pages/navbar1";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar1 />
      <Component {...pageProps} />;
    </>
  );
}

export default MyApp;
