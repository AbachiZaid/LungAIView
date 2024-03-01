import React, { useState, useEffect } from "react";
import styles from "./Gender.module.css";

const Gender = (props) => {
  const [progressData, setProgressData] = useState({
    männlich: 0,
    weiblich: 0,
    männlichProzent: 0,
    weiblichProzent: 0,
  });

  useEffect(() => {
    let männlich = 0;
    let weiblich = 0;

    props.geschlecht.map((geschl) => {
      if (geschl.geschlecht === "Männlich") {
        männlich += 1;
      } else if (geschl.geschlecht === "Weiblich") {
        weiblich += 1;
      }
    });

    const total = männlich + weiblich;
    const männlichProzent = (männlich / total) * 100;
    const weiblichProzent = (weiblich / total) * 100;

    setProgressData({
      männlich,
      weiblich,
      männlichProzent,
      weiblichProzent,
    });
  }, [props.geschlecht]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Geschlecht</div>
      <div className={styles.progressBarContainer}>
        <div className={styles.label}>Männlich</div>
        <div className={styles.progressBarBackground}>
          <div
            className={`${styles.progressBarFill} ${styles.blue}`}
            style={{ width: `${progressData.männlichProzent}%` }}
          ></div>
        </div>
        <div className={styles.value}>
          {Math.round(progressData.männlichProzent)}%
        </div>
      </div>

      <div className={styles.progressBarContainer}>
        <div className={styles.label}>Weiblich</div>
        <div className={styles.progressBarBackground}>
          <div
            className={`${styles.progressBarFill} ${styles.red}`}
            style={{ width: `${progressData.weiblichProzent}%` }}
          ></div>
        </div>
        <div className={styles.value}>
          {Math.round(progressData.weiblichProzent)}%
        </div>
      </div>
    </div>
  );
};

export default Gender;
