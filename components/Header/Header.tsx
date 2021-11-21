import React, { useCallback } from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./Header.module.scss";
import Link from "next/link";
import useWallet from "../../hooks/useWallet";
import shorten from "../../utils/shorten";

const Header = (): React.FC => {
  const { hasMetamask, connectWallet, isConnected, currentAccount } =
    useWallet();

  const handleOnConnect = useCallback(() => {
    if (isConnected) {
      return;
    }

    connectWallet();
  }, [isConnected, connectWallet]);

  if (!hasMetamask) {
    return null;
  }

  return (
    <nav className="level has-text-grey-light pt-4 pl-6 pr-6 mb-0">
      <div className="level-left"></div>
      <div className="level-right">
        <div className={styles.button} onClick={handleOnConnect}>
          <span className="is-size-6">
            {currentAccount ? shorten(currentAccount) : "Connect wallet"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
