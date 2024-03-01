import React from "react";
import Patient from "./Patient";
import styles from "./Patient.module.css";

const PatientList = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle}>
        <span>Patienten</span>
      </div>
      <div className={styles.datum}>
        <span>Diese Woche</span>
      </div>
      <div className={styles.patientInfo}>
        {props.patients.map((patient) => (
          <Patient
            key={patient._id}
            name={patient.name}
            ergebnis={patient.ergebnis}
            status={patient.status}
            geschlecht={patient.geschlecht}
          />
        ))}
      </div>
    </div>
  );
};

export default PatientList;
