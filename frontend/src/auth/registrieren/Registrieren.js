// import React from "react";
import { useState } from "react";
import { Link, useNavigation } from "react-router-dom";
import styles from "./Registrieren.module.css";
import { SiGnuprivacyguard } from "react-icons/si";
import ClipLoader from "react-spinners/ClipLoader";

const Registrieren = () => {
  //   const navigation = useNavigation();
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredFach, setEnteredFach] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredPasswordConfirm, setEnteredPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const usernameHandler = (event) => {
    setEnteredUsername(event.target.value);
  };
  const fachHandler = (event) => {
    setEnteredFach(event.target.value);
  };

  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const passwordConfirmHandler = (event) => {
    setEnteredPasswordConfirm(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:1200/api/v1/users/signup",
        {
          method: "POST",
          body: JSON.stringify({
            username: enteredUsername,
            fach: enteredFach,
            email: enteredEmail,
            password: enteredPassword,
            passwordConfirm: enteredPasswordConfirm,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      // const currentData = await data;
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Could not Register.");
      }
      setIsLoading(false);
      //   navigation.replace("/login");
    } catch (erro) {
      setIsLoading(false);
      setError(erro.message);
    }
  };

  if (isLoading) {
    return (
      <div className={styles["loader-container"]}>
        <ClipLoader color={"#fff"} size={150} />
      </div>
    );
  }

  return (
    <section className={styles.registrieren}>
      <div className={styles["singup-header"]}>
        <SiGnuprivacyguard className={styles["singup-icon"]} />
        <div className={styles["singup-title"]}>
          <h2>Registrieren</h2>
        </div>
      </div>

      {error && (
        <div className={styles["errors"]}>
          <div className={styles["error"]}>
            <h3>{error}</h3>
          </div>
        </div>
      )}

      <form onSubmit={submitHandler} className={styles["singup-form"]}>
        <div className={styles["singup"]}>
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              placeholder="Username*"
              required
              onChange={usernameHandler}
            />
          </label>
          <label htmlFor="fach">
            <input
              type="text"
              id="fach"
              placeholder="Fach*"
              required
              onChange={fachHandler}
            />
          </label>
        </div>

        <div className={styles["singup"]}>
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="Email*"
            required
            onChange={emailHandler}
          />
        </div>
        <div className={styles["singup"]}>
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="password*"
            required
            onChange={passwordHandler}
          />
        </div>
        <div className={styles["singup"]}>
          <label htmlFor="passwordConfirm"></label>
          <input
            type="password"
            id="passwordConfirm"
            placeholder="Password Confirm*"
            required
            onChange={passwordConfirmHandler}
          />
        </div>
        <div className={styles["singup-btn"]}>
          <button type="submit">Registrieren</button>
        </div>
        <div className={styles["forget-password"]}>
          <Link to="/login">
            <h1>Haben Sie bereits ein Konto?</h1>
          </Link>
        </div>
      </form>
    </section>
  );
};

export default Registrieren;
