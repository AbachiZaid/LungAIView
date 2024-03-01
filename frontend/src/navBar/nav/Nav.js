import styles from "./Nav.module.css";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import FetchingKonto from "../konto/FetchingKonto";

const Nav = (props) => {
  return (
    <div className={styles.navBar}>
      <nav>
        <ul className={styles.logo}>
          <li>LungAIView</li>
        </ul>
        <ul className={styles.dashboard}>
          <li>
            <NavLink
              style={{ color: "#71a2ff", textDecoration: "none" }}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
        </ul>
        <ul className={styles.patienten}>
          <li>
            <NavLink
              style={{ color: "#71a2ff", textDecoration: "none" }}
              to="/patienten"
            >
              Patienten
            </NavLink>
          </li>
        </ul>
        <ul className={styles.bildanalyse}>
          <li>
            <NavLink
              style={{ color: "#71a2ff", textDecoration: "none" }}
              to="/bild-analyse"
            >
              Bildanalyse
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.search}>
        <div className={styles.konto}>
          <FetchingKonto />
        </div>
      </div>
      <div className={styles.line}>
        <div></div>
      </div>
    </div>
  );
};

export default Nav;
