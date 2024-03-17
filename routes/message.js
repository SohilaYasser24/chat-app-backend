const express = require("express");
const { setMessages, getMessages } = require("../Controllers/message");
const { protect } = require("../Middlewares/auth");
const router = express.Router();

router.post("/", protect, setMessages);
router.get("/messages", getMessages);

module.exports = router;