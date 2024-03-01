import React, { useState, useEffect } from "react";
import Gender from "./Gender";

const FetchGender = (props) => {
  const [geschlecht, setGeschlecht] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://127.0.0.1:1200/api/v1/patient/geschlecht"
      );
      const data = await res.json();
      setGeschlecht(data.data.geschlecht);
      console.log(data.data.geschlecht);
    })();
  }, []);
  return (
    <div>
      <Gender geschlecht={geschlecht} />
    </div>
  );
};

export default FetchGender;
