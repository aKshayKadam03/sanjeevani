import { AppWrapper } from "../Context/UserContext";
import "../styles/globals.css";
import App from "next/app";
import React from "react";
import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import store from "../redux/store";
import Navbar1 from "../pages/navbar1";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Provider store={store}>
        <Navbar1 />
        <Component {...pageProps}></Component>
      </Provider>

      //    <AppWrapper>
      //   <Component {...pageProps} />;
      // </AppWrapper>
    );
  }
}

const makestore = () => store;

const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
