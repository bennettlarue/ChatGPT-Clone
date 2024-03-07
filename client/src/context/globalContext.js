import { createContext, useState } from "react";

const GlobalContext = createContext();

/**
 * GlobalProvider component that provides global state using React Context API.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child components.
 * @returns {React.ReactNode} The rendered component.
 */
export const GlobalProvider = ({ children }) => {
    const [currentConversation, setCurrentConversation] = useState({});
    const [refreshConversations, setRefreshConversations] = useState(false);

    return (
        <GlobalContext.Provider
            value={{
                currentConversation,
                setCurrentConversation,
                refreshConversations,
                setRefreshConversations,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
