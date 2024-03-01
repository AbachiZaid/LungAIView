import React, { useState, useEffect } from "react";
import styles from "./ProgressBar.module.css";

const ProgressBar = (props) => {
  const [progressData, setProgressData] = useState({
    gesund: 0,
    krank: 0,
    ausstehend: 0,
    gesundProzent: 0,
    krankProzent: 0,
    ausstehendProzent: 0,
  });

  useEffect(() => {
    let gesund = 0;
    let krank = 0;
    let ausstehend = 2;

    props.ergebnisse.map((ergebnis) => {
      if (ergebnis.ergebnis === "Normal") {
        gesund += 1;
      } else if (ergebnis.ergebnis === "ausstehend") {
        ausstehend += 1;
      } else {
        krank += 1;
      }
    });

    const total = gesund + krank + ausstehend;
    const gesundProzent = (gesund / total) * 100;
    const krankProzent = (krank / total) * 100;
    const ausstehendProzent = (ausstehend / total) * 100;

    console.log(total);
    console.log(krank);
    console.log(gesund);
    console.log(ausstehend);
    console.log(gesundProzent);
    console.log(krankProzent);
    console.log(ausstehendProzent);

    setProgressData({
      gesund,
      krank,
      ausstehend,
      gesundProzent,
      krankProzent,
      ausstehendProzent,
    });
  }, [props.ergebnisse]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Patientenstatus</div>
      <div className={styles.progressBarContainer}>
        <div className={styles.label}>Gesunde Lunge</div>
        <div className={styles.progressBarBackground}>
          <div
            className={`${styles.progressBarFill} ${styles.green}`}
            style={{ width: `${progressData.gesundProzent}%` }}
          ></div>
        </div>
        <div className={styles.value}>
          {Math.round(progressData.gesundProzent)}%
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.label}>Kranke Lunge</div>
        <div className={styles.progressBarBackground}>
          <div
            className={`${styles.progressBarFill} ${styles.red}`}
            style={{ width: `${progressData.krankProzent}%` }}
          ></div>
        </div>
        <div className={styles.value}>
          {Math.round(progressData.krankProzent)}%
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.label}>ausstehend</div>
        <div className={styles.progressBarBackground}>
          <div
            className={`${styles.progressBarFill} ${styles.orange}`}
            style={{ width: `${progressData.ausstehendProzent}%` }}
          ></div>
        </div>
        <div className={styles.value}>
          {Math.round(progressData.ausstehendProzent)}%
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
