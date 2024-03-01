import React, { useState, useEffect } from "react";
import PatientenTabelle from "./PatientenTabelle";
import styles from "./PatientenTabelle.module.css";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IoClose } from "react-icons/io5";

const PatientenTabelleList = (props) => {
  const [patientenSort, setPatietenSort] = useState([]);
  const [enteredFindPatient, setEnteredFindPatient] = useState();
  const [searchQuery, setSearchQuery] = useState();
  const [selectedNormal, setSelectedNormal] = useState(false);
  const [selectedNichtNormal, setSelectedNichtNormal] = useState(false);
  const [closeNormal, setCloseNormal] = useState(false);
  const [closeNichtNormal, setCloseNichtNormal] = useState(false);
  const patienten = props.patients;

  useEffect(() => {
    if (searchQuery) {
      setPatietenSort(findPatienten);
    } else {
      setPatietenSort(patienten);
    }
  }, [searchQuery, patienten]);

  const closeNormalHandler = () => {
    setCloseNormal(false);
    setPatietenSort(patienten);
    setSelectedNormal(false);
  };
  const closeNichtNormalHandler = () => {
    setCloseNichtNormal(false);
    setPatietenSort(patienten);
    setSelectedNichtNormal(false);
  };

  const normalePatienten = patienten.filter(
    (patient) => patient.ergebnis === "Normal"
  );

  const nichtNormalePatienten = patienten.filter(
    (patient) => patient.ergebnis === "Nicht_Normal"
  );

  const findPatienten = patienten.filter((patient) =>
    patient.name.toLowerCase().startsWith(searchQuery?.toLowerCase())
  );

  const searchHandler = () => {
    setPatietenSort(patienten);
    setCloseNichtNormal(false);
    setSelectedNichtNormal(false);
    setCloseNormal(false);
    setSelectedNormal(false);
  };

  const findPatientHandler = (event) => {
    setEnteredFindPatient(event.target.value);
    setSearchQuery(event.target.value);
    setCloseNichtNormal(false);
    setSelectedNichtNormal(false);
    setCloseNormal(false);
    setSelectedNormal(false);
  };

  const normalePatientenHandler = () => {
    setPatietenSort(normalePatienten);
    setCloseNormal(true);
    setCloseNichtNormal(false);
    setSelectedNichtNormal(false);

    setSelectedNormal(true);
  };

  const nichtNormalePatientenHandler = () => {
    setPatietenSort(nichtNormalePatienten);
    setCloseNichtNormal(true);
    setCloseNormal(false);
    setSelectedNormal(false);

    setSelectedNichtNormal(true);
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

  return (
    <div className={styles.section}>
      <div className={styles.sort}>
        <form className={styles.search}>
          <div className={styles["search-container"]}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
            <input
              type="text"
              onClick={searchHandler}
              placeholder="Suche..."
              value={enteredFindPatient}
              onChange={findPatientHandler}
              className={styles.searchInput}
            />
          </div>
        </form>

        <div
          className={`${styles.normalePatienten} ${
            selectedNormal ? styles.selected : ""
          }`}
        >
          <button onClick={normalePatientenHandler}>Gesunde Patienten</button>
          <div
            onClick={closeNormalHandler}
            className={`${styles.closeNormal} ${
              !closeNormal ? styles.closed : ""
            }`}
          >
            <IoClose />
          </div>
        </div>

        <div
          className={`${styles.nichtNormalePatienten} ${
            selectedNichtNormal ? styles.selected : ""
          }`}
        >
          <button onClick={nichtNormalePatientenHandler}>
            Kranke Patienten
          </button>
          <div
            onClick={closeNichtNormalHandler}
            className={`${styles.closeNNormal} ${
              !closeNichtNormal ? styles.closed : ""
            }`}
          >
            <IoClose />
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.patientenTabelle}>
          <table className={styles.tabelle}>
            <tr>
              <th>Name</th>
              <th>Alter</th>
              <th>Geschlecht</th>
              <th>Befund</th>
              <th>Vorerkrankungen</th>
              <th>Aktion</th>
            </tr>
            {patientenSort.map((patient) => {
              const age = calculateAge(patient.geburtsdatum);
              return (
                <PatientenTabelle
                  onDeletePatient={props.onDeletePatient}
                  id={patient._id}
                  key={patient._id}
                  name={patient.name}
                  geschlecht={patient.geschlecht}
                  geburtsdatum={age}
                  ergebnis={patient.ergebnis}
                  vorerkrankungen={patient.vorerkrankungen}
                />
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientenTabelleList;
