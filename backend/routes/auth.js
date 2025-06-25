const express = require("express");
const {
  signup,
  login,
  sendResetPasswordEmail,
  googleAuth,
  checkUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/sendResetPasswordEmail", sendResetPasswordEmail);
router.post("/google-auth", googleAuth);
router.get("/check-user/:uid", checkUser);

module.exports = router;
