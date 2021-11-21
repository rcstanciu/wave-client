import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletProvider } from "../hooks/useWallet";
import { WaveContractProvider } from "../hooks/useWaveContract";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletProvider>
      <WaveContractProvider>
        <Component {...pageProps} />
      </WaveContractProvider>
    </WalletProvider>
  );
}

export default MyApp;
