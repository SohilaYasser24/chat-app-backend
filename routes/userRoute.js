const express = require("express");
const { getAllUsers } = require("../controllers/userController");
const { protect } = require("../middlewares/authMW");
const router = express.Router();

router.get("/fetchAllUsers", protect, getAllUsers);

module.exports = router;
