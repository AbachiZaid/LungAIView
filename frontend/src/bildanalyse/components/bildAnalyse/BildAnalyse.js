import React, { useState, useContext } from "react";
import styles from "./BildAnalyse.module.css";
import AuthContext from "../../../store/auth-context";
import moment from "moment";
import { Link } from "react-router-dom";

const BildAnalyse = (props) => {
  const authCtx = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStep, setCurrentStep] = useState("upload");
  const [enteredName, setEnteredName] = useState("");
  const [enteredGeburtsdatum, setEnteredGeburtsdatum] = useState("");
  const [enteredGeschlecht, setEnteredGeschlecht] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [enteredBefund, setEnteredBefund] = useState("");
  const [patient, setPatient] = useState("");
  const [enteredVorerkrankungen, setEnteredVorerkrankungen] = useState("");

  const nameHandler = (event) => {
    setEnteredName(event.target.value);
  };
  const geburtsdatumHandler = (event) => {
    setEnteredGeburtsdatum(event.target.value);
  };
  const geschlechtHandler = (event) => {
    setEnteredGeschlecht(event.target.value);
  };
  const vorerkrankungenHandler = (event) => {
    setEnteredVorerkrankungen(event.target.value);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const previewUrl = URL.createObjectURL(file);
      setImagePreviewUrl(previewUrl);

      setCurrentStep("review");
    }
  };

  const handleSendForAnalysis = () => {
    setCurrentStep("details");
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", enteredName);
    formData.append("geburtsdatum", enteredGeburtsdatum);
    formData.append("geschlecht", enteredGeschlecht);
    formData.append("image", selectedImage);
    // formData.append("ergebnis", enteredBefund);
    formData.append("vorerkrankungen", enteredVorerkrankungen);

    try {
      const response = await fetch(`http://127.0.0.1:1200/api/v1/patient`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + authCtx.token,
        },
      });

      const patient = await response.json();
      console.log(patient);
      setEnteredBefund(patient.data.predicted);
      setPatient(patient.data.patient);
      console.log(patient.data.patient);
      console.log(patient.data.predicted);
      setCurrentStep("ergebnis");
    } catch (erro) {}
  };

  function formatDateTime(isoString) {
    return moment(isoString).format("DD.MM.YYYY HH:mm:ss");
  }

  const datum = formatDateTime(Date());

  function generateImageId() {
    const now = Date.now();
    const random = Math.random() * now;
    return `image-${now}-${Math.floor(random)}`;
  }

  const imageId = generateImageId();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <form onSubmit={submitHandler}>
          {/* ********************** section Bild hochladen ******************************************** */}

          <div
            className={styles.bildHochladen}
            style={{ display: currentStep === "upload" ? "flex" : "none" }}
          >
            <div className={styles.title}>
              <span>
                Willkommen bei LungAIView Ihrem intelligenten Diagnosehelfer
              </span>
              <div></div>
            </div>
            <div className={styles.intro}>
              <p>
                Unsere fortschrittliche Web-App nutzt die neueste
                KI-Technologie, basierend auf Convolutional Neural Networks
                (CNN), um Röntgenbilder präzise zu analysieren und zu
                klassifizieren. Laden Sie einfach Ihr Röntgenbild hoch, und
                unser System beginnt sofort mit der Analyse, um Sie bei der
                Diagnose zu unterstützen.
              </p>
            </div>
            <div className={styles.buttonHochladen}>
              <input
                type="file"
                name="image"
                accept="image/*"
                id="image"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image" className={styles.uploadButton}>
                Bild hochladen
              </label>
            </div>
          </div>

          {/* ********************** section analyse senden ******************************************** */}

          <div
            className={styles.analyseSenden}
            style={{ display: currentStep === "review" ? "flex" : "none" }}
          >
            <div className={styles.title}>
              <span>
                Willkommen bei LungAIView Ihrem intelligenten Diagnosehelfer
              </span>
              <div></div>
            </div>
            <div className={styles.image}>
              {imagePreviewUrl && <img src={imagePreviewUrl} alt="Vorschau" />}
            </div>
            <div className={styles.buttonAnalyseSenden}>
              <button type="button" onClick={handleSendForAnalysis}>
                Zur Analyse senden
              </button>
            </div>
          </div>

          {/* ********************** section Details erfassen ******************************************** */}
          <div
            className={styles.DetailsErfassen}
            style={{ display: currentStep === "details" ? "flex" : "none" }}
          >
            <div className={styles.titleDetailsErfassen}>
              <span>Patientendetails ergänzen</span>
              <div></div>
            </div>
            <div className={styles.introDetailsErfassen}>
              <p>
                Um die Analyse zu verfeinern und personalisierte Ergebnisse zu
                erhalten, benötigen wir einige zusätzliche Informationen über
                den Patienten. Bitte füllen Sie die folgenden Details aus:
              </p>
            </div>
            <div className={styles.formDetailsErfassen}>
              <div className={styles.name}>
                <label htmlFor="name">Name des Patienten</label>
                <input
                  type="text"
                  id="name"
                  value={enteredName}
                  onChange={nameHandler}
                />
              </div>
              <div className={styles.geburtsdatum}>
                <label htmlFor="geburtsdatum">Geburtsdatum des Patienten</label>
                <input
                  type="date"
                  id="geburtsdatum"
                  value={enteredGeburtsdatum}
                  onChange={geburtsdatumHandler}
                />
              </div>
              <div className={styles.genderCard}>
                <div className={styles.gender}>
                  <label>Biologisches Geschlecht des Patienten</label>
                </div>
                <div className={styles["radio-options"]}>
                  <label>
                    <input
                      type="radio"
                      value="Männlich"
                      onChange={geschlechtHandler}
                      checked={enteredGeschlecht === "Männlich"}
                    />
                    Männlich
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Weiblich"
                      onChange={geschlechtHandler}
                      checked={enteredGeschlecht === "Weiblich"}
                    />
                    Weiblich
                  </label>
                </div>
              </div>
              <div className={styles.vorerkrankungen}>
                <label>Vorhandene Vorerkrankungen</label>
                <textarea
                  type="text"
                  id="vorerkrankungen"
                  value={enteredVorerkrankungen}
                  onChange={vorerkrankungenHandler}
                />
              </div>
              <div className={styles.buttonDetailsErfassen}>
                <button>Senden</button>
              </div>
            </div>
          </div>
          {/* ********************** End section Details erfassen ******************************************** */}
        </form>
        <div
          className={styles.ergbnis}
          style={{ display: currentStep === "ergebnis" ? "flex" : "none" }}
        >
          <div className={styles.imageBefund}>
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Vorschau" />}
          </div>
          <div className={styles.befundCard}>
            <div className={styles.patientInfo}>
              <div className={styles.befundTitel}>
                <span>Patient Info</span>
              </div>
              <div className={styles.namePatient}>
                <span>Name: </span>
                <span>{patient.name}</span>
              </div>
              <div className={styles.geburtsdatumPatient}>
                <span>Geburtsdatum: </span>
                <span>{patient.geburtsdatum}</span>
              </div>
              <div className={styles.geschlechtPatient}>
                <span>Geschlecht: </span>
                <span>{patient.geschlecht}</span>
              </div>
            </div>
            <div className={styles.result}>
              <div className={styles.titel}>Befund</div>
              <div className={styles.befund}>
                <span>{enteredBefund}</span>
              </div>
              <div className={styles.imageId}>
                <span>{imageId}</span>
              </div>
              <div className={styles.datum}>
                <span>{datum}</span>
              </div>
            </div>
          </div>
          <div className={styles.buttonFertig}>
            <Link to={`/dashboard`} className={styles.link}>
              FERTIG
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BildAnalyse;
