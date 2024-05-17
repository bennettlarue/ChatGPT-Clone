const Conversation = require("../models/conversation");

// Create a new conversation
const createConversation = async (req, res) => {
    const { userId, name, messages, createdDate } = req.body;
    const newConversation = new Conversation({
        userId,
        name,
        messages,
        createdDate,
    });

    try {
        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all conversations for a specific user
const getAllConversations = async (req, res) => {
    const { userId } = req.params;

    try {
        const conversations = await Conversation.find({ userId });
        res.status(200).json(conversations);
    } catch (error) {
        console.error("Error fetching conversations: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a conversation
const updateConversation = async (req, res) => {
    const { userId, conversationId } = req.params;
    const updatedConversation = req.body;

    try {
        const existingConversation = await Conversation.findOne({
            _id: conversationId,
            userId,
        });

        if (!existingConversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        existingConversation.messages = updatedConversation.messages;
        const savedConversation = await existingConversation.save();
        res.status(200).json(savedConversation);
    } catch (error) {
        console.error("Error updating conversation:", error);
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
