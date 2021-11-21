import React from "react";
import useWallet from "../../hooks/useWallet";
import MetamaskInstall from "../MetamaskInstall/MetamaskInstall";
import WaveInput from "../WaveInput/WaveInput";

const Wave: React.FC = () => {
  const { hasMetamask } = useWallet();


  return (
    <div className="section has-text-light">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <p className="is-size-5 has-text-centered">
              Let&apos;s get to know each other.
            </p>
            <p className="is-size-5 has-text-centered mt-4 mb-6">Say hi!</p>
            {hasMetamask ? <WaveInput /> : <MetamaskInstall />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wave;
