import React from "react";

const UserMessage = (props) => {
    return (
        <div className="py-5 bg-cream border-y-2 border-slate-200">
            <div className="flex lg:justify-center md:justify-center w-full h-full px-3 mb-3">
                <div className="w-2/3">
                    <div className="h-30 w-30 flex-shrink-0 mr-2 mt-1 flex">
                        <div className=" rounded-full bg-blue-300 p-1.5">
                            <img
                                src="https://i.imgur.com/prghu9r.png"
                                className="object-contain overflow-clip"
                                style={{
                                    height: "23px",
                                }}
                                alt="User"
                            />
                        </div>
                        <div className="ml-2 flex items-center font-semibold text-md">
                            You
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex lg:justify-center md:justify-center w-full h-full px-3">
                <div className="lg:w-2/3 md:w-2/3 whitespace-normal break-words p-2 my-1">
                    {props.content}
                </div>
            </div>
        </div>
    );
};

export default UserMessage;
