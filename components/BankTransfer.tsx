import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import Countdown from "react-countdown";
import { format } from "date-fns";

import { Loader } from "./Loader";
import { naira, formatNumber, handleIframeAction } from "@/utils/helpers";
import { baseApi } from "@/services/api";

export const PayWithBankTransfer = ({
  setType,
  customerDetails,
  accountDetails,
  paymentDetails,
  setPaymentDetails,
  generateAccountNumberFn,
  loading,
  error,
  resetDetailsFn,
  setError,
}: {
  setType: Function;
  customerDetails: Record<string, any>;
  accountDetails: Record<string, any>;
  paymentDetails: Record<string, any>;
  setPaymentDetails: Function;
  generateAccountNumberFn: () => void;
  loading: boolean;
  error: string;
  resetDetailsFn: (e?: any) => void;
  setError: Function;
}) => {
  const paymentRef = useRef(null);
  const [status, setStatus] = useState("details");
  const [marginCount, setMarginCount] = useState(0);
  const [margin, setMargin] = useState("ml-[0%]");
  const [currentTime, setCurrentTime] = useState(Date.now());

  const refetchPaymentDetails = async () => {
    try {
      const { data } = await baseApi.post("/transactions/status", {
        publicKey: customerDetails?.publicKey,
        customerReference: customerDetails?.reference,
        accountNumber: accountDetails?.accountNumber,
      });

      if (data?.data?.transactionStatus === "PAID") {
        setPaymentDetails(data?.data);
        setStatus("payment success");
        clearInterval(paymentRef.current);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (status === "payment sent") {
      setTimeout(() => {
        if (marginCount === 0) {
          setMarginCount(20);
          setMargin("ml-[20%]");
        } else if (marginCount === 20) {
          setMarginCount(40);
          setMargin("ml-[40%]");
        } else if (marginCount === 40) {
          setMarginCount(60);
          setMargin("ml-[60%]");
        } else {
          setMarginCount(0);
          setMargin("ml-[0%]");
        }
      }, 500);
    }

    if (status === "payment sent" && paymentDetails) {
      setStatus("payment received");
    }

    if (status === "payment received") {
      setTimeout(() => {
        setStatus("payment success");
      }, 300);
    }
  }, [status, marginCount, paymentDetails]);

  useEffect(() => {
    if (accountDetails?.accountNumber) {
      setCurrentTime(Date.now() + 30 * 60000);
    }
  }, [accountDetails?.accountNumber]);

  useEffect(() => {
    if (!accountDetails?.accountNumber) return;

    paymentRef.current = setInterval(refetchPaymentDetails, 30000);

    return () => {
      clearInterval(paymentRef.current);
    };
  }, [accountDetails?.accountNumber]);

  const renderDetails = () => {
    return (
      <div className="w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]">
        <div className="w-full px-8 2xs:px-4 py-4 flex items-center justify-between border-line-gray border-b-[1px]">
          <Image
            src="/img/providus-logo.png"
            alt="Providus Logo"
            width={82}
            height={40}
          />
          <p className="text-[14px] uppercase text-primary-black font-medium">
            PROVIDUS CHECKOUT
          </p>
        </div>
        {loading ? (
          <div className="w-full flex flex-col items-center py-20 px-8 2xs:px-4">
            <Loader />
            <p className="text-[16px] text-black/80 text-center mt-3">
              Loading...
            </p>
          </div>
        ) : error ? (
          <div className="w-full py-20 px-8 flex flex-col items-center 2xs:px-4">
            <p className="text-[16px] text-black/80 text-center">{error}</p>
            <div
              className="w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[5px] text-center cursor-pointer"
              onClick={() => {
                generateAccountNumberFn();
              }}
            >
              Retry
            </div>
          </div>
        ) : (
          <div className="w-full px-8 pt-4 pb-14 text-center 2xs:px-4">
            <p className="text-[15px] leading-[21px] text-secondary-black text-center">
              Please make payment to{" "}
              <span className="text-primary-black">
                {customerDetails?.customerName}
              </span>
            </p>
            <p className="text-[24px] leading-[21px] text-primary-black text-center mt-2">
              {naira}
              {formatNumber(`${accountDetails?.amount}`)}
            </p>
            <div className="w-full mt-8 border-yellow-border border-dashed border-[1px] bg-yellow-bg rounded-[5px] py-6 px-4 flex flex-col items-center gap-y-3">
              <p className="text-primary-black text-[16px] text-center">
                Providus Bank
              </p>
              <div className="flex items-center gap-x-2">
                <p className="text-[24px] text-primary-black">
                  {accountDetails?.accountNumber}
                </p>
                <CopyToClipboard
                  text={accountDetails?.accountNumber}
                  onCopy={() =>
                    toast.success("Account number copied successfully")
                  }
                >
                  <Image
                    src="/icons/copy-icon.svg"
                    alt=""
                    width={15}
                    height={16.36}
                    className="cursor-pointer"
                  />
                </CopyToClipboard>
              </div>
              <p className="text-[16px] text-center">
                {accountDetails?.accountName}
              </p>
            </div>
            <div
              className="w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer"
              onClick={() => {
                setStatus("payment sent");
              }}
            >
              I’ve made payment
            </div>
            <p
              className="mx-auto text-center cursor-pointer text-primary-yellow underline mt-4 inline-block"
              onClick={() => {
                setType("card");
              }}
            >
              Pay with Card
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderPaymentSuccess = () => {
    return (
      <div className="w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]">
        <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
          <Image
            src="/img/providus-logo.png"
            alt="Providus Logo"
            width={82}
            height={40}
          />
          <p className="text-[14px] uppercase text-primary-black font-medium">
            PROVIDUS CHECKOUT
          </p>
        </div>
        <div className="w-full px-8 pt-4 pb-14 text-center 2xs:px-4">
          <div className="flex justify-center">
            <Image src="/img/success-gif.gif" alt="" width={286} height={161} />
          </div>
          <p className="text-[20px] text-center text-primary-green mt-10">
            Payment Successful
          </p>
          <p className="text-[15px] leading-[21px] text-secondary-black text-center mt-2">
            Your payment of{" "}
            <span className="text-primary-black text-[17px] font-[900]">
              {naira}
              {formatNumber(`${paymentDetails?.amount || 0}`)}
            </span>{" "}
            has been received by{" "}
            <span className="text-primary-black">
              {paymentDetails?.accountName}
            </span>
          </p>
          <div
            className="w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer"
            onClick={() => {
              setStatus("payment receipt");
            }}
          >
            Show Receipt
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentError = () => {
    return (
      <div className="w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]">
        <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
          <Image
            src="/img/providus-logo.png"
            alt="Providus Logo"
            width={82}
            height={40}
          />
          <p className="text-[14px] uppercase text-primary-black font-medium">
            PROVIDUS CHECKOUT
          </p>
        </div>
        <div className="w-full px-8 pt-4 pb-14 text-center 2xs:px-4">
          <div className="flex justify-center">
            <Image
              src="/img/payment-decline.gif"
              alt=""
              width={197}
              height={198}
            />
          </div>
          <p className="text-[20px] text-center text-primary-red mt-10">
            Payment Failed
          </p>
          <p className="text-[15px] leading-[21px] text-secondary-black text-center mt-2">
            {error}
          </p>
          <div
            className="w-full mt-8 px-6 py-3 text-[16px] text-white border-primary-red bg-primary-red border-[1px] rounded-[3px] text-center cursor-pointer"
            onClick={() => {
              handleIframeAction("close");
              resetDetailsFn();
            }}
          >
            Close
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentSent = () => {
    return (
      <div className="w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]">
        <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
          <Image
            src="/img/providus-logo.png"
            alt="Providus Logo"
            width={82}
            height={40}
          />
          <p className="text-[14px] uppercase text-primary-black font-medium">
            PROVIDUS CHECKOUT
          </p>
        </div>
        <div className="w-full px-8 pt-4 pb-14 2xs:px-4">
          <Countdown
            date={currentTime}
            onComplete={() => {
              if (!paymentDetails) {
                setStatus("payment error");
                setError("Transaction could not be completed");
                setMarginCount(0);
                setMargin("ml-[0%]");
              }
            }}
            renderer={({ minutes, seconds }) => {
              return (
                <p className="text-[18px] text-primary-black text-center mb-3">
                  {minutes}:{seconds}{" "}
                  {minutes > 0 ? "minutes" : seconds > 0 ? "seconds" : ""}
                </p>
              );
            }}
          />
          <p className="text-[15px] leading-[21px] text-secondary-black text-center">
            Please make payment to{" "}
            <span className="text-primary-black">
              {accountDetails?.accountName}
            </span>
          </p>
          <p className="text-[24px] leading-[21px] text-primary-black text-center mt-2">
            {naira}
            {formatNumber(`${accountDetails?.amount || 0}`)}
          </p>
          <div className="w-full mt-10 mb-4">
            <p className="text-primary-black text-[16px] text-center leading-[20.83px]">
              Your transfer is being confirmed and it <br />
              may take a few minutes
            </p>
            <div className="w-full flex items-center gap-x-3 pl-1 pr-3 mt-10">
              <Image
                src="/icons/circled-check-green.svg"
                alt=""
                width={30}
                height={30}
              />
              <div className="flex-1 h-[5px] bg-line-gray rounded-[5px] overflow-hidden">
                <div
                  className={`w-[40%] h-full bg-primary-green rounded-[5px] inline-animation ${margin}`}
                />
              </div>
              <div className="w-[29px] h-[29px] rounded-[50%] border-gray-300 border-[1px]" />
            </div>
            <div className="w-full flex items-center justify-between mt-[2px]">
              <p className="text-[14px] text-primary-green">Sent</p>
              <p className="text-[14px] text-status-black">Received</p>
            </div>
          </div>
          <div
            className="w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer"
            onClick={() => setStatus("details")}
          >
            Show account number
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentReceived = () => {
    return (
      <div className="w-[445px] 2xs:w-full relative z-[100] rounded-[7px] bg-white border-gray-200 border-[1px]">
        <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
          <Image
            src="/img/providus-logo.png"
            alt="Providus Logo"
            width={82}
            height={40}
          />
          <p className="text-[14px] uppercase text-primary-black font-medium">
            PROVIDUS CHECKOUT
          </p>
        </div>
        <div className="w-full px-8 pt-4 pb-14 2xs:px-4">
          <p className="text-[15px] leading-[21px] text-secondary-black text-center">
            Please make payment to{" "}
            <span className="text-primary-black">
              {accountDetails?.accountName}
            </span>
          </p>
          <p className="text-[24px] leading-[21px] text-primary-black text-center mt-2">
            {naira}
            {formatNumber(`${accountDetails?.amount}`)}
          </p>
          <div className="w-full mt-10 mb-4">
            <p className="text-primary-black text-[16px] text-center leading-[20.83px]">
              Your transfer is being confirmed and it <br />
              may take a few minutes
            </p>
            <div className="w-full flex items-center gap-x-3 pl-1 pr-3 mt-10">
              <Image
                src="/icons/circled-check-green.svg"
                alt=""
                width={30}
                height={30}
              />
              <div className="flex-1 h-[5px] bg-primary-green rounded-[5px] overflow-hidden" />
              <Image
                src="/icons/circled-check-green.svg"
                alt=""
                width={30}
                height={30}
              />
            </div>
            <div className="w-full flex items-center justify-between mt-[2px]">
              <p className="text-[14px] text-primary-green">Sent</p>
              <p className="text-[14px] text-primary-green">Received</p>
            </div>
          </div>
          <div
            className="w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer"
            onClick={() => setStatus("details")}
          >
            Show account number
          </div>
        </div>
      </div>
    );
  };

  const renderPaymentReceipt = () => {
    return (
      <div className="2xs:w-full rounded-[7px] border-gray-200 border-[1px] overflow-hidden">
        <div className="w-[500px] 2xs:w-full max-h-[95vh] overflow-y-auto relative z-[100] bg-white">
          <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
            <Image
              src="/img/providus-logo.png"
              alt="Providus Logo"
              width={82}
              height={40}
            />
            <p className="text-[14px] uppercase text-primary-black font-medium">
              PROVIDUS CHECKOUT
            </p>
          </div>
          <div className="w-full px-6 pt-6 pb-10 text-center 2xs:px-4">
            <div className="w-full rounded-[5px] bg-card-gray-bg pt-6">
              <p className="text-[14px] text-tertiary-black text-center">
                Transaction Amount
              </p>
              <p className="text-[18px] text-primary-black text-center mt-1">
                {naira}
                {formatNumber(`${paymentDetails?.amount || 0}`)}
              </p>
              <div className="mt-6 w-full flex flex-col gap-y-3">
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Beneficiary Details
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black">
                      {paymentDetails?.accountName}
                    </p>
                    <p className="text-[12px] text-tertiary-black">
                      PROVIDUS BANK | {paymentDetails?.accountNumber}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Sender Details
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black">
                      {paymentDetails?.payerAccountName}
                    </p>
                    <p className="text-[12px] text-tertiary-black">
                      {paymentDetails?.payerBankName} |{" "}
                      {paymentDetails?.payerAccountNumber}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Date and Time
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black">
                      {paymentDetails?.createdAt
                        ? format(
                            new Date(paymentDetails?.createdAt),
                            "dd MMMM yyyy"
                          )
                        : null}
                    </p>
                    <p className="text-[12px] text-tertiary-black">
                      {paymentDetails?.createdAt
                        ? format(new Date(paymentDetails?.createdAt), "p")
                        : null}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Transaction Reference
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black w-[99.99%] break-words">
                      {paymentDetails?.customerReference
                        ? paymentDetails?.customerReference?.substring(4)
                        : null}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Session ID
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black w-[99.99%] break-words">
                      {paymentDetails?.sessionId}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 pb-2 border-line-gray border-b-[1px]">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Settlement ID
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-black w-[99.99%] break-words">
                      {paymentDetails?.settlementId}
                    </p>
                  </div>
                </div>
                <div className="px-4 flex items-start gap-x-2 mt-1 pb-4">
                  <p className="flex-1 text-[14px] text-tertiary-black text-left">
                    Status
                  </p>
                  <div className="w-[55%] text-right">
                    <p className="text-[14px] text-primary-green w-[99.99%] break-words">
                      {paymentDetails?.transactionStatus}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {!!paymentDetails?.downloadURL && (
              <div
                className="w-full mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[3px] text-center cursor-pointer"
                onClick={() =>
                  window.open(paymentDetails?.downloadURL, "_blank")
                }
              >
                Download Receipt
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (status) {
      case "payment sent": {
        return renderPaymentSent();
      }
      case "payment received": {
        return renderPaymentReceived();
      }
      case "payment success": {
        return renderPaymentSuccess();
      }
      case "payment error": {
        return renderPaymentError();
      }
      case "payment receipt": {
        return renderPaymentReceipt();
      }
      default: {
        return renderDetails();
      }
    }
  };

  return renderContent();
};