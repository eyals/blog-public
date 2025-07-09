import { AppProps } from "next/app";
import Head from "next/head";
import "../src/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="robots" content="index, follow" />
        <link rel="author" href="https://ey.al" />
        <meta name="author" content="Eyal Shahar" />
      </Head>
      <div className="min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  );
}
