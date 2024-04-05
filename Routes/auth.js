const {
  signUp,
  login,
  userDetails,
  updateUser,
  deleteUser,
} = require("../Controllers/auth");
const { protect } = require("../Middlewares/auth");

const express = require("express");
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", protect, userDetails);
router.put("/edit", protect, updateUser);
router.delete("/delete", protect, deleteUser);

module.exports = router;
