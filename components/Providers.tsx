import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      {children}
      <ToastContainer />
    </Fragment>
  );
};
