import React from "react";

/**
 * Component representing a user message.
 * @param {Object} props - The props object containing the content of the message.
 * @returns {JSX.Element} - JSX representing the user message component.
 */
const UserMessage = (props) => {
    return (
        <div className="py-5 pl-4 bg-blueBlack text-softWhite">
            {/* User Profile Section */}
            <div className="flex lg:justify-center md:justify-center w-full h-full px-3 mb-3">
                <div className="w-chatSize">
                    <div className="h-30 w-30 flex-shrink-0 mr-2 mt-1 flex">
                        {/* User Avatar */}
                        <div
                            className="rounded-full p-1.5"
                            style={{
                                backgroundImage:
                                    "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
                            }}
                        >
                            <img
                                src="https://i.imgur.com/lbs4Zyn.png"
                                className="object-contain overflow-clip p-0.5"
                                style={{
                                    height: "23px",
                                }}
                                alt="User"
                            />
                        </div>
                        {/* Username */}
                        <div className="ml-2 flex items-center font-semibold text-md">
                            You
                        </div>
                    </div>
                </div>
            </div>
            {/* Message Content Section */}
            <div className="flex lg:justify-center md:justify-center w-full h-full px-3">
                <div className="lg:w-chatSize md:w-chatSize whitespace-normal break-words p-2 my-1">
                    {/* Displaying message content */}
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default UserMessage;
