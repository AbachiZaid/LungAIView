import React from "react";
import styles from "./TotalPatients.module.css"; // Import the CSS module
import Image from "./examination.png"; // Make sure to replace this with your actual image path

const TotalPatients = (props) => {
  return (
    <div className={styles.card}>
      <img
        src={Image}
        alt="Doctor with a stethoscope"
        className={styles.image}
      />
      <div className={styles.textContainer}>
        <div className={styles.title}>Total Patienten</div>
        <div className={styles.number}>{props.patients}</div>
      </div>
    </div>
  );
};

export default TotalPatients;
