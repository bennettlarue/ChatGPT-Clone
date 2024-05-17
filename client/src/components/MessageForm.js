import React from "react";

/**
 * MessageForm component represents a form for sending messages.
 *
 * @param {object} props - The props of the component.
 * @param {boolean} props.isLoading - The loading state.
 * @param {function} props.onSubmit - The function to call when the form is submitted.
 * @returns {JSX.Element} The rendered MessageForm component.
 */
const MessageForm = ({ isLoading, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <div className="bg-blueBlack max-w-3xl p-3 rounded-xl flex mx-auto shadow-md mt-2  border-2 border-lightBlackHover">
            {isLoading ? (
                <div className="flex w-full h-full text-modernGray py-1">
                    Thinking
                    <span className="ellipsis-anim">
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
                        placeholder="Send a message"
                        className="w-full h-8 bg-blueBlack border border-transparent text-softWhite placeholder-lightBlackHover placeholder:font-semibold focus:outline-none"
                        disabled={isLoading} // Disable input while loading
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="border border-transparent placeholder-modernGray focus:outline-none ml-5 w-9 p-1.5 h-full rounded-lg btn-hover color-1"
                    >
                        <img src="https://i.imgur.com/aBHkKTI.png" alt="send" />
                    </button>
                </div>
            )}
        </div>
    </form>
);

export default MessageForm;
