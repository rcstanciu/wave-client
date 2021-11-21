import React from "react";
import useWallet from "../../hooks/useWallet";
import mmLogo from "../../assets/mm-logo.svg";
import metamask from "../../assets/metamask.png";
import styles from "./MetamaskInstall.module.scss";
import Image from "next/image";
import Link from "next/link";

const MetamaskInstall = () => {
  return (
    <div className="has-text-centered mt-6 mb-6">
      <div className="columns is-centered is-vcentered">
        <div className="column is-narrow has-background">
          <Image src={metamask} alt="Metamask" height={50} width={50} />
        </div>
        <div className="column is-narrow">
          <Link href="https://metamask.io" passHref>
            <a target="_blank" className={styles.link}>
              <p>Install MetaMask</p>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MetamaskInstall;
