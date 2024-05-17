const express = require("express");
const {
    createConversation,
    getAllConversations,
    updateConversation,
    testRoute,
} = require("../controllers/conversation");

const router = express.Router();

router.get("/test", testRoute);
router.get("/:userId", getAllConversations);
router.post("/:userId/create", createConversation);
router.put("/:userId/:conversationId", updateConversation);

module.exports = router;
