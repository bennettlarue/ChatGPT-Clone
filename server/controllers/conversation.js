const Conversation = require("../models/conversation");

// Create a new conversation
const createConversation = async (req, res) => {
    const conversation = req.body;
    const newConversation = Conversation(conversation);

    try {
        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (error) {
        console.error(error);
    }
};

// Get all conversations
const getAllConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find();
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching conversations: ", error);
        res.status(500);
    }
};

// Update a conversation
const updateConversation = async (req, res) => {
    const conversationId = req.params.id;
    const updatedConversation = req.body;

    try {
        const existingConversation = await Conversation.findById(
            conversationId
        );
        if (!existingConversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        existingConversation.messages = updatedConversation.messages;
        const savedConversation = await existingConversation.save();

        res.status(200).json(savedConversation);
    } catch (error) {
        console.error("Error updating conversation :", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Test route
const testRoute = async (req, res) => {
    res.send("Hello from test route!");
};

module.exports = {
    createConversation,
    getAllConversations,
    updateConversation,
    testRoute,
};
