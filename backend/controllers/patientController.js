const Patient = require("./../models/patientModel");
const APIFeatures = require("./../utilities/apiFeatures");
const multer = require("multer");
const catchAsync = require("./../utilities/catchAsync");
const AppError = require("../utilities/AppError");
const sharp = require("sharp");
const tf = require("@tensorflow/tfjs-node");

// tensorflowjs_converter --input_format=keras /Users/zaid/Desktop/model_NORMAL_VS_NOCHT_NORMAL.h5 /Users/zaid/Desktop/tfjs_model_NORMAL_VS_NOCHT_NORMAL

async function convertImage(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(224, 224)
      .toFormat("png")
      .toBuffer();
    return buffer;
  } catch (error) {
    console.error("Fehler beim Konvertieren des Bildes:", error);
    throw error;
  }
}

async function predictImage(imagePath) {
  try {
    // Klassen-Namen
    const classNames = ["Nicht_Normal", "Normal"];

    // Modell laden
    const model = await tf.loadLayersModel(
      "file:///Users/zaid/Desktop/tfjs_model_NORMAL_VS_NOCHT_NORMAL/model.json"
    );

    // Bild konvertieren und als Tensor vorbereiten
    const imageBuffer = await convertImage(imagePath);
    let tensor = tf.node
      .decodeImage(imageBuffer, 3)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(tf.scalar(255))
      .expandDims()
      .mean(3)
      .expandDims(-1);

    // Vorhersage treffen
    const pred = await model.predict(tensor);
    const predArray = await pred.data();

    // Wahrscheinlichkeit und Klasse bestimmen
    const predClassIndex = Math.round(predArray[0]); // Verwende Math.round() anstelle von int
    const predClass = classNames[predClassIndex];
    const confidence = predClassIndex === 1 ? predArray[0] : 1 - predArray[0];

    console.log(
      `Vorhersage: ${predClass}, Konfidenz: ${confidence.toFixed(2)}`
    );
    return { predictedClassName: predClass, confidence };
  } catch (error) {
    console.error("Fehler bei der Vorhersage:", error);
    throw error;
  }
}

// *************************************************

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/patients");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `x-ray-${req.user.id}-${Date.now()}.${ext}`);
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("not an Image! Please upload only images.", 400), false);
    }
  },
});

//const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("not an Image! Please upload only images.", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadPatientImage = upload.single("image");

exports.recentPatients = (req, res, next) => {
  req.query.limit = "3";
  req.query.sort = "-createdAt";
  req.query.fields = "name, ergebnis, status, geschlecht";
  next();
};

exports.totalPatients = catchAsync(async (req, res, next) => {
  const patients = await Patient.countDocuments();
  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      patients,
    },
  });
});

exports.ergebnisse = catchAsync(async (req, res, next) => {
  const ergebnisse = await Patient.find({}).select("ergebnis -_id");
  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      ergebnisse,
    },
  });
});

exports.alter = catchAsync(async (req, res, next) => {
  const geburtsdatum = await Patient.find({}).select("geburtsdatum -_id");
  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      geburtsdatum,
    },
  });
});

exports.geschlecht = catchAsync(async (req, res, next) => {
  const geschlecht = await Patient.find({}).select("geschlecht -_id");
  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      geschlecht,
    },
  });
});

exports.getAllPatients = catchAsync(async (req, res, next) => {
  // EXECUTE THE QUERY
  const features = new APIFeatures(Patient.find(), req.query)
    .filter()
    .sort("-createdAt")
    .limitFields()
    .paginate();
  const patient = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      patient,
    },
  });
});

exports.createPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.create(req.body);
  const imagePath = req.file.path;

  const { predictedClassName, confidence } = await predictImage(imagePath);
  const predictedClass = predictedClassName;
  const predictionConfidence = confidence;
  console.log(predictedClassName);
  req.body.ergebnis = predictedClassName;
  res.status(200).json({
    status: "success",
    message: "Patient creation successful",
    data: {
      patient,
      predicted: predictedClass,
      confidence: predictionConfidence,
    },
  });
});

exports.getPatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findById(req.params.id);

  if (!patient) {
    return next(new AppError("No patient found with this ID", 404));
  }

  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      patient,
    },
  });
});

exports.updatePatient = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.path;
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!patient) {
    return next(new AppError("No patient found with this ID", 404));
  }

  res.status(200).json({
    status: "seccess",
    message: "",
    data: {
      patient,
    },
  });
});

exports.deletePatient = catchAsync(async (req, res, next) => {
  const patient = await Patient.findByIdAndDelete(req.params.id);

  if (!patient) {
    return next(new AppError("No patient found with this ID", 404));
  }

  res.status(204).json({
    status: "seccess",
    message: "Seccessfully deleted",
  });
});
