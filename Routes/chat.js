const express = require("express");
const router = express.Router();

const {
  getChats,
  getGroups,
  createGroupChat,
  createPrivateChat,
  exitGroup,
} = require("../Controllers/chat");
const { protect } = require("../Middlewares/auth");

// change API url can you check it ✅
// Note which we use protect funcation, we can use it in index.js in middelware 📝
router.get("/", protect, getChats);
router.get("/fetchAllGroups", protect, getGroups);
router.post("/groupChat", protect, createGroupChat);
router.post("/privateChat/:recieverId", protect, createPrivateChat);
router.post("/exitGroup", protect, exitGroup);

module.exports = router;
