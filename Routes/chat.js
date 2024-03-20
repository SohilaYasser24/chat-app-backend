const express = require("express");
const router = express.Router();

const {
  getChats,
  getGroups,
  createChat,
  createPrivateChat,
} = require("../Controllers/chat");
const { protect } = require("../Middlewares/auth");

// change API url can you check it ✅
// Note which we use protect funcation, we can use it in index.js in middelware 📝
router.get("/", protect, getChats);
router.get("/fetchAllGroups", protect, getGroups);
router.post("/", protect, createChat);
router.post("/privateChat/:recieverId", protect, createPrivateChat);

module.exports = router;
