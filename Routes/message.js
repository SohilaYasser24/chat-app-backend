const express = require("express");
const {
  setMessages,
  getMessages,
  deleteMessage,
  editMessage,
} = require("../Controllers/message");
const { protect } = require("../Middlewares/auth");
const router = express.Router();

router.post("/", protect, setMessages);
router.get("/", protect, getMessages);
router.delete("/delete/:messageId", protect, deleteMessage);
router.put("/edit/:messageId", protect, editMessage);

module.exports = router;
