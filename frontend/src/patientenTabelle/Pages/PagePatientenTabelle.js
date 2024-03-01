import React from "react";
import FetchingPatientenTabelle from "../components/sectionPatientenTabelle/FetchingPatientenTabelle";
import styles from "./PagePatientenTabelle.module.css";

const PagePatietenTabelle = () => {
  return (
    <div className={styles.background}>
      <FetchingPatientenTabelle />
    </div>
  );
};

export default PagePatietenTabelle;
