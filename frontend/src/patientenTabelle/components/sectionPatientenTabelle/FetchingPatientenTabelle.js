import React, { useState, useEffect, useContext } from "react";
import PatientenTabelleList from "./PatientenTabelleList";
import AuthContext from "../../../store/auth-context";
import { useRecoilState } from "recoil";
import { patientenDatenState } from "../../../recoil/atom/PatientenDatenAtom";

const FetchingPatientenTabelle = (props) => {
  const [patients, setPatients] = useRecoilState(patientenDatenState);
  const authCtx = useContext(AuthContext);
  //   const [patients, setPatients] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://127.0.0.1:1200/api/v1/patient", {
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });
      const data = await res.json();
      setPatients(data.data.patient);
      console.log(data.data.patient);
    })();
  }, [authCtx.token, setPatients]);

  const patientDeletedHandler = (deletePatientId) => {
    const deletedItem = patients.filter(
      (patient) => patient._id !== deletePatientId
    );
    console.log(deletePatientId);
    return setPatients(deletedItem);
  };

  return (
    <div>
      <PatientenTabelleList
        patients={patients}
        onDeletePatient={patientDeletedHandler}
      />
    </div>
  );
};

export default FetchingPatientenTabelle;
