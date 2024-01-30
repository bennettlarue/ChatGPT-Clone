import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/globalContext";

const Sidebar = () => {
    // Use global conversation useState
    const { currentConversation, setCurrentConversation } =
        useContext(GlobalContext);

    const [conversationList, setConversationList] = useState([]);

    const fetchConversations = () => {
        // Fetch conversations from the backend when the component mounts
        fetch("http://localhost:3001/conversation")
            .then((response) => response.json())
            .then((data) => {
                setConversationList(data);
            })
            .catch((error) =>
                console.error("Error fetching conversations: ", error)
            );
    };

    useEffect(() => {
        fetchConversations();
    }, []);

    return (
        <div className="bg-lightBlack h-screen w-72 text-white shadow-lg transition-all duration-400 border-r-4 border-blueBlack">
            <div>
                <div className="bg-modernGray m-3 rounded-xl p-3 flex justify-center">
                    <button
                        onClick={() => {
                            setCurrentConversation({});
                            console.log(currentConversation);
                        }}
                    >
                        Create New
                    </button>
                </div>

                <div>
                    {conversationList.map((conversation) => (
                        <div
                            className={
                                conversation._id === currentConversation._id
                                    ? "ml-2 mt-1 p-2 bg-cream text-black rounded-l-lg "
                                    : "ml-2 mt-1 p-2 transition-all duration-400 hover:bg-lightBlackHover rounded-l-lg"
                            }
                        >
                            <button
                                key={conversation._id}
                                className="flex"
                                onClick={() => {
                                    setCurrentConversation(conversation);
                                    console.log(currentConversation);
                                    fetchConversations();
                                }}
                            >
                                <img
                                    src={
                                        currentConversation._id ===
                                        conversation._id
                                            ? "https://i.imgur.com/1PxRrTH.png"
                                            : "https://i.imgur.com/4qaKlKW.png"
                                    }
                                    className="drop-shadow-md w-7 h-7 object-contain mr-3"
                                    alt="Chat"
                                />

                                {conversation.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
