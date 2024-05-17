import React, { useState, useContext } from "react";
import GlobalContext from "../context/globalContext";

/**
 * Represents a component for creating a new conversation.
 * @component
 */
const NewConversation = () => {
    // Accessing the current conversation and conversation refresher from the global context
    const { setCurrentConversation, setRefreshConversations, userId } =
        useContext(GlobalContext);

    // State variables for conversation name and personality string
    const [conversationName, setConversationName] = useState("");
    const [personalityString, setPersonalityString] = useState(
        "You are a helpful assistant."
    );

    // Array of predefined personalities
    const personalities = [
        // Default personality
        {
            name: "Default",
            description: "The default helpful assistant.",
            color: "color-1",
            hoverColor: "hover:bg-green-300",
            image: "https://i.imgur.com/3rfyFPs.png",
            personalityText: "You are a helpful assistant.",
        },
        // Dungeon Master personality
        {
            name: "Dungeon Master",
            description:
                "Let Chat GPT guide you through a thrilling text adventure!",
            hoverColor: "hover:bg-red-300",
            image: "https://i.imgur.com/GYHerzv.png",
            personalityText:
                "You are a dungeon master for a text adventure game. Your first question should always be whether the user wants to give you a story or if you should make up a story for them. Do not continue with the game until this is answered. Do not answer question that are irrelevant to the game.",
        },
        // Writing Instructor personality
        {
            name: "Writing Instructor",
            description:
                "A preset built around workshopping, critiquing, and improving academic papers.",
            hoverColor: "hover:bg-blue-300",
            image: "https://i.imgur.com/lZjdQVi.png",
            personalityText:
                "You are a writing instructor assisting the user with an academic paper. You have strong attention to details such as paper structure, grammar, and eloquence. Your main concern should always be help the user come up with new ideas for expanding a given paper and critiquing and improving their paper. Your first question should always be asking for what the user has already written or plans to write.",
        },
        // Programmer personality
        {
            name: "Programmer",
            description: "A preset built around reading and writing code.",
            hoverColor: "hover:bg-orange-300",
            image: "https://i.imgur.com/Vi62QDN.png",
            personalityText: "You are a software developer.",
        },
    ];

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a new conversation object
        const newConversation = {
            userId, // Include the userId from the global context
            name: conversationName,
            messages: [{ role: "system", content: personalityString }],
            createdDate: new Date(),
        };

        try {
            // Send a POST request to create a new conversation
            const response = await fetch(
                `http://localhost:3001/conversation/${userId}/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newConversation),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Set the current conversation to the response data
            const responseData = await response.json();
            setCurrentConversation(responseData);
            setRefreshConversations((prevState) => !prevState); // Add this line

            console.log(responseData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className="grid grid-row6">
            {/* Title */}
            <div className="flex justify-center gradient-text-container">
                <div className="gradient-text font-bold text-5xl p-10">
                    New Conversation
                </div>
            </div>

            {/* Conversation form */}
            <form onSubmit={handleSubmit} className="mt-10">
                <div className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Conversation Name"
                        value={conversationName}
                        onChange={(e) => setConversationName(e.target.value)}
                        className="w-96 p-4 mr-2 border border-gray-300 rounded-xl shadow-md"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="p-3.5 rounded-full text-black font-bold shadow-md text-lg my-6 btn-hover color-1"
                    >
                        Start Chatting
                    </button>
                </div>
            </form>

            {/* Personality selection */}
            <div className="row-span-5 bg-lightGrey mx-auto my-4">
                <div className="flex justify-center mb-3 text-lg text-white font-semibold">
                    Select GPT Personality
                </div>

                <div className="grid gap-5 px-7">
                    {personalities.map((personality) => (
                        <button
                            key={personality.name}
                            onClick={() =>
                                setPersonalityString(
                                    personality.personalityText
                                )
                            }
                            className={`transition-all duration-100 rounded-lg shadow-md px-5 py-3 ${
                                personalityString ===
                                personality.personalityText
                                    ? `btn color-1 ring-2 ring-softWhite`
                                    : `btn-hover color-2`
                            }`}
                        >
                            <div className="flex mb-5">
                                <div className="flex-shrink-0 mr-4 w-11 h-12">
                                    <img
                                        src={personality.image}
                                        alt={personality.name}
                                        className="w-12 h-12 object-contain drop-shadow-md"
                                    />
                                </div>
                                <div className="text-lg my-auto drop-shadow-xl text-black font-semibold">
                                    {personality.name}
                                </div>
                            </div>
                            <div className="flex text-black font-semibold">
                                {personality.description}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewConversation;
