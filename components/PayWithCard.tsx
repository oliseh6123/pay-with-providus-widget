import React, { useState, useEffect } from "react";
import Image from "next/image";

import { Loader } from "./Loader";
import { baseApi } from "@/services/api";
import { encrypt } from "@/utils/helpers";

export const PayWithCard = ({ setStatus, customerDetails }: { setStatus: Function; customerDetails: any }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEmbedded, setIsEmbedded] = useState(false);

    const getCardSessionId = async () => {
        setLoading(true);
        setError("");

        const credentials: any = {
            currency: customerDetails?.currency || "NGN",
            amount: customerDetails?.amount,
            email: customerDetails?.email,
            customerReference: customerDetails?.reference,
            // cancelURL: "http://localhost:8080",
            // redirectURL: "http://localhost:8080",
        };

        if (customerDetails?.description) {
            credentials.description = customerDetails?.description;
        }
        if (customerDetails?.showBillingAddress) {
            credentials.showBillingAddress = "YES";
        } else {
            credentials.showBillingAddress = "NO";
        }
        if (customerDetails?.showEmail) {
            credentials.showEmail = "YES";
        } else {
            credentials.showEmail = "NO";
        }

        try {
            const { data } = await baseApi.post(
                "/hosted-card/session",
                {
                    data: encrypt(JSON.stringify(credentials), customerDetails.publicKey),
                },
                { headers: { "x-public-key": customerDetails.publicKey } }
            );
            setIsEmbedded(true);
            window.Checkout.configure({
                session: {
                    id: data?.data?.sessionId,
                },
            });
            window.Checkout.showEmbeddedPage("#embed-target");
        } catch (err) {
            setError(err?.response?.data?.message || err?.message);
            setIsEmbedded(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCardSessionId();
    }, []);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="w-full flex flex-col items-center py-20 px-8 2xs:px-4">
                    <Loader />
                    <p className="text-[16px] text-black/80 text-center mt-3">Processing...</p>
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
                            setLoading(true);
                            setError("");
                            getCardSessionId();
                        }}
                    >
                        Retry
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="2xs:w-full rounded-[7px] overflow-hidden border-gray-200 border-[1px]">
            <div className="w-[445px]  2xs:w-full relative z-[100] max-h-[95vh] overflow-y-auto bg-white">
                <div className="w-full px-8 py-4 flex items-center justify-between border-line-gray border-b-[1px] 2xs:px-4">
                    <Image src="/img/providus-logo.png" alt="Providus Logo" width={82} height={40} />
                    <p className="text-[14px] uppercase text-primary-black font-medium">PROVIDUS CHECKOUT</p>
                </div>
                {renderContent()}
                <div id="embed-target" className={`${isEmbedded && "card__target"}`}></div>
            </div>
        </div>
    );
};