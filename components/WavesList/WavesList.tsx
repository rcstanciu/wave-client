import React from "react";
import useWaveContract from "../../hooks/useWaveContract";
import Link from "next/link";
import styles from "./WavesList.module.scss";

const WavesList = () => {
  const { totalWaves, waves } = useWaveContract();

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-two-thirds">
          <p className="is-size-7 has-text-grey has-text-centered mb-5">
            Total waves: {totalWaves.toString()}
          </p>
          {waves.map((item) => (
            <div key={item.transactionHash} className={styles.event}>
              <Link href="/" passHref>
                <a target="_blank" className={styles.address}>
                  <span className="is-size-7">{item.address}</span>
                </a>
              </Link>
              <p className="is-size-6 has-text-grey-lighter">{item.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WavesList;
