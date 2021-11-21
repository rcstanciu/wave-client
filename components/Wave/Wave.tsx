import React from "react";
import useWallet from "../../hooks/useWallet";
import MetamaskInstall from "../MetamaskInstall/MetamaskInstall";

const Wave: React.FC = () => {
  const { hasMetamask } = useWallet();

  return (
    <div className="section has-text-light">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <p className="is-size-5 has-text-centered">
              Let&apos;s get to know each other.
            </p>
            <p className="is-size-5 has-text-centered mt-4">Say hi!</p>
            <MetamaskInstall />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wave;
