import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { MdPassword } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import styles from "./UpdateMyPassword.module.css";
import { useNavigate } from "react-router-dom";

const UpdateMyPassword = (props) => {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [enteredCurrentPassword, setEnteredCurrentPassword] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");

  const currentPasswordHandle = (event) => {
    setEnteredCurrentPassword(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordConfirmHandle = (event) => {
    setEnteredPasswordConfirm(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const userData = {
      passwordCurrent: enteredCurrentPassword,
      password: enteredPassword,
      passwordConfirm: enteredPasswordConfirm,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:1200/api/v1/users/updateMyPassword",
        {
          method: "PATCH",
          body: JSON.stringify(userData),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Could not Update the Password.");
      }

      authCtx.logout();
      navigate("/login");
    } catch (erro) {
      console.error("Error during password update:", erro);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.card}>
        <div className={styles.close}>
          <IoCloseCircleOutline onClick={props.onClose} />
        </div>
        <div className={styles["login-header"]}>
          <MdPassword className={styles["login-icon"]} />
          <div className={styles["login-title"]}>
            <h2>Password Update</h2>
          </div>
        </div>

        <form onSubmit={submitHandler} className={styles["login-form"]}>
          <div className={styles["login"]}>
            <div>
              <div>
                <label htmlFor="currentPassword">
                  <input
                    type="password"
                    id="currentPassword"
                    placeholder="Current password*"
                    required
                    onChange={currentPasswordHandle}
                  />
                </label>
              </div>
              <div>
                <label htmlFor="password">
                  <input
                    type="password"
                    id="password"
                    placeholder="New password*"
                    required
                    onChange={passwordHandler}
                  />
                </label>
              </div>
              <label htmlFor="passwordConfirm">
                <input
                  type="password"
                  id="passwordConfirm"
                  placeholder="New passowrd Comfirm*"
                  required
                  onChange={passwordConfirmHandle}
                />
              </label>
            </div>
            <div className={styles["login-btn"]}>
              <button className={styles.button} type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateMyPassword;
