import React from "react";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { MdSystemUpdateAlt } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import styles from "./Profile.module.css";
import { NavLink } from "react-router-dom";

const Profile = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>
          <span>Profile:{props.user.username}</span>
          <div className={styles.line} />
        </div>
        <div className={styles.update}>
          <NavLink to="/update-profile">
            <button>Bearbeiten</button>
          </NavLink>
        </div>
        <div className={styles.userImage}>
          <img src={`http://127.0.0.1:1200/${props.user.image}`} />
        </div>
        <div className={styles.userInfo}>
          {/* ***************************** Username *****************************************             */}
          <div className={styles.user}>
            <div className={styles.label}>
              <FaRegUser />
              <span>Username</span>
            </div>
            <div className={styles.username}>
              <span>{props.user.username}</span>
            </div>
          </div>

          {/* ***************************** E-Mail *****************************************             */}
          <div className={styles.userEmail}>
            <div className={styles.label}>
              <MdOutlineAlternateEmail />
              <span>E-Mail</span>
            </div>
            <div className={styles.email}>
              <span>{props.user.email}</span>
            </div>
          </div>

          {/* ***************************** Fach *****************************************             */}
          <div className={styles.userFach}>
            <div className={styles.label}>
              <HiOutlineAcademicCap />
              <span>Fach</span>
            </div>
            <div className={styles.fach}>
              <span>{props.user.fach}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
