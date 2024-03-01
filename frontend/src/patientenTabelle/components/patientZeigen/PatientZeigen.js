import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./PatientZeigen.module.css";

const PatientZeigen = (props) => {
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
  const alt = calculateAge(props.patients.geburtsdatum);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.patientInfo}>
          <div className={styles.close}>
            <button onClick={props.onClose}>
              <IoClose />
            </button>
          </div>
          <div className={styles.name}>
            <span className={styles.label}>Name</span>
            <span className={styles.info}>{props.patients.name}</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.alter}>
            <span className={styles.label}>Alter</span>
            <span className={styles.info}>{alt}</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.geschlecht}>
            <span className={styles.label}>Geschlecht</span>
            <span className={styles.info}>{props.patients.geschlecht}</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.ergebnis}>
            <span className={styles.label}>Befund</span>
            <span className={styles.info}>{props.patients.ergebnis}</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.vorerkrankungen}>
            <span className={styles.label}>Vorerkrankungen</span>
            <span className={styles.info}>
              {props.patients.vorerkrankungen}
            </span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.name}>
            <div className={styles.infoImage}>
              <img src={`http://127.0.0.1:1200/${props.patients.image}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientZeigen;
