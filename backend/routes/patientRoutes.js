const express = require("express");
const patientController = require("../controllers/patientController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/recent-patient")
  .get(patientController.recentPatients, patientController.getAllPatients);

router.route("/total-patients").get(patientController.totalPatients);
router.route("/ergebinsse").get(patientController.ergebnisse);
router.route("/alter").get(patientController.alter);
router.route("/geschlecht").get(patientController.geschlecht);

router
  .route("/")
  .get(authController.protect, patientController.getAllPatients)
  .post(
    authController.protect,
    patientController.uploadPatientImage,
    patientController.createPatient
  );

router
  .route("/:id")
  .get(authController.protect, patientController.getPatient)
  .patch(
    authController.protect,
    patientController.uploadPatientImage,
    patientController.updatePatient
  )
  .delete(authController.protect, patientController.deletePatient);

module.exports = router;
