import { AppWrapper } from "../Context/UserContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Component {...pageProps} />;
    </AppWrapper>
  );
}

export default MyApp;
