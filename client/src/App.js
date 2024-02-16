import React, { useState } from "react";
import { Chat, Sidebar } from "./components";

function App() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    // Assuming Overlay is defined somewhere above or externally
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
                <Sidebar />
            </div>
            <div
                className={`flex flex-1 transition-margin duration-300 ${
                    isSidebarVisible ? "lg:ml-72" : ""
                } relative`} // Ensure relative positioning for correct stacking context
            >
                <button
                    className={`bg-modernGray top-5 ${
                        isSidebarVisible
                            ? "left-80 hover:-translate-x-4"
                            : "left-5 hover:translate-x-4"
                    } fixed z-30 shadow-md rounded-full p-3 border-2 border-blueBlack transition-all`} // Ensure button is above overlay with z-30
                    style={{
                        transition:
                            "margin-left 0.3s ease-out, transform 0.3s ease-out, left 0.3s ease-out",
                    }}
                    onClick={toggleSidebar}
                >
                    <img
                        src="https://i.imgur.com/HsKsQmH.png"
                        alt="toggle sidebar"
                        width={30}
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
