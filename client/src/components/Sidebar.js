import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/globalContext";

const Sidebar = ({ toggleSidebar, isSidebarVisible }) => {
    const {
        currentConversation,
        setCurrentConversation,
        refreshConversations,
        userId,
    } = useContext(GlobalContext);

    const [conversationList, setConversationList] = useState([]);

    const fetchConversations = () => {
        if (userId) {
            // Fetch conversations from the backend only when userId is available
            fetch(`https://gpt-server.bennettlarue.com/conversation/${userId}`)
                .then((response) => response.json())
                .then((data) => {
                    setConversationList(data);
                })
                .catch((error) =>
                    console.error("Error fetching conversations: ", error)
                );
        }
    };

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (isSidebarVisible && width >= 640 && width <= 767) {
                toggleSidebar();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [toggleSidebar, isSidebarVisible]);

    useEffect(() => {
        // Fetch conversations when either refreshConversations or userId changes
        fetchConversations();
    }, [refreshConversations, userId]);

    return (
        <div className=" bg-darkerBlueBlack min-h-screen w-72 text-white transition-all duration-400">
            <div>
                <button
                    onClick={() => {
                        // Reset current conversation and toggle sidebar visibility
                        setCurrentConversation({});
                        const width = window.innerWidth;
                        // Check if the width is within the range of Tailwind's "sm" and "md" breakpoints
                        if (isSidebarVisible && width >= 640 && width <= 767) {
                            toggleSidebar();
                        }
                    }}
                >
                    <div className="font-bold m-3 rounded-xl p-3 flex justify-center text-black w-64 btn-hover color-1">
                        Create New +
                    </div>
                </button>

                <div>
                    {conversationList.map((conversation) => (
                        <div
                            className={
                                conversation._id === currentConversation._id
                                    ? "m-2 mt-1 p-2 bg-cream text-black rounded-lg cursor-pointer"
                                    : "m-2 mt-1 p-2 transition-all duration-400 hover:bg-lightBlack rounded-lg cursor-pointer"
                            }
                            onClick={() => {
                                // Set current conversation and toggle sidebar visibility
                                setCurrentConversation(conversation);
                                const width = window.innerWidth;
                                // Check if the width is within the range of Tailwind's "sm" and "md" breakpoints
                                if (
                                    isSidebarVisible &&
                                    width >= 640 &&
                                    width <= 767
                                ) {
                                    toggleSidebar();
                                }
                                fetchConversations();
                            }}
                        >
                            <div key={conversation._id} className="flex">
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
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
