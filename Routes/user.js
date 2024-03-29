const express = require("express");
const { getAllUsers } = require("../Controllers/user");
const { protect } = require("../Middlewares/auth");
const router = express.Router();

router.get("/", protect, getAllUsers);

module.exports = router;
