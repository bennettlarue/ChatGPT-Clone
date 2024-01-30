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

const CONNECTION_URL =
    "mongodb+srv://begen81:GJmJ9mlILlD0g6kT@cluster0.ypc1vyt.mongodb.net/?retryWrites=true&w=majority";
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

// mongodb+srv://Ben:GJmJ9mlILlD0g6kT@cluster0.n8mfajy.mongodb.net/?retryWrites=true&w=majority
// MONGO USER : begen81
// MONGO PASS : ioYsDTIgqHLpX1eL
