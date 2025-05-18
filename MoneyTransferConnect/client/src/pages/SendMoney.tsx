import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import TransferForm from "@/components/transfer/TransferForm";

const SendMoney = () => {
  const [location] = useLocation();
  const [fromCountry, setFromCountry] = useState<string | null>(null);
  const [toCountry, setToCountry] = useState<string | null>(null);

  // Extract query parameters on initial load
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    
    if (from) setFromCountry(from);
    if (to) setToCountry(to);
  }, [location]);

  return (
    <>
      <Helmet>
        <title>Send Money Internationally | GlobalRemit</title>
        <meta name="description" content="Send money internationally with competitive rates and low fees. Fast, secure transfers between Ghana, US, and Europe." />
        <meta property="og:title" content="Send Money Internationally | GlobalRemit" />
        <meta property="og:description" content="Send money internationally with competitive rates and low fees." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://globalremit.com/send-money" />
        {/* Load Remix icon library */}
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </Helmet>

      <section id="send-money" className="py-12 md:py-16 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">
            Send Money Internationally
          </h2>
          
          <TransferForm />
        </div>
      </section>
    </>
  );
};

export default SendMoney;
