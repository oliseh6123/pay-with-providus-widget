import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { io } from "socket.io-client";
import Script from "next/script";

import {
  PayWithBankTransfer,
  SelectPaymentType,
  PayWithCard,
} from "@/components";
import { PageLayout } from "@/layouts";
import { config } from "@/config";
import { baseApi } from "@/services/api";
import { encrypt } from "@/utils/helpers";

const Home = () => {
  const socketRef = useRef(null);
  const isMounted = useRef(false);
  const [status, setStatus] = useState("type");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [accountDetails, setAccountDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [optionLoading, setOptionLoading] = useState(true);
  const [optionError, setOptionError] = useState("");
  const [optionDetails, setOptionDetails] = useState(null);

  const handlePaymentInitiation = (e) => {
    e?.preventDefault();
    setCustomerDetails(e?.data);
  };

  const getPaymentOptions = async () => {
    setOptionLoading(true);
    setOptionError("");
    try {
      const { data } = await baseApi.get("/merchant/payment-options", {
        params: {
          publicKey: customerDetails?.publicKey,
          currency: customerDetails?.currency,
        },
      });
      setOptionDetails(data?.data?.options);
    } catch (err) {
      setOptionError(err?.response?.data?.message || err?.message);
    } finally {
      setOptionLoading(false);
    }
  };

  useEffect(() => {
    window.addEventListener("message", handlePaymentInitiation);
    return () => window.removeEventListener("message", handlePaymentInitiation);
  }, []);

  useEffect(() => {
    if (customerDetails?.customerName) {
      getPaymentOptions();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerDetails?.customerName]);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    socketRef.current = io(config.SERVER_URL);

    socketRef.current.on(
      `${accountDetails?.reference}-${accountDetails?.accountNumber}`,
      (data) => {
        setPaymentDetails(data);
      }
    );
  }, [
    accountDetails?.reference,
    accountDetails?.accountNumber,
    accountDetails?.sessionKey,
    isMounted,
  ]);

  const generateAccountNumberFn = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await baseApi.post("/accounts/initiate", {
        data: encrypt(
          JSON.stringify({
            customerName: customerDetails?.customerName,
            reference: customerDetails?.reference,
            amount: customerDetails?.amount,
            email: customerDetails?.email,
          }),
          customerDetails.publicKey
        ),
        clientId: customerDetails.clientId,
      });
      setAccountDetails(data?.data);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Transaction could not be initiated"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetDetailsFn = (details?: Record<string, any>) => {
    if (details) {
      setCustomerDetails(details);
    } else {
      setCustomerDetails(null);
    }
    setAccountDetails(null);
    setPaymentDetails(null);
    setStatus("type");
  };

  const renderContent = () => {
    switch (status) {
      case "transfer": {
        return (
          <PayWithBankTransfer
            setType={setStatus}
            customerDetails={customerDetails}
            accountDetails={accountDetails}
            paymentDetails={paymentDetails}
            setPaymentDetails={setPaymentDetails}
            generateAccountNumberFn={generateAccountNumberFn}
            loading={loading}
            error={error}
            resetDetailsFn={resetDetailsFn}
            setError={setError}
          />
        );
      }
      case "card": {
        return (
          <PayWithCard
            setStatus={setStatus}
            customerDetails={customerDetails}
          />
        );
      }
      default: {
        return (
          <SelectPaymentType
            setStatus={setStatus}
            customerDetails={customerDetails}
            generateAccountNumberFn={generateAccountNumberFn}
            resetDetailsFn={resetDetailsFn}
            loading={optionLoading}
            error={optionError}
            optionDetails={optionDetails}
            getPaymentOptions={getPaymentOptions}
          />
        );
      }
    }
  };

  return (
    <>
      <Head>
        <title>Pay with providus</title>
        <meta name="description" content="A payment gateway with providus" />
      </Head>
      <PageLayout resetDetailsFn={resetDetailsFn}>{renderContent()}</PageLayout>
      <Script
        type="text/javascript"
        src="https://ap-gateway.mastercard.com/static/checkout/checkout.min.js"
        data-complete="completeCallback"
        strategy="afterInteractive"
      />
    </>
  );
};

export default Home;