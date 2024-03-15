const authController = require("../controllers/authController");
const authMW = require("../middlewares/authMW");

const express = require("express");
const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;
