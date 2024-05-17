const express = require("express");

const { sendChat, findKeyWords } = require("../controllers/chat");

const router = express.Router();

router.post("/", sendChat);
router.post("/findKeyWords", findKeyWords);

module.exports = router;
