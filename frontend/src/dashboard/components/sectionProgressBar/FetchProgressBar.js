import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

const FetchProgressBar = (props) => {
  const [ergebnisse, setErgebnisse] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await fetch(
        "http://127.0.0.1:1200/api/v1/patient/ergebinsse"
      );
      const data = await res.json();
      setErgebnisse(data.data.ergebnisse);
      console.log(data.data.ergebnisse);
    })();
  }, []);
  return (
    <div>
      <ProgressBar ergebnisse={ergebnisse} />
    </div>
  );
};

export default FetchProgressBar;
