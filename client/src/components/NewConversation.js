import React, { useState, useContext } from "react";
import GlobalContext from "../context/globalContext";

const NewConversation = () => {
    const { currentConversation, setCurrentConversation } =
        useContext(GlobalContext);
    const [conversationName, setConversationName] = useState("");
    const [personalityString, setPersonalityString] = useState("");

    const defaultAssistant = "You are a helpful assistant.";
    const dungeonMaster =
        "You are a dungeon master for a text adventure game. Your first question should always be whether the user wants to give you a story or if you should make up a story for them. Do not continue with the game until this is answered. Do not answer question that are irrelevant to the game.";
    const writingInstructor =
        "You are a writing instructor assisting the user with an academic paper. You have strong attention to details such as paper structure, grammar, and eloquence. Your main concern should always be help the user come up with new ideas for expanding a given paper and critiquing and improving their paper. Your first question should always be asking for what the user has already written or plans to write.";
    const programmer = "You are a software developer.";

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
        <div className="grid grid-rows-6">
            <div className="row-span-5 overflow-scroll bg-lightGrey mx-auto my-4">
                <div className="flex justify-center p-4 text-xl text-blueBlack">
                    Create New Conversation
                </div>
                Personalities
                <div className="p-5 grid grid-rows-2 grid-cols-2 gap-11 max-w-3xl">
                    <button
                        onClick={() => setPersonalityString(defaultAssistant)}
                        className={`${
                            personalityString === defaultAssistant
                                ? "bg-green-300"
                                : "bg-softWhite hover:-translate-y-1 hover:shadow-xl"
                        }  p-5 shadow-md rounded-lg hover:bg-green-300 transition-all duration-250 `}
                    >
                        <div className="flex mb-5">
                            <div className="h-12 w-11 flex-shrink-0 mr-4">
                                <img
                                    src="https://i.imgur.com/R9TzBxU.png"
                                    className="drop-shadow-md w-12 h-12 object-contain"
                                    alt="User"
                                />
                            </div>
                            <div className="my-auto text-lg drop-shadow-xl text-blueBlack">
                                Default
                            </div>
                        </div>

                        <div className="mt-2 text-lightBlack flex">
                            The default helpful assistant.
                        </div>
                    </button>
                    <button
                        onClick={() => setPersonalityString(dungeonMaster)}
                        className={`${
                            personalityString === dungeonMaster
                                ? "bg-red-300"
                                : "bg-softWhite hover:-translate-y-1 hover:shadow-xl"
                        } p-5 shadow-md rounded-lg bg-softWhite hover:bg-red-300 transition-all duration-200`}
                    >
                        <div className="flex mb-5">
                            <div className="h-12 w-11 flex-shrink-0 mr-4">
                                <img
                                    src="https://i.imgur.com/LA334Ip.png"
                                    className="drop-shadow-md w-12 h-12 object-contain"
                                    alt="User"
                                />
                            </div>
                            <div className="my-auto text-lg drop-shadow-xl text-blueBlack">
                                Dungeon Master
                            </div>
                        </div>

                        <div className="mt-2 text-lightBlack flex">
                            Let Chat GPT guide you through a thrilling text
                            adventure!
                        </div>
                    </button>
                    <button
                        onClick={() => setPersonalityString(writingInstructor)}
                        className={`${
                            personalityString === writingInstructor
                                ? "bg-blue-300"
                                : "bg-softWhite hover:-translate-y-1 hover:shadow-xl"
                        } p-5 shadow-md rounded-lg bg-softWhite hover:bg-blue-300 transition-all duration-200`}
                    >
                        <div className="flex mb-5">
                            <div className="h-12 w-11 flex-shrink-0 mr-4">
                                <img
                                    src="https://i.imgur.com/Y71mys1.png"
                                    className="drop-shadow-md w-12 h-12 object-contain"
                                    alt="User"
                                />
                            </div>
                            <div className="my-auto text-lg drop-shadow-xl text-blueBlack">
                                Writing Instructor
                            </div>
                        </div>

                        <div className="mt-2 text-lightBlack flex">
                            A preset built around workshopping, critiquing, and
                            improving academic papers.
                        </div>
                    </button>
                    <button
                        onClick={() => setPersonalityString(programmer)}
                        className={`${
                            personalityString === programmer
                                ? "bg-orange-300"
                                : "bg-softWhite hover:-translate-y-1 hover:shadow-xl"
                        } p-5 shadow-md rounded-lg bg-softWhite hover:bg-orange-300 transition-all duration-200`}
                    >
                        <div className="flex mb-5">
                            <div className="h-12 w-11 flex-shrink-0 mr-4">
                                <img
                                    src="https://i.imgur.com/nchkGoS.png"
                                    className="drop-shadow-md w-12 h-12 object-contain"
                                    alt="User"
                                />
                            </div>
                            <div className="my-auto text-lg drop-shadow-xl text-blueBlack">
                                Programmer
                            </div>
                        </div>

                        <div className="mt-2 text-lightBlack flex">
                            Let Chat GPT guide you through a thrilling text
                            adventure!
                        </div>
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center p-7 rounded-md text-xl">
                        <input
                            type="text"
                            placeholder="Conversation Name"
                            value={conversationName}
                            onChange={(e) =>
                                setConversationName(e.target.value)
                            }
                            className="border border-gray-300 rounded-md p-2 mr-2"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-md p-2"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewConversation;
