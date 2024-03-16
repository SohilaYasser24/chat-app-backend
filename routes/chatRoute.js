const express = require("express");
const router = express.Router();
const { getChats, getGroups, createGroup } = require("../controllers/chatController");

router.get("/chats",getChats)
router.get("/groups",getGroups)
router.post("/group",createGroup)



module.exports = router;