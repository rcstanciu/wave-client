import React from "react";
import { FaGithub } from "react-icons/fa";
import styles from "./Footer.module.scss";
import Link from "next/link";

const Footer = (): React.FC => {
  return (
    <footer className="footer has-background-dark has-text-grey-light mt-6">
      <div className="container mt-6">
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
