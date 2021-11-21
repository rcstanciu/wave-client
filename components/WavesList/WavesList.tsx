import React, { useState, useCallback } from "react";
import useWaveContract from "../../hooks/useWaveContract";
import Link from "next/link";
import styles from "./WavesList.module.scss";

const WavesList = () => {
  const { totalWaves, waves } = useWaveContract();
  const [numberOfVisibleWaves, setNumberOfVisileWaves] = useState(10);

  const visibleWaves = waves.slice(0, numberOfVisibleWaves);

  const handleViewMore = useCallback(() => {
    setNumberOfVisileWaves(numberOfVisibleWaves + 10);
  }, [numberOfVisibleWaves]);

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds has-text-centered">
          <p className="is-size-7 has-text-grey mb-5">
            total waves: {totalWaves.toString()}
          </p>
          {visibleWaves.map((item) => (
            <div key={item.transactionHash} className={styles.event}>
              <Link
                href={`https://rinkeby.etherscan.io/address/${item.address}`}
                passHref
              >
                <a target="_blank" className={styles.address}>
                  <span className="is-size-7">from {item.address}</span>
                </a>
              </Link>
              <p className="is-size-6 has-text-grey-lighter">{item.message}</p>
            </div>
          ))}
          {numberOfVisibleWaves < waves.length && (
            <div className={styles.viewMore}>
              <p className="is-size-7 has-text-grey" onClick={handleViewMore}>
                view more
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WavesList;
