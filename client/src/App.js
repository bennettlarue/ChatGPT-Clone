import React, { useState } from "react";
import { Chat, Sidebar } from "./components";

function App() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const Overlay = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"></div>
    );

    return (
        <div className="relative">
            {isSidebarVisible && <Overlay />}
            <div
                className={`fixed top-0 left-0 z-20 h-full overflow-y-auto transition-transform duration-300 ${
                    isSidebarVisible ? "translate-x-0" : "-translate-x-full"
                } lg:w-72`}
                style={{
                    transition: "transform 0.3s ease-out",
                }}
            >
                <Sidebar toggleSidebar={toggleSidebar} />
            </div>
            <div
                className={`flex flex-2 transition-margin duration-300 ${
                    isSidebarVisible ? "lg:ml-72" : ""
                } relative`} // Ensure relative positioning for correct stacking context
            >
                <button
                    className={`${
                        isSidebarVisible
                            ? "ml-1 left-72 hover:-translate-x-1"
                            : "left-1 hover:translate-x-1"
                    } fixed z-30 shadow-md rounded-full p-1 border-2 border-blueBlack transition-all`}
                    style={{
                        top: "50%",
                        transition:
                            "margin-left 0.3s ease-out, transform 0.3s ease-out, left 0.3s ease-out",
                        backgroundImage:
                            "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 0%, rgb(209, 251, 155) 100.2%)",
                    }}
                    onClick={toggleSidebar}
                >
                    <img
                        src="https://i.imgur.com/HsKsQmH.png"
                        alt="toggle sidebar"
                        width={16}
                    />
                </button>
                <div className="flex-1 overflow-auto h-full">
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default App;
