import React, { Fragment, useState, useContext } from "react";
import { useRecoilState } from "recoil";
import { PatientIdState } from "../../../recoil/atom/PatientIdAtom";
import styles from "./PatientenTabelle.module.css";
import FetchingPatientZeigen from "../patientZeigen/FetchingPatientZeigen";
import FetchingPatientUpdate from "../patietenUpdate/FetchingPatientUpdate";
import { BiShowAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AuthContext from "../../../store/auth-context";

const PatientenTabelle = (props) => {
  const authCtx = useContext(AuthContext);
  const [patientId, setPatientId] = useRecoilState(PatientIdState);
  const [patientDetails, setPatientDetails] = useState(false);
  const [patientUpdate, setPatientUpdate] = useState(false);

  const closePatientDetails = () => {
    setPatientDetails(false);
  };
  const closePatientUpdate = () => {
    setPatientUpdate(false);
  };
  const PatientUpdate = () => {
    setPatientUpdate(false);
  };

  const patientDetailsHandler = async () => {
    setPatientId(props.id);
    setPatientDetails(true);
  };
  const patientUpdateHandler = async () => {
    setPatientId(props.id);
    setPatientUpdate(true);
  };

  const deletePatientHandler = async () => {
    const response = await fetch(
      `http://127.0.0.1:1200/api/v1/patient/${props.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      }
    );

    const data = await response;
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message || "Could not delete a comment.");
    }

    props.onDeletePatient(props.id);
  };

  return (
    <Fragment>
      {patientDetails && (
        <FetchingPatientZeigen onClose={closePatientDetails} />
      )}

      {patientUpdate && (
        <FetchingPatientUpdate
          onClose={closePatientUpdate}
          onUpdate={PatientUpdate}
        />
      )}

      <tr>
        <td>{props.name}</td>
        <td>{props.geburtsdatum}</td>
        <td>{props.geschlecht}</td>
        <td>{props.ergebnis}</td>
        <td>{props.vorerkrankungen}</td>
        <td className={styles.cellActions}>
          <span className={styles.iconShow} onClick={patientDetailsHandler}>
            <BiShowAlt />
          </span>
          <span className={styles.iconUpdate} onClick={patientUpdateHandler}>
            <CiEdit />
          </span>
          <span className={styles.iconDelete} onClick={deletePatientHandler}>
            <MdDeleteOutline />
          </span>
        </td>
      </tr>
    </Fragment>
  );
};

export default PatientenTabelle;
