import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import styles from "./Konto.module.css";
import { NavLink } from "react-router-dom";

const Konto = (props) => {
  const navigate = useNavigate();
  const [list, setList] = useState(false);
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  const listHandler = () => {
    list ? setList(false) : setList(true);
  };

  const kontoHandler = () => {
    setList(false);
  };
  const profileHandler = () => {
    setList(false);
  };

  return (
    <div className={styles.container}>
      <div key={props.user._id} className={styles.cards}>
        <div className={styles.userImage}>
          <img src={`http://127.0.0.1:1200/${props.user.image}`} />
        </div>
        <div className={styles.info}>
          <div className={styles.name}>
            <span>{props.user.username}</span>
          </div>
          <div className={styles.jobs}>
            <span>{props.user.fach}</span>
          </div>
          <div className={styles.listButton}>
            <h1 onClick={listHandler}>
              {!list ? <CgChevronDown /> : <CgChevronUp />}
            </h1>
          </div>
        </div>
      </div>
      {list && (
        <div className={styles.dropDownList}>
          <ul className={styles.list}>
            <NavLink to="/profile">
              <li onClick={profileHandler}>profile</li>
            </NavLink>
            <NavLink to="update-profile">
              <li onClick={kontoHandler}>Konto</li>
            </NavLink>
            <button onClick={logoutHandler}>Logout</button>
          </ul>
        </div>
      )}
    </div>
  );
};
export default Konto;
