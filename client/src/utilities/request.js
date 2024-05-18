// Function to send messages to the chatbot and receive a reply
export const getBotReply = async (messages) => {
    try {
        const response = await fetch(
            "https://gpt-server.bennettlarue.com/chat",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messages),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const botReply = await response.json();
        return botReply;
    } catch (error) {
        console.error("Error:", error);
        return {
            role: "assistant",
            content: "error",
        };
    }
};

// Function to find keywords in a JSON data object
export const getKeyWords = async (jsonData) => {
    try {
        const response = await fetch(
            "https://gpt-server.bennettlarue.com/chat/findKeyWords",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jsonData),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }
};

// Function to update a conversation with new messages
export const updateConversation = async (
    messages,
    currentConversation,
    userId
) => {
    try {
        const response = await fetch(
            `https://gpt-server.bennettlarue.com/conversation/${userId}/${currentConversation._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    messages: messages, // An array of message objects
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        console.log(response);
    } catch (error) {
        console.error("Error : ", error);
    }
};
