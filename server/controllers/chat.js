const axios = require("axios");

// Function to send a chat message to the OpenAI API
const sendChat = async (req, res) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const conversation = req.body;

    try {
        const response = await axios.post(
            apiUrl,
            {
                model: "gpt-3.5-turbo",
                messages: conversation,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
            }
        );

        const botReply = response.data.choices[0].message;

        res.send(botReply);
    } catch (error) {
        console.error("Error in API Request:", error);
        res.status(500).send(error);
    }
};

// Function to find keywords or phrases in a chat message
const findKeyWords = async (req, res) => {
    const apiUrl = "https://api.openai.com/v1/chat/completions";

    const newMessage = req.body;

    console.log("Received messaged: ");
    console.log(newMessage);

    try {
        const response = await axios.post(
            apiUrl,
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            'Act as an input-output machine. When I give you text, search through it and find any key words or phrases that the reader might want more information on. Compile them into a list and send the response with no additional text other than the list of terms. Send the terms in the format "["term1", "term2", "term3", "term4", ...etc]". Note that each is surrounded by double quotation marks. If no words seem interesting, just send : "[]".',
                    },
                    newMessage,
                ],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                },
            }
        );

        const botReply = response.data.choices[0].message;

        res.send(JSON.parse(botReply.content));
    } catch (error) {
        console.error("Error in API Request:", error);
        res.status(500).send(error);
    }
};

module.exports = { sendChat, findKeyWords };
