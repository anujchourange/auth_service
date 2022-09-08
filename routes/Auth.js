const express = require("express");
const router = express.Router();
const {
  validateRegisterData,
  validateLoginData,
} = require("../middlewares/validate_user.js");
const { register, login } = require("../controllers/AuthController");

router.post("/register", validateRegisterData, register);

router.post("/login", validateLoginData, login);

module.exports = router;
