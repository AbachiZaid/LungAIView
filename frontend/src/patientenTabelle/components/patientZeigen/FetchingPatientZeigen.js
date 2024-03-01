import React, { useState, useEffect, useContext } from "react";
import PatientZeigen from "./PatientZeigen";
import { useRecoilValue } from "recoil";
import AuthContext from "../../../store/auth-context";
import { PatientIdState } from "../../../recoil/atom/PatientIdAtom";

const FetchingPatientZeigen = (props) => {
  const authCtx = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const patientId = useRecoilValue(PatientIdState);

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
      //   console.log(data.data.patient);
    })();
  }, [patientId]);
  return (
    <div>
      <PatientZeigen patients={patients} onClose={props.onClose} />
    </div>
  );
};

export default FetchingPatientZeigen;
