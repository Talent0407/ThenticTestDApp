import Head from "next/head";
import Mint from "../components/Mint";
import Faq from "../sections/Faq";
import Hero from "../sections/Hero";
import Roadmap from "../sections/Roadmap";
import Team from "../sections/Team";
import ScrollToTop from "react-scroll-to-top";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ThenticTestDApp</title>
        <meta name="description" content="CloudBunnies NFT" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex justify-center">
        <div className="relative max-w-[1920px]">
          <ScrollToTop smooth component={<img src="/img/up-top.png" />} />
          <Hero />
          <Mint />
          <Roadmap />
          <Team />
          <Faq />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </div>
  );
}
