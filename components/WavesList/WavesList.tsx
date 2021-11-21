import React from "react";
import useWaveContract from "../../hooks/useWaveContract";

const WavesList = () => {
  const { totalWaves } = useWaveContract();

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds has-text-centered">
          <p className="is-size-7 has-text-grey">Total waves: {totalWaves.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default WavesList;
