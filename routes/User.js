const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/UserController");

const { verifyAccessToken } = require("../helpers/jwt_helper.js");

router.get("/profile", verifyAccessToken, getProfile);

module.exports = router;
