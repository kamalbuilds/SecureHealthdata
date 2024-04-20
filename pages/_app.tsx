import type { AppProps } from "next/app";
import {
  ThirdwebProvider,
  smartWallet,
  embeddedWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";
import "../styles/globals.css";
import { factoryAddress } from "../const";
import { Sepolia } from "@thirdweb-dev/chains";
import { SiteHeader } from "../components/site-header";
import { SignProtocolContextProvider } from "../context/SignProtocolContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
      activeChain={Sepolia}
      supportedWallets={[
        metamaskWallet(),

        smartWallet(embeddedWallet(), {
          factoryAddress: factoryAddress,
          gasless: true,
        }),
      ]}
    >
      <SignProtocolContextProvider>
        <SiteHeader />
        <Component {...pageProps} />
      </SignProtocolContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
