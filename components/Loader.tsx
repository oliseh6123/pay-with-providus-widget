import React from "react";

export const Loader = ({ className }: { className?: string }): JSX.Element => {
  return (
    <div
      className={`${
        className ? className : "w-10 h-10 border-primary-yellow"
      } loader__container`}
    />
  );
};
