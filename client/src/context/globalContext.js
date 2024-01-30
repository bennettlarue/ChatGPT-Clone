import { createContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [currentConversation, setCurrentConversation] = useState({});

    return (
        <GlobalContext.Provider
            value={{ currentConversation, setCurrentConversation }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
