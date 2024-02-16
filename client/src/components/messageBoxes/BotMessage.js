import React from "react";
import ReactMarkdown from "react-markdown";
import remarkHighlight from "remark-highlight.js";

const BotMessage = ({ message, messages, index }) => {
    return (
        <div className="py-5 bg-softWhite">
            <div className="flex w-full h-full px-3 lg:justify-center md:justify-center mb-3">
                <div className="w-2/3">
                    <div className="h-30 w-30 flex-shrink-0 mr-2 mt-1 flex">
                        <div className="bg-gptGreen p-1.5 rounded-full">
                            <img
                                src="https://i.imgur.com/ZtAuNj5.png"
                                alt="gpt"
                                style={{
                                    height: "23px",
                                }}
                            ></img>
                        </div>
                        <p className="ml-2 flex items-center font-semibold text-md">
                            ChatGPT
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex lg:justify-center md:justify-center w-full h-full px-3">
                <div
                    className={`lg:w-2/3 md:w-2/3 whitespace-normal break-words p-2 my-1 ${
                        index === messages.length - 1
                            ? "newMessage latest-bot-message"
                            : ""
                    }`} // Add 'latest-bot-message' class if it's the most recent
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkHighlight]} // Enable code highlighting
                        children={message.content} // Pass message content
                    />
                </div>
            </div>
        </div>
    );
};

export default BotMessage;
