import React from "react";
import styles from "./WaveInput.module.scss";

const WaveInput = (): React.FC => {
  return (
    <div className={styles.container}>
      <div className="columns is-centered is-vcentered pl-4 pr-4 is-mobile">
        <div className="column">
          <input className="input" type="text" placeholder="Hello!" />
        </div>
        <div className="column is-narrow">
          <button className="button is-inverted">Send</button>
        </div>
      </div>
    </div>
  );
};

export default WaveInput;
