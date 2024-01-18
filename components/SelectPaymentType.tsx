import React from "react";
import Image from "next/image";

import { Loader } from "./Loader";
import { formatNumber, handleIframeAction } from "@/utils/helpers";

export const SelectPaymentType = ({
  setStatus,
  customerDetails,
  generateAccountNumberFn,
  resetDetailsFn,
  loading,
  error,
  optionDetails,
  getPaymentOptions,
}: {
  setStatus: Function;
  customerDetails: Record<string, any>;
  generateAccountNumberFn: () => void;
  resetDetailsFn: (e?: any) => void;
  loading: boolean;
  error: string;
  optionDetails: Record<string, any>;
  getPaymentOptions: () => void;
}) => {
  const renderPaymentOptions = () => {
    if (loading) {
      return (
        <div className="w-full flex flex-col items-center py-20 px-8 2xs:px-4">
          <Loader />
          <p className="text-[16px] text-black/80 text-center mt-3">
            Loading...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="w-full py-20 px-8 flex flex-col items-center 2xs:px-4">
          <p className="text-[16px] text-black/80 text-center">{error}</p>
          <div
            className="w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-primary-yellow bg-primary-yellow border-[1px] rounded-[5px] text-center cursor-pointer"
            onClick={() => {
              getPaymentOptions();
            }}
          >
            Retry
          </div>
        </div>
      );
    }

    if (!optionDetails || !optionDetails?.length) {
      return (
        <div className="w-full py-20 px-8 flex flex-col items-center 2xs:px-4">
          <p className="text-[16px] text-black/80 text-center">
            Your merchant has not been configured to receive payments. Please
            visit the merchant portal to complete your account configuration
          </p>
          <div
            className="w-[60%] mt-6 px-6 py-3 text-[16px] text-white border-red-500 bg-red-500 border-[1px] rounded-[5px] text-center cursor-pointer"
            onClick={() => {
              handleIframeAction("close");
              resetDetailsFn();
            }}
          >
            Close
          </div>
        </div>
      );
    }

    return (
      <div className="w-full mt-8">
        {!!optionDetails?.includes("BANK_TRANSFER") && (
          <div
            className="w-full flex items-center gap-x-3 border-line-gray border-b-[1px] pb-2 cursor-pointer"
            onClick={() => {
              generateAccountNumberFn();
              setStatus("transfer");
            }}
          >
            <div className="flex-1 flex items-center gap-x-4">
              <Image
                src="/icons/bank-transfer-icon.svg"
                alt=""
                width={38}
                height={38}
              />
              <p className="text-[16px] text-secondary-black">
                Pay with Bank Transfer
              </p>
            </div>
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              width={14}
              height={7}
            />
          </div>
        )}
        {!!optionDetails?.includes("CARD") && (
          <div
            className="w-full flex items-center gap-x-3 border-line-gray border-b-[1px] mt-8 pb-2 cursor-pointer"
            onClick={() => {
              setStatus("card");
            }}
          >
            <div className="flex-1 flex items-center gap-x-4">
              <Image src="/icons/card-icon.svg" alt="" width={38} height={38} />
              <p className="text-[16px] text-secondary-black">Pay with Card</p>
            </div>
            <Image
              src="/icons/chevron-right.svg"
              alt=""
              width={14}
              height={7}
            />
          </div>
        )}
      </div>
    );
  };

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
      <div className="w-full px-8 2xs:px-4 pt-4 pb-14">
        {!!optionDetails?.length && (
          <p className="text-[15px] leading-[21px] text-secondary-black text-center">
            Kindly select any of the payment options provided below to make a
            payment of{" "}
            <span className="text-primary-yellow">
              {customerDetails?.currency}
              {formatNumber(`${customerDetails?.amount || 0}`)}
            </span>{" "}
            to <br />
            <span className="text-primary-black">
              {customerDetails?.customerName}
            </span>
          </p>
        )}
        {renderPaymentOptions()}
        {!!optionDetails?.length && (
          <div
            className="w-full mt-8 px-6 py-3 text-[16px] text-primary-yellow border-primary-yellow border-dashed border-[1px] rounded-[3px] text-center cursor-pointer"
            onClick={() => {
              handleIframeAction("close");
              resetDetailsFn();
            }}
          >
            Cancel Payment
          </div>
        )}
      </div>
    </div>
  );
};
