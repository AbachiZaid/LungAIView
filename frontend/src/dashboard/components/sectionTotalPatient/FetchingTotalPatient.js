import React, { useState, useEffect } from "react";
import TotalPatient from "./TotalPatient";

const FetchingTotalPatient = (props) => {
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://127.0.0.1:1200/api/v1/patient/total-patients"
      );
      const data = await res.json();
      setPatients(data.data.patients);
      console.log(data.data.patients);
    })();
  }, []);
  return (
    <div>
      <TotalPatient patients={patients} />
    </div>
  );
};

export default FetchingTotalPatient;
