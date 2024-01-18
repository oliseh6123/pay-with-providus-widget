import React from "react";
import Image from "next/image";

import { handleIframeAction } from "@/utils/helpers";

export const PageLayout = ({
  children,
  resetDetailsFn,
}: {
  children: any;
  resetDetailsFn: (e?: any) => void;
}): JSX.Element => {
  return (
    <div
      className={`relative xs:px-2 2xs:px-4 top-0 left-0 z-[30] w-full h-screen flex justify-center items-center`}
    >
      <Image
        src="/icons/close-icon.svg"
        alt=""
        width={40}
        height={40}
        className="absolute z-[40] top-6 right-10 cursor-pointer rounded-full 2xs:top-4 2xs:right-4 2xs:w-[20px] 2xs:h-[20px]"
        onClick={() => {
          handleIframeAction("close");
          resetDetailsFn();
        }}
      />
      {children}
    </div>
  );
};
