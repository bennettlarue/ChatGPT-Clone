import React from "react";

const UserMessage = (props) => {
    return (
        <div className="flex p-7 bg-cream shadow-md border-y-2 border-slate-200 justify-center">
            <div className="flex justify-center w-full">
                <div className="h-12 w-11 flex-shrink-0 mr-5 mt-1">
                    <img
                        src="https://i.imgur.com/prghu9r.png"
                        className="drop-shadow-md w-12 h-12 object-contain"
                        alt="User"
                    />
                </div>

                <div className="w-2/3 whitespace-normal break-words shadow-lg p-4 border border-slate-200 rounded-xl">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default UserMessage;
