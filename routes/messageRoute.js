const express = require("express");
const router = express.Router();
const { setMessages, getMessages } = require("../controllers/messageController");
const {protect} = require("../middlewares/authMW")





router.post("/message",setMessages)
router.get("/messages",getMessages)




module.exports = router;