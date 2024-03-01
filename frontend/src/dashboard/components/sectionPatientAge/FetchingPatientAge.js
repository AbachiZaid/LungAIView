import React, { useState, useEffect } from "react";
import PatientAge from "./PatientAge";

const FetchingPatientAge = (props) => {
  const [geburtsdatum, setGeburtsdatum] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch("http://127.0.0.1:1200/api/v1/patient/alter");
      const data = await res.json();
      setGeburtsdatum(data.data.geburtsdatum);
      console.log(data.data.geburtsdatum);
    })();
  }, []);
  return (
    <div>
      <PatientAge geburtsdatum={geburtsdatum} />
    </div>
  );
};

export default FetchingPatientAge;
