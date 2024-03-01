import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { FaSignInAlt } from "react-icons/fa";
import styles from "./Login.module.css";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:1200/api/v1/users/login", {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // const currentData = await data;
      console.log(data.data.user._id);
      if (!response.ok) {
        throw new Error(data.message || "Could not login.");
      }
      authCtx.login(data.token, data.data.user._id);
      // authCtx.id(data.data.user._id);
      setIsLoading(false);
      // navigate("/dashboard");
    } catch (erro) {
      setIsLoading(false);
      setError(erro.message);
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-header"]}>
        <FaSignInAlt className={styles["login-icon"]} />
        <div className={styles["login-title"]}>
          <h2>Anmelden</h2>
        </div>
      </div>
      {error && (
        <div className={styles["errors"]}>
          <div className={styles["error"]}>
            <h3>{error}</h3>
          </div>
        </div>
      )}
      <form onSubmit={submitHandler} className={styles["login-form"]}>
        <div className={styles["login"]}>
          <div>
            <label htmlFor="email">
              <input
                type="email"
                id="email"
                placeholder=" E-Mail-Adresse*"
                required
                onChange={emailHandler}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              <input
                type="password"
                id="password"
                placeholder="Passwort*"
                required
                onChange={passwordHandler}
              />
            </label>
          </div>
          <div className={styles["login-btn"]}>
            <button type="submit">Anmelden</button>
          </div>
          <div className={styles["forget-password"]}>
            <Link to="/registrieren">
              <h1>Hast du kein Konto?Anmelden</h1>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
