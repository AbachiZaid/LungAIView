import React from "react";
import BildAnalyse from "../components/bildAnalyse/BildAnalyse";
import styles from "./PageBildAnalyse.module.css";
import Nav from "../../navBar/nav/Nav";

const PageBildAnalyse = (props) => {
  return (
    <div className={styles.backgrund}>
      <BildAnalyse />
    </div>
  );
};

export default PageBildAnalyse;
