import type { AppProps } from "next/app";
import "reflect-metadata";

import "@/styles/globals.css";
import "@/styles//main.styles.css";
import { ConfigProvider } from "antd";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider>
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>
          VVVHOA Portal: A Web-Based Application for Vista Verde Village
          Homeowners Association Online Portal
        </title>
        <meta
          name="description"
          content="This system develop to help Landlords, students and OSS admin to ensure and automate booking, student monitoring and boarding house management"
        />
      </Head>
      <Component {...pageProps} />
    </ConfigProvider>
  );
}
