import React, { useState, useEffect, useContext } from "react";
import PatientUpdate from "./PatientUpdate";
import { useRecoilValue, useRecoilState } from "recoil";
import AuthContext from "../../../store/auth-context";
import { PatientIdState } from "../../../recoil/atom/PatientIdAtom";

const FetchingPatientUpdate = (props) => {
  const authCtx = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const patientId = useRecoilValue(PatientIdState);

  console.log(patientId);
  useEffect(() => {
    if (!patientId) return;
    (async () => {
      const res = await fetch(
        `http://127.0.0.1:1200/api/v1/patient/${patientId}`,
        {
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const data = await res.json();
      setPatients(data.data.patient);
      console.log(data.data.patient);
    })();
  }, [patientId, authCtx.token]);
  return (
    <div>
      <PatientUpdate
        patients={patients}
        onClose={props.onClose}
        onClick={props.onUpdate}
      />
    </div>
  );
};

export default FetchingPatientUpdate;
