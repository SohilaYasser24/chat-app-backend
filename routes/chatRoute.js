const express = require("express");
const router = express.Router();

const {
  getChats,
  getGroups,
  createGroup,
} = require("../controllers/chatController");
const { protect } = require("../middlewares/authMW");

router.get("/chats", getChats);
router.get("/fetchAllGroups", protect, getGroups);
router.post("/group", createGroup);

module.exports = router;
