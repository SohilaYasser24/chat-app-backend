const express = require("express");
const router = express.Router();

const {
  getChats,
  getGroups,
  createGroup,
} = require("../controllers/chatController");
const { protect } = require("../middlewares/authMW");

router.get("/chats",protect, getChats);
router.get("/fetchAllGroups", protect, getGroups);
router.post("/group",protect, createGroup);

module.exports = router;
