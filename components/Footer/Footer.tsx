import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer has-background-dark has-text-grey-light">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half has-text-centered">
            <Link href="https://github.com/rcstanciu/wave-client" passHref>
              <a className={styles.socialLink} target="_blank">
                <FaGithub />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
