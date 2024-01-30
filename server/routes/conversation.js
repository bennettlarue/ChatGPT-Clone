//import { express } from "express";
const express = require("express");
const {
    createConversation,
    getAllConversations,
    updateConversation,
    testRoute,
} = require("../controllers/conversation");

const router = express.Router();

router.get("/test", testRoute);
router.get("/", getAllConversations);
router.post("/create", createConversation);
router.put("/:id", updateConversation);

module.exports = router;
