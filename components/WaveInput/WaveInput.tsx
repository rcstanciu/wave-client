import React, { useCallback, useState } from "react";
import styles from "./WaveInput.module.scss";
import useWaveContract from "../../hooks/useWaveContract";

const WaveInput = (): React.FC => {
  const [isSending, setIsSending] = useState(false);

  const { wave } = useWaveContract();

  const handleOnWave = useCallback(async () => {
    try {
      setIsSending(true);
      await wave();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSending(false);
    }
  }, [wave]);

  return (
    <div className={styles.container}>
      <div className="columns is-centered is-vcentered pl-4 pr-4 is-mobile">
        <div className="column">
          <input className="input" type="text" placeholder="Hello!" />
        </div>
        <div className="column is-narrow">
          <button
            className={`button is-inverted${isSending && " is-loading"}`}
            onClick={handleOnWave}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default WaveInput;
