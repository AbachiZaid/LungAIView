const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
  },

  geschlecht: {
    type: String,
    trim: true,
  },

  geburtsdatum: {
    type: String,
    trim: true,
  },

  image: String,

  ergebnis: {
    type: String,
    default: "ausstehend",
  },

  vorerkrankungen: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Patient = mongoose.model("Patient", patientSchema, "patient");

module.exports = Patient;
