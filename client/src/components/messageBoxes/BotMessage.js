import React from "react";
import ReactMarkdown from "react-markdown";
//import remarkHighlight from "remark-highlight.js";
//import remarkGfm from "remark-gfm";

function replaceNumberedListIndicators(text) {
    return text.replace(/^\d+\.\s+/gm, (match) => match.replace(".", ":"));
}

/**
 * Represents a component for displaying a bot message.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.message - The message object to be displayed.
 * @param {Array} props.messages - The array of all messages.
 * @param {number} props.index - The index of the current message.
 * @returns {JSX.Element} The JSX element representing the bot message.
 */

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
                    }`}
                    style={{ whiteSpace: "pre-wrap" }}
                >
                    <ReactMarkdown
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
