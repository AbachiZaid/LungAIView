import React from "react";
import { IoMdFemale } from "react-icons/io";
import { IoMdMale } from "react-icons/io";
import styles from "./Patient.module.css";

const Patient = (props) => {
  let status;
  // let geschlecht;
  // console.log(props.geschlecht);
  if (
    props.ergebnis &&
    props.ergebnis !== "Normal" &&
    props.ergebnis !== "ausstehend"
  ) {
    status = "Krank";
  } else if (
    props.ergebnis &&
    props.ergebnis !== "Normal" &&
    props.ergebnis === "ausstehend"
  ) {
    status = "Offen";
  } else if (props.ergebnis !== "ausstehend" && props.ergebnis === "Normal") {
    status = "Gesund";
  }

  return (
    <div className={styles.patientInfo}>
      <div className={styles.patientName}>
        <span>
          {props.name}
          <strong className={styles.logo}>
            {props.geschlecht === "Männlich" ? <IoMdMale /> : <IoMdFemale />}
          </strong>
        </span>
      </div>
      <div className={styles.krankheit}>
        <span>{props.ergebnis}</span>
      </div>
      <div className={styles.patientStatus}>
        <div className={styles.status}>
          <span>{status}</span>
        </div>
        <div className={styles.statusColor}>
          <div className={styles.color}></div>
          <div
            className={
              status === "Krank" && status !== "Offen" && status !== "Gesund"
                ? styles.colorRed
                : status !== "Krank" && status !== "Offen" && status == "Gesund"
                ? styles.colorGreen
                : styles.colorGelb
            }
          ></div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Patient;
