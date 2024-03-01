const express = require("express");
const authController = require("./../controllers/authController");
const userController = require("./../controllers/userController");
// const postRouter = require("./../routes/postRoutes");
// const artRouter = require("./../routes/artRoutes");

const router = express.Router();

// router
//   .route("/top-users")
//   .get(userController.topUsers, userController.getAllUsers);

router.post("/signup", userController.uploadUserImage, authController.signup);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserImage,
  userController.updateMe
);

router.get("/me", userController.getMe, userController.getUser);

router.delete("/deleteMe", authController.protect, userController.deleteMe);

router.post(authController.protect, userController.createUser);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(
    authController.protect,
    userController.uploadUserImage,
    userController.updateUser
  );

module.exports = router;
