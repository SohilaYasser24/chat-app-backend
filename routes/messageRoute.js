const express = require("express");
const { setMessages, getMessages } = require("../controllers/messageController");
const router = express.Router();



router.post("/message",setMessages)
router.get("/messages",getMessages)




module.exports = router;