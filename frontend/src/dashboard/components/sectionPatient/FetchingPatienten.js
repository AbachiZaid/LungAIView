import React, { useState, useEffect } from "react";
import PatientList from "./PatientList";

const FetchingPatienten = (props) => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://127.0.0.1:1200/api/v1/patient/recent-patient"
      );
      const data = await res.json();
      setPatients(data.data.patient);
      console.log(data.data.patient);
    })();
  }, []);
  return (
    <div>
      <PatientList patients={patients} />
    </div>
  );
};

export default FetchingPatienten;
