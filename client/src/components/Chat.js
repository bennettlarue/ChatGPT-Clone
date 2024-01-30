import React, { useState, useContext, useEffect, useRef } from "react";
import Typewriter from "typewriter-effect";
import GlobalContext from "../context/globalContext";
import NewConversation from "./NewConversation";
import UserMessage from "./messageBoxes/UserMessage";
import {
    getBotReply,
    getKeyWords,
    updateConversation,
} from "../utilities/request";

const Chat = () => {
    // Contexts and UseStates

    const { currentConversation, setCurrentConversation } =
        useContext(GlobalContext);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // Add the isLoading state
    const [isTyping, setIsTyping] = useState(false);
    const [keyWords, setKeyWords] = useState([]);

    // Use effects

    useEffect(() => {
        if (currentConversation) setMessages(currentConversation.messages);
        scrollToBottom();
    }, [currentConversation]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const bottomEl = useRef(null);

    // Functions

    const scrollToBottom = (behavior) => {
        bottomEl?.current?.scrollIntoView({ behavior: "instant" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const newMessage = {
            role: "user",
            content: event.target.message.value,
        };
        event.target.reset();
        scrollToBottom();

        let updatedMessages = [...messages, newMessage];
        setMessages(updatedMessages);

        var botReply = await getBotReply(updatedMessages);
        updatedMessages = [...messages, newMessage, botReply];

        // JSON data to send to get key words.
        const jsonData = {
            role: "user",
            content: botReply.content,
        };

        // Get key words
        const fetchedKeyWords = await getKeyWords(jsonData);
        setKeyWords(fetchedKeyWords);

        // Save conversation to MongoDB
        updateConversation(updatedMessages, currentConversation);

        setIsLoading(false);
        setIsTyping(true);

        setMessages(updatedMessages);
    };

    const handleLinkClick = async (event, content, term) => {
        event.preventDefault();
        setIsLoading(true);

        const newMessage = {
            role: "user",
            content: `Here is some text you sent me: "${content}". Elaborate on "${term}," which you mentioned.`,
        };

        const displayMessage = {
            role: "user",
            content: `🔎 ${term}`,
        };

        scrollToBottom();

        let updatedMessages = [...messages, newMessage];
        setMessages([...messages, displayMessage]);

        var botReply = await getBotReply(updatedMessages);
        updatedMessages = [...messages, newMessage, botReply];

        // JSON data to send to get key words.
        const jsonData = {
            role: "user",
            content: botReply.content,
        };

        // Get key words
        const fetchedKeyWords = await getKeyWords(jsonData);
        setKeyWords(fetchedKeyWords);

        // Save conversation to MongoDB
        updateConversation(updatedMessages, currentConversation);

        setIsLoading(false);
        setIsTyping(true);

        setMessages([...messages, displayMessage, botReply]);
    };

    const customNodeCreator = (text) => {
        scrollToBottom();

        const textNode = document.createTextNode(text);
        return textNode;
    };

    const handleTypewriterComplete = () => {
        setIsTyping(false);
    };

    if (JSON.stringify(currentConversation) === "{}") {
        console.log(currentConversation);
        return <NewConversation />;
    }

    return (
        <div className="grid grid-rows-6 h-screen">
            <div className="row-span-5 overflow-scroll bg-lightGrey">
                {!messages || messages.length === 0 ? (
                    <div className="flex justify-center items-center h-full">
                        <div className=" text-gray-400 text-xl">
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
                            <div className="flex justify-center p-7 bg-softWhite rounded-md">
                                <div className="flex w-full h-full justify-center">
                                    <div className="h-30 w-30 flex-shrink-0 mr-5 mt-1">
                                        <div className="boxContainer bg-gptGreen p-2 rounded-xl shadow-lg">
                                            {Array.from(
                                                { length: 5 },
                                                (_, i) => (
                                                    <div
                                                        key={i}
                                                        className={
                                                            messages.length -
                                                                1 ===
                                                                index &&
                                                            isTyping
                                                                ? `box box${
                                                                      i + 1
                                                                  }`
                                                                : "boxStationary boxStopped"
                                                        }
                                                    ></div>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {messages.length - 1 === index &&
                                    isTyping ? (
                                        <div
                                            className="w-2/3 whitespace-normal break-words shadow-lg p-4 border border-slate-200 rounded-xl"
                                            style={{ whiteSpace: "pre-wrap" }}
                                        >
                                            <Typewriter
                                                options={{
                                                    autoStart: true,
                                                    delay: 10,
                                                    onCreateTextNode:
                                                        customNodeCreator,
                                                }}
                                                onInit={(typewriter) => {
                                                    typewriter
                                                        .typeString(
                                                            message.content
                                                        )
                                                        .start()
                                                        .callFunction(
                                                            handleTypewriterComplete
                                                        );
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            className="w-2/3 whitespace-normal break-words shadow-lg p-4 border border-slate-200 rounded-xl"
                                            style={{ whiteSpace: "pre-wrap" }}
                                        >
                                            {index === messages.length - 1 ? (
                                                <React.Fragment>
                                                    {message.content
                                                        .split(
                                                            new RegExp(
                                                                `(${keyWords.join(
                                                                    "|"
                                                                )})`,
                                                                "gi"
                                                            )
                                                        )
                                                        .map((part, idx) =>
                                                            keyWords.includes(
                                                                part.toLowerCase()
                                                            ) ? (
                                                                <button
                                                                    key={idx}
                                                                    onClick={(
                                                                        event
                                                                    ) => {
                                                                        handleLinkClick(
                                                                            event,
                                                                            message.content,
                                                                            part
                                                                        );
                                                                    }}
                                                                    className="text-blue-700 hover:text-purple-700 transition-all duration-200"
                                                                >
                                                                    {part}
                                                                </button>
                                                            ) : (
                                                                part
                                                            )
                                                        )}
                                                </React.Fragment>
                                            ) : (
                                                message.content
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
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
