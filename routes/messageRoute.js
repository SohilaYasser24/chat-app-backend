const express = require("express");
const {
  setMessages,
  getMessages,
} = require("../controllers/messageController");
const { protect } = require("../middlewares/authMW");
const router = express.Router();

router.post("/", protect, setMessages);
router.get("/messages", getMessages);

module.exports = router;
