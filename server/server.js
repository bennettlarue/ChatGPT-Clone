const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const conversationRoutes = require("./routes/conversation");
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/conversation", conversationRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => res.send("Hello from homepage!"));

/**
 * MongoDB connection URL.
 *
 * This URL is used to connect to the MongoDB database. It includes the necessary credentials and connection options.
 *
 * @type {string}
 */
const CONNECTION_URL = process.env.MONGO_URI;
mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully Connected to MongoDB !");
    })
    .catch((error) => {
        console.error("Error Connecting to MongoDB: ", error);
    });

// Start Server
const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
