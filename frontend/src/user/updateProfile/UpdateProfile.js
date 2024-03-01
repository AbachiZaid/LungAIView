import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../store/auth-context";
import { HiOutlineAcademicCap } from "react-icons/hi2";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdSystemUpdateAlt } from "react-icons/md";
import styles from "./UpdateProfile.module.css";
import UpdateMyPassword from "./UpdateMyPassword";

const UpdateProfile = (props) => {
  const authCtx = useContext(AuthContext);
  const [enteredName, setEnteredName] = useState(props.user?.username || "");
  const [enteredEmail, setEnteredEmail] = useState(props.user?.email || "");
  const [enteredFach, setEnteredFach] = useState(props.user?.fach || "");
  const [enteredImage, setEnteredImage] = useState("");
  const [updatePassword, setUpdatePassword] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(false);

  const imageInputRef = React.useRef();

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const emailHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const fachHandler = (event) => {
    setEnteredFach(event.target.value);
  };
  const updatePasswordHandler = (event) => {
    setUpdatePassword(true);
  };

  const imageHandler = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setEnteredImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("username", enteredName);
    formData.append("email", enteredEmail);
    formData.append("fach", enteredFach);
    if (enteredImage) {
      formData.append("image", enteredImage);
    }
    // formData.append("image", enteredImage);

    try {
      const response = await fetch(
        `http://127.0.0.1:1200/api/v1/users/${authCtx.id}`,
        {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization: "Bearer " + authCtx.token,
          },
        }
      );

      if (response.ok) {
        const updatedProfile = await response.json();
        console.log("Profil erfolgreich aktualisiert:", updatedProfile);
      } else {
        throw new Error("Profilaktualisierung fehlgeschlagen");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setEnteredName(props.user.username);
    setEnteredEmail(props.user.email);
    setEnteredFach(props.user.fach);
    setImagePreviewUrl(
      props.user.image ? `http://127.0.0.1:1200/${props.user.image}` : ""
    );
  }, [props.user]);

  const handleIconClick = () => {
    imageInputRef.current.click();
  };

  const closeHandler = () => {
    setUpdatePassword(false);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.card}>
        <div className={styles.title}>
          <span>Profile:{props.user.username}</span>
          <div className={styles.line} />
        </div>
        <div className={styles.userImage}>
          {imagePreviewUrl ? (
            <img src={imagePreviewUrl} alt="Vorschau" />
          ) : (
            <img src={enteredImage} alt="Vorschau" />
          )}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={imageHandler}
              style={{ display: "none" }}
              ref={imageInputRef}
            />
          </div>
          <div className={styles.updateImage}>
            <MdSystemUpdateAlt
              onClick={handleIconClick}
              className={styles.updateLogo}
            />
          </div>
        </div>
        <div className={styles.userInfo}>
          {/* ***************************** Username *****************************************             */}
          <div className={styles.user}>
            <div className={styles.label}>
              <FaRegUser />
              <label htmlFor="username">Username</label>
            </div>
            <div className={styles.username}>
              <input
                type="text"
                id="username"
                value={enteredName}
                onChange={nameHandler}
              />
            </div>
          </div>

          {/* ***************************** E-Mail *****************************************             */}
          <div className={styles.userEmail}>
            <div className={styles.label}>
              <MdOutlineAlternateEmail />
              <label htmlFor="email">E-Mail</label>
            </div>
            <div className={styles.email}>
              <input
                type="email"
                id="email"
                value={enteredEmail}
                onChange={emailHandler}
              />
            </div>
          </div>

          {/* ***************************** Fach *****************************************             */}
          <div className={styles.userFach}>
            <div className={styles.label}>
              <HiOutlineAcademicCap />
              <label htmlFor="fach">Fach</label>
            </div>
            <div className={styles.fach}>
              <input
                type="text"
                id="fach"
                value={enteredFach}
                onChange={fachHandler}
              />
            </div>
          </div>
          <div
            onClick={updatePasswordHandler}
            className={styles.updatePasswordButton}
          >
            <button>Update Password</button>
          </div>
          <div className={styles.submitButton}>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
      {/* ***************************** Update Password *****************************************             */}
      {updatePassword && (
        <div className={styles.updateMyPassword}>
          <UpdateMyPassword onClose={closeHandler} />
        </div>
      )}
    </div>
  );
};

export default UpdateProfile;
