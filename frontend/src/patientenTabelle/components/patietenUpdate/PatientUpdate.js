import { useState, useContext, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
import AuthContext from "../../../store/auth-context";
import styles from "./PatientUpdate.module.css";
import { IoClose } from "react-icons/io5";
import { PatientIdState } from "../../../recoil/atom/PatientIdAtom";
import { patientenDatenState } from "../../../recoil/atom/PatientenDatenAtom";

const PatientUpdate = (props) => {
  const authCtx = useContext(AuthContext);
  const patientId = useRecoilValue(PatientIdState);
  const setPatients = useSetRecoilState(patientenDatenState);
  const [enteredName, setEnteredName] = useState(props.patients?.name || "");
  const [enteredAlter, setEnteredAlter] = useState(props.patients?.alter || "");
  const [enteredGeschlecht, setEnteredGeschlecht] = useState(
    props.patients?.geschlecht || ""
  );
  const [enteredBefund, setEnteredBefund] = useState(
    props.patients?.ergebnis || ""
  );
  const [enteredVorerkrankungen, setEnteredVorerkrankungen] = useState(
    props.patients?.vorerkrankungen || ""
  );
  const nameHandler = (event) => {
    // console.log(enteredName);
    setEnteredName(event.target.value);
  };
  const alterHandler = (event) => {
    setEnteredAlter(event.target.value);
  };
  const geschlechtHandler = (event) => {
    setEnteredGeschlecht(event.target.value);
  };
  const befundHandler = (event) => {
    setEnteredBefund(event.target.value);
  };
  const vorerkrankungenHandler = (event) => {
    setEnteredVorerkrankungen(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("geburtsdatum", enteredAlter);
    formData.append("geschlecht", enteredGeschlecht);
    formData.append("ergebnis", enteredBefund);
    formData.append("vorerkrankungen", enteredVorerkrankungen);

    try {
      const response = await fetch(
        `http://127.0.0.1:1200/api/v1/patient/${patientId}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );

      const updatedPatient = await response.json();
      console.log(updatedPatient);
      const updatedPatientData = updatedPatient.data.patient;
      // Aktualisieren des Recoil-Zustands
      setPatients((prevPatients) =>
        prevPatients.map((p) =>
          p._id === updatedPatientData._id ? { ...p, ...updatedPatientData } : p
        )
      );

      props.onClose();
    } catch (erro) {}
  };
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

  useEffect(() => {
    setEnteredName(props.patients.name);
    setEnteredAlter(props.patients.geburtsdatum);
    setEnteredGeschlecht(props.patients.geschlecht);
    setEnteredBefund(props.patients.ergebnis);
    setEnteredVorerkrankungen(props.patients.vorerkrankungen);
  }, [props.patients]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={submitHandler} className={styles.patientInfo}>
          <div className={styles.close}>
            <button onClick={props.onClose}>
              <IoClose />
            </button>
          </div>
          <div className={styles.name}>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={enteredName}
              onChange={nameHandler}
              className={styles.info}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.alter}>
            <label className={styles.label} htmlFor="alter">
              Alter
            </label>
            <input
              type="date"
              id="alter"
              value={enteredAlter}
              onChange={alterHandler}
              className={styles.info}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.geschlecht}>
            <label className={styles.label} htmlFor="geschlecht">
              Geschlecht
            </label>
            <input
              type="text"
              id="geschlecht"
              value={enteredGeschlecht}
              onChange={geschlechtHandler}
              className={styles.info}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.ergebnis}>
            <label className={styles.label} htmlFor="befund">
              Befund
            </label>
            <input
              type="text"
              id="befund"
              value={enteredBefund}
              onChange={befundHandler}
              className={styles.info}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.vorerkrankungen}>
            <label className={styles.label} htmlFor="vorerkrankungen">
              Vorerkrankungen
            </label>
            <input
              type="text"
              id="vorerkrankungen"
              value={enteredVorerkrankungen}
              onChange={vorerkrankungenHandler}
              className={styles.info}
            />
            <div className={styles.line}></div>
          </div>
          <div className={styles.name}>
            <div className={styles.infoImage}>
              <img src={`http://127.0.0.1:1200/${props.patients.image}`} />
            </div>
          </div>
          <div className={styles.updateButton}>
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientUpdate;
