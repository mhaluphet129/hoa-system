import type { AppProps } from "next/app";
import "reflect-metadata";

import "@/styles/globals.css";
import "@/styles/main.styles.css";
import { ConfigProvider } from "antd";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "abel",
        },
      }}
    >
      <Head>
        <link rel="shortcut icon" href="/web-logo.jpg" />
        <title>
          VVVHOA Portal: A Web-Based Application for Vista Verde Village
          Homeowners Association Online Portal
        </title>
        <meta name="description" content="This system is a system" />
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
