import React, { useState, useEffect } from "react";
import styles from "./PatientAge.module.css";

const PatientAge = (props) => {
  const [ageGroups, setAgeGroups] = useState({
    "20-35": 0,
    "35-50": 0,
    "50-65": 0,
    "65-80": 0,
  });

  useEffect(() => {
    const counts = {
      "20-35": 0,
      "35-50": 0,
      "50-65": 0,
      "65-80": 0,
    };

    props.geburtsdatum.forEach((person) => {
      const age = calculateAge(person.geburtsdatum);
      if (age >= 20 && age < 35) counts["20-35"]++;
      else if (age >= 35 && age < 50) counts["35-50"]++;
      else if (age >= 50 && age < 65) counts["50-65"]++;
      else if (age >= 65 && age <= 80) counts["65-80"]++;
    });

    const total = props.geburtsdatum.length;
    const percentages = Object.keys(counts).reduce((acc, key) => {
      acc[key] = (counts[key] / total) * 100;
      return acc;
    }, {});

    setAgeGroups(percentages);
  }, [props.geburtsdatum]);

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const ageGroupColors = {
    "20-35": "#D971FF",
    "35-50": "#71A2FF",
    "50-65": "#FFA871",
    "65-80": "#66DD6F",
  };

  return (
    <div className={styles.container}>
      <div className={styles.legend}>
        <div className={styles.legendTitle}>
          <span>Patientenalter</span>
        </div>
        {Object.entries(ageGroups).map(([ageRange, percentage], index) => (
          <div key={index} className={styles.legendItem}>
            <span
              className={styles.legendColor}
              style={{ backgroundColor: ageGroupColors[ageRange] }}
            ></span>
            <span>{ageRange}</span>
            <span className={styles.percentage}>{Math.round(percentage)}%</span>
          </div>
        ))}
      </div>

      <div className={styles.chartContainer}>
        {Object.entries(ageGroups).map(([ageRange, percentage], index) => (
          <div
            key={index}
            className={`${styles.circle} ${styles["circle" + (index + 1)]}`}
            style={{
              backgroundImage: `conic-gradient(${ageGroupColors[ageRange]} 0% ${percentage}%, transparent ${percentage}% 100%)`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PatientAge;
