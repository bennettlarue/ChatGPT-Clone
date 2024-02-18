import React, { useState, useContext } from "react";
import GlobalContext from "../context/globalContext";

const NewConversation = () => {
    const { setCurrentConversation } = useContext(GlobalContext);
    const [conversationName, setConversationName] = useState("");
    const [personalityString, setPersonalityString] = useState(
        "You are a helpful assistant."
    );

    const personalities = [
        {
            name: "Default",
            description: "The default helpful assistant.",
            color: "green-300",
            hoverColor: "hover:bg-green-300",
            image: "https://i.imgur.com/R9TzBxU.png",
            personalityText: "You are a helpful assistant.",
        },
        {
            name: "Dungeon Master",
            description:
                "Let Chat GPT guide you through a thrilling text adventure!",
            color: "red-300",
            hoverColor: "hover:bg-red-300",
            image: "https://i.imgur.com/LA334Ip.png",
            personalityText:
                "You are a dungeon master for a text adventure game. Your first question should always be whether the user wants to give you a story or if you should make up a story for them. Do not continue with the game until this is answered. Do not answer question that are irrelevant to the game.",
        },
        {
            name: "Writing Instructor",
            description:
                "A preset built around workshopping, critiquing, and improving academic papers.",
            color: "blue-300",
            hoverColor: "hover:bg-blue-300",
            image: "https://i.imgur.com/Y71mys1.png",
            personalityText:
                "You are a writing instructor assisting the user with an academic paper. You have strong attention to details such as paper structure, grammar, and eloquence. Your main concern should always be help the user come up with new ideas for expanding a given paper and critiquing and improving their paper. Your first question should always be asking for what the user has already written or plans to write.",
        },
        {
            name: "Programmer",
            description: "A preset built around reading and writing code.",
            color: "orange-300",
            hoverColor: "hover:bg-orange-300",
            image: "https://i.imgur.com/nchkGoS.png",
            personalityText: "You are a software developer.",
        },
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newConversation = {
            name: conversationName,
            messages: [{ role: "system", content: personalityString }],
            createdDate: new Date(),
        };

        try {
            const response = await fetch(
                "http://localhost:3001/conversation/create",
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

            const responseData = await response.json();
            setCurrentConversation(responseData);

            console.log(responseData);
        } catch (error) {
            console.error("Error: ", error);
        }
    };

    return (
        <div className="grid grid-row6">
            <div className="flex justify-center text-blueBlack">
                <div
                    className="mt-10 mb-5 hover:drop-shadow-lg"
                    style={{
                        fontSize: "50px",
                        background:
                            "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 21%, rgb(209, 251, 155) 100.2%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontWeight: "bold",
                    }}
                >
                    New Conversation
                </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-10">
                <div className="flex justify-center">
                    <input
                        type="text"
                        placeholder="Conversation Name"
                        value={conversationName}
                        onChange={(e) => setConversationName(e.target.value)}
                        className=" w-96 p-4 mr-2 border border-gray-300 rounded-xl shadow-md"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className=" p-3.5 rounded-full text-black font-bold shadow-md text-lg my-6 btn-hover color-1"
                    >
                        Start Chatting
                    </button>
                </div>
            </form>

            <div className="row-span-5 bg-lightGrey mx-auto my-4">
                <div className="flex justify-center mb-3 text-lg">
                    . . . or choose a chat personality first!
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
                            className={`transition-all duration-200 rounded-lg shadow-md px-5 py-3 ${
                                personalityString ===
                                personality.personalityText
                                    ? `bg-${personality.color} hover:`
                                    : "bg-softWhite hover:-translate-y-1 hover:shadow-xl " +
                                      personality.hoverColor
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
                                <div className="text-lg my-auto drop-shadow-xl text-blueBlack">
                                    {personality.name}
                                </div>
                            </div>
                            <div className="flex text-lightBlack">
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
