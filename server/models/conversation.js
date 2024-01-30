const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    messages: {
        type: Array,
        required: true,
    },
    createdDate: {
        type: Date,
        required: true,
    },
});

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
