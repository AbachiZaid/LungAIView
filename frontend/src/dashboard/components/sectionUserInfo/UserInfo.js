import React from "react";
import styles from "./UserInfo.module.css";

const UserInfo = (props) => {
  return (
    <div key={props.userInfo._id} className={styles.card}>
      <div className={styles.image}>
        <img src={`http://127.0.0.1:1200/${props.userInfo.image}`} />
      </div>
      <div className={styles.infos}>
        <div className={styles.username}>
          <span>{props.userInfo.username}</span>
        </div>
        <div className={styles.job}>
          <span>{props.userInfo.fach}</span>
        </div>
      </div>
    </div>
  );
};
export default UserInfo;
