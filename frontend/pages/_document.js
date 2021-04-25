import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Sanjeevani</title>
          <link
            rel="icon"
            href="https://image.flaticon.com/icons/png/512/702/702753.png"
          ></link>
          <script
            src="https://kit.fontawesome.com/249783f98b.js"
            crossorigin="anonymous"
          ></script>
          <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
          <script
            src="https://cdnjs.cloudflare.com/ajax/libs/Leaflet.awesome-markers/2.0.2/leaflet.awesome-markers.min.js"
            integrity="sha512-8BqQ2RH4L4sQhV41ZB24fUc1nGcjmrTA6DILV/aTPYuUzo+wBdYdp0fvQ76Sxgf36p787CXF7TktWlcxu/zyOg=="
            crossorigin="anonymous"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
