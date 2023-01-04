import React from "react";
import styles from "./Footer.module.scss";
const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy;{year} All Rights Reserved!
      <div style={{ marginLeft: "30px" }}>
        WirtuTech Software Solutions/+251 9 10 15 8781 / +256 759 229 296
      </div>
    </div>
  );
};

export default Footer;
