import { Helmet } from "react-helmet";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TransferCorridors from "@/components/TransferCorridors";
import Testimonials from "@/components/Testimonials";
import DownloadApp from "@/components/DownloadApp";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>GlobalRemit - International Money Transfer</title>
        <meta name="description" content="Fast, secure, and affordable money transfers between Ghana, US, and Europe. Send money globally with confidence using GlobalRemit." />
        <meta property="og:title" content="GlobalRemit - International Money Transfer" />
        <meta property="og:description" content="Fast, secure, and affordable money transfers between Ghana, US, and Europe." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globalremit.com" />
        {/* Load Remix icon library */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Helmet>
      
      <Hero />
      <Features />
      <TransferCorridors />
      <Testimonials />
      <DownloadApp />
    </>
  );
};

export default Home;
