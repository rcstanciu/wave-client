import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="section has-text-grey-light">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <Link href="https://github.com/rcstanciu/wave-client" passHref>
              <a className={styles.socialLink}>
                <FaGithub />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
