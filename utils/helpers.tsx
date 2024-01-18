import { toast } from "react-toastify";
import CryptoJS from "crypto-js";

const TOAST_STATUS = {
    success: {
        bg: "bg-white",
        title: "text-green-600",
        content: "text-black/75",
    },
    error: { bg: "bg-white", title: "text-red-600", content: "text-black-75" },
};

export const handleToast = ({
    id,
    status,
    title,
    content,
    className,
    divClass,
    titleClass,
    contentClass,
    position,
}: {
    id: string;
    status?: string;
    title?: string;
    content: any;
    className?: string;
    divClass?: string;
    titleClass?: string;
    contentClass?: string;
    position?: any;
}) =>
    toast(
        () => (
            <div className={`${divClass}`}>
                {!!title && <p className={`text-[16px] ${TOAST_STATUS[status]?.title || "text-black"} ${titleClass}`}>{title}</p>}
                {
                    <div
                        className={`text-[15px] ${TOAST_STATUS[status]?.content || "text-black/70"} ${
                            title ? "mt-2" : "mt-0"
                        } ${contentClass}`}
                    >
                        {content}
                    </div>
                }
            </div>
        ),
        {
            toastId: id,
            position: position || toast.POSITION.TOP_RIGHT,
            className: `${TOAST_STATUS[status]?.bg || "bg-white"} rounded-[5px] text-[16px] p-0 pt-1 pr-2 m-0 ${className}`,
            hideProgressBar: true,
            closeOnClick: false,
        }
    );

export const naira = <>&#8358;</>;

export const formatNumber = (text: string): string => {
    const dotted = text?.includes(".") ? true : false;

    if (dotted) {
        return Intl.NumberFormat("NGN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(Number(text));
    }

    return Intl.NumberFormat("NGN").format(Number(text));
};

export const handleInputValidation = (val: string) => {
    return {
        onlyNumber: /^[0-9]*$/.test(val) || /^-?\d+(\.\d{1,2})?$/.test(val) ? true : false,
        onlyAlphabet: /^[a-zA-Z]*$/.test(val) ? true : false,
        alphabetWithSpace: /^[a-zA-Z][a-zA-Z ]*$/.test(val) ? true : false,
    };
};

export const encrypt = (value: string, hash: string) => {
    const encrypted = CryptoJS.AES.encrypt(value, hash).toString();
    return encrypted;
};

export const handleIframeAction = (type: string) => {
    const url = window.location != window.parent.location ? document.referrer : document.location.href;
    console.log({
        windowLocation: window.location,
        windowParentLocation: window.parent.location,
        documentReferrer: document.referrer,
        documentLocationHref: document.location.href,
        url,
        windowTop: window.top,
    });
    window.parent.postMessage({ type }, url);
};

export const handleIframeSuccess = (type: string, reference) => {
    const url = document.location.href;
    console.log({
        windowLocation: window.location,
        windowParentLocation: window.parent.location,
        documentReferrer: document.referrer,
        documentLocationHref: document.location.href,
        url,
        windowTop: window.top,
    });
    window.parent.postMessage({ type, data: { reference } }, url);
};
