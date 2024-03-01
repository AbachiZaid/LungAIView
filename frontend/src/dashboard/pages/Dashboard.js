import UserInfo from "../components/sectionUserInfo/UserInfo";
// import ProgressBar from "../components/sectionProgressBar/ProgressBar";
// import PatientAge from "../components/sectionPatientAge/PatientAge";
// import TotalPatients from "../components/sectionTotalPatient/TotalPatient";
import Gender from "../components/sectionGender/Gender";
import styles from "./style.module.css";
// import SideMenu from "../components/sideMenu/SideMenu";
import FetchingPatienten from "../components/sectionPatient/FetchingPatienten";
import FetchingTotalPatient from "../components/sectionTotalPatient/FetchingTotalPatient";
import FetchProgressBar from "../components/sectionProgressBar/FetchProgressBar";
import FetchingPatientAge from "../components/sectionPatientAge/FetchingPatientAge";
import FetchGender from "../components/sectionGender/FetchGender";
import FetchUserInfo from "../components/sectionUserInfo/FetchUserInfo";

const Dashboard = (props) => {
  return (
    <div className={`${styles.dashboard}`}>
      <div className={styles.info}>
        <FetchUserInfo />
      </div>
      <div className={styles.patient}>
        <FetchingPatienten />
      </div>
      <div className={styles.patientAge}>
        <FetchingPatientAge />
      </div>
      <div className={styles.progressBar}>
        <FetchProgressBar />
      </div>
      <div className={styles.totalPatients}>
        <FetchingTotalPatient />
      </div>
      <div className={styles.gender}>
        <FetchGender />
      </div>
    </div>
  );
};

export default Dashboard;
