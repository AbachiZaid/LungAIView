const fs = require("fs");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const helmet = require("helmet");
const monogoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const userRouter = require("./routes/userRoutes");
const patientRouter = require("./routes/patientRoutes");

const app = express();

app.use(
  "/public/images/patients",
  express.static(path.join("public", "images", "patients"))
);

app.use(
  "/public/images/users",
  express.static(path.join("public", "images", "users"))
);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// body-parser
app.use(bodyParser.json());

// Body paraser, reading data from the body into req.body
app.use(express.json());

// Data sanitization against XSS NoSQL query injection
app.use(monogoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

// ROUTES
app.use("/api/v1/users", userRouter);
app.use("/api/v1/patient", patientRouter);

module.exports = app;
