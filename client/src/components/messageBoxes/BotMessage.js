import React from "react";
import ReactMarkdown from "react-markdown";
import remarkHighlight from "remark-highlight.js";
import remarkGfm from "remark-gfm";

function replaceNumberedListIndicators(text) {
    return text.replace(/^\d+\.\s+/gm, (match) => match.replace(".", ":"));
}

const BotMessage = ({ message, messages, index }) => {
    console.log(message);

    return (
        <div className="py-5 bg-blueBlack text-softWhite sm:pl-4">
            <div className="flex w-full h-full px-3 lg:justify-center md:justify-center mb-3">
                <div className="w-chatSize">
                    <div className="h-30 w-30 flex-shrink-0 mr-2 mt-1 flex">
                        <div
                            className=" p-1.5 rounded-full"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 0%, rgb(209, 251, 155) 100.2%)",
                            }}
                        >
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
                    className={`lg:w-chatSize md:w-chatSize whitespace-normal break-words p-2 my-1 ${
                        index === messages.length - 1
                            ? "newMessage latest-bot-message"
                            : ""
                    }`} // Add 'latest-bot-message' class if it's the most recent
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkHighlight]}
                        children={replaceNumberedListIndicators(
                            message.content
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

export default BotMessage;
