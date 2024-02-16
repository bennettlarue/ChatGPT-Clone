import React, { useState, useContext, useEffect, useRef } from "react";
import GlobalContext from "../context/globalContext";
import NewConversation from "./NewConversation";
import UserMessage from "./messageBoxes/UserMessage";
import BotMessage from "./messageBoxes/BotMessage";
import { getBotReply, updateConversation } from "../utilities/request";

const Chat = () => {
    // Contexts and UseStates

    const { currentConversation, setCurrentConversation } =
        useContext(GlobalContext);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Add the isLoading state
    const [triggerScroll, setTriggerScroll] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    // Use effects

    useEffect(() => {
        if (currentConversation) setMessages(currentConversation.messages);
        //scrollToBottom();
    }, [currentConversation]);

    useEffect(() => {
        scrollToLatestBotMessage(); // Scroll to the most recent bot message
    }, [messages]);

    const bottomEl = useRef(null);
    const scrollToBottom = () => {
        if (bottomEl.current) {
            // Check if element exists
            bottomEl.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [triggerScroll]);

    // Functions

    const scrollToLatestBotMessage = () => {
        const latestBotMessageEl = document.querySelector(
            ".latest-bot-message"
        );

        if (latestBotMessageEl) {
            const scrollContainer =
                document.querySelector(".overflow-y-scroll");
            const offsetAdjustment = 70; // Adjust this value in pixels as needed

            scrollContainer.scrollTop =
                latestBotMessageEl.offsetTop - offsetAdjustment;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const newMessage = {
            role: "user",
            content: event.target.message.value,
        };
        event.target.reset();

        let updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);
        setTriggerScroll(!triggerScroll);

        var botReply = await getBotReply(updatedMessages);
        updatedMessages = [...messages, newMessage, botReply];

        // Save conversation to MongoDB
        updateConversation(updatedMessages, currentConversation);

        setIsLoading(false);
        setIsTyping(true);

        setMessages(updatedMessages);
    };

    if (JSON.stringify(currentConversation) === "{}") {
        console.log(currentConversation);
        return <NewConversation />;
    }

    return (
        <div className="grid grid-rows-6 h-screen" onClick={scrollToBottom}>
            <div className="row-span-5 overflow-y-scroll bg-lightGrey chat-container">
                {!messages || messages.length === 0 ? (
                    <div className="flex h-full">
                        <div className=" text-blueBlack text-xl">
                            No Messages Yet...
                        </div>
                    </div>
                ) : (
                    messages.map((message, index) =>
                        message.role === "system" ? (
                            ""
                        ) : message.role === "user" ? (
                            <UserMessage content={message.content} />
                        ) : (
                            <BotMessage
                                message={message}
                                messages={messages}
                                index={index}
                            />
                        )
                    )
                )}

                <div ref={bottomEl}></div>
            </div>
            {/* ---------------------------------------------------------------------------------------------------------------- */}
            <div className="bg-cream shadow-2xl p-3 pb-16">
                <form onSubmit={handleSubmit}>
                    <div className="bg-softWhite max-w-3xl p-3 rounded-xl flex mx-auto shadow-md mt-2">
                        {isLoading ? (
                            <div className="flex w-full h-full text-modernGray py-1">
                                Thinking
                                <span class="ellipsis-anim">
                                    <span>.</span>
                                    <span>.</span>
                                    <span>.</span>
                                </span>
                            </div>
                        ) : (
                            <div className="flex w-full h-full">
                                <input
                                    type="text"
                                    name="message"
                                    placeholder={"Send a message"}
                                    className={`w-full h-8 bg-transparent border border-transparent placeholder-modernGray focus:outline-none
                            `}
                                    disabled={isLoading} // Disable input while loading
                                />
                                <button
                                    type="submit"
                                    className="h-8 border border-transparent placeholder-modernGray focus:outline-none"
                                >
                                    📨
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Chat;
