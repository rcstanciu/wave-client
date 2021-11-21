import React, { useCallback, useState } from "react";
import styles from "./WaveInput.module.scss";
import useWaveContract from "../../hooks/useWaveContract";
import useWallet from "../../hooks/useWallet";

const WaveInput = (): React.FC => {
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string>("");

  const { wave } = useWaveContract();
  const { currentAccount } = useWallet();

  const handleOnWave = useCallback(
    async (e) => {
      e.preventDefault();

      if (!message.length) {
        return;
      }

      try {
        setIsSending(true);
        await wave(message);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSending(false);
        setMessage("");
      }
    },
    [wave, message]
  );

  return (
    <div className={styles.container}>
      <form>
        <div className="columns is-centered is-vcentered pl-4 pr-4 is-mobile">
          <div className="column">
            <input
              className="input"
              type="text"
              placeholder="hello!"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="column is-narrow">
            <button
              className={`button is-inverted${isSending && " is-loading"}`}
              onClick={handleOnWave}
              disabled={!message.length || !currentAccount}
              type="submit"
            >
              send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WaveInput;
