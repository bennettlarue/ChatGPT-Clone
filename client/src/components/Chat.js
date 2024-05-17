import React, { useState, useContext, useEffect, useRef } from "react";
import GlobalContext from "../context/globalContext";
import NewConversation from "./NewConversation";
import UserMessage from "./messageBoxes/UserMessage";
import BotMessage from "./messageBoxes/BotMessage";
import { getBotReply, updateConversation } from "../utilities/request";
import MessageForm from "./MessageForm";

/**
 * Chat component represents a chat interface where users can send and receive messages.
 *
 * @returns {JSX.Element} The rendered Chat component.
 */
const Chat = () => {
    // Contexts and UseStates

    // Get the current conversation from the global context
    const { currentConversation, userId } = useContext(GlobalContext);

    // State for storing messages of the current conversation
    const [messages, setMessages] = useState([]);

    // State for tracking loading status
    const [isLoading, setIsLoading] = useState(false);

    // State for triggering scroll to the bottom of the chat
    const [triggerScroll, setTriggerScroll] = useState(false);

    // Use effects

    // Update messages state when currentConversation changes
    useEffect(() => {
        if (currentConversation) setMessages(currentConversation.messages);
    }, [currentConversation]);

    // Scroll to the latest bot message when messages state changes
    useEffect(() => {
        scrollToLatestBotMessage();
    }, [messages]);

    // Reference to the bottom of the chat
    const bottomEl = useRef(null);

    // Function to scroll to the bottom of the chat
    const scrollToBottom = () => {
        if (bottomEl.current) {
            bottomEl.current.scrollIntoView({
                behavior: "smooth",
                block: "end",
            });
        }
    };

    // Scroll to the bottom of the chat when triggerScroll state changes
    useEffect(() => {
        scrollToBottom();
    }, [triggerScroll]);

    // Function to scroll to the latest bot message
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

    // Function to handle form submission
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
        updateConversation(updatedMessages, currentConversation, userId);

        setIsLoading(false);

        setMessages(updatedMessages);
    };

    // If there's no current conversation, render NewConversation component
    if (JSON.stringify(currentConversation) === "{}") {
        return <NewConversation />;
    }

    // Render the chat interface
    return (
        <div className="grid grid-rows-6 h-screen">
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
            <div className="bg-blueBlack px-3 pb-16">
                <MessageForm isLoading={isLoading} onSubmit={handleSubmit} />
            </div>
        </div>
    );
};

export default Chat;
