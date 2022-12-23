import React from "react";
import styles from "./DashCard.module.scss";

const DashCard = ({ title, data, desc }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        <h1>{title} </h1>
      </div>
      <div className={styles.cardBody}>
        <img src={require("../../assets/book.gif")}></img>
      </div>
      <div className={styles.disp}>
        <p>{data}</p>
        <h2>{desc}</h2>
      </div>
    </div>
  );
};

export default DashCard;
