import type { AppProps } from "next/app";

import { Providers } from "@/components";

import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";

declare global {
  interface Window {
    Checkout: any;
    completeCallback: any;
  }
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
}
