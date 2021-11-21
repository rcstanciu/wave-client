import React from "react";
import useWallet from "../../hooks/useWallet";
import MetamaskInstall from "../MetamaskInstall/MetamaskInstall";
import WaveInput from "../WaveInput/WaveInput";
import WavesList from "../WavesList/WavesList";

const Wave: React.FC = () => {
  const { hasMetamask } = useWallet();

  return (
    <div className="section has-text-light">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <p className="is-size-5 has-text-centered">
              let&apos;s get to know each other!
            </p>
            <p className="is-size-5 has-text-centered mt-4 mb-6">👋 say hi!</p>
            {hasMetamask ? (
              <>
                <WaveInput />
                <WavesList />
              </>
            ) : (
              <MetamaskInstall />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wave;
