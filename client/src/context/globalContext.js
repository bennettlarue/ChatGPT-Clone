import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

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
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            const newUserId = uuidv4();
            setUserId(newUserId);
            localStorage.setItem("userId", newUserId);
        }
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                currentConversation,
                setCurrentConversation,
                refreshConversations,
                setRefreshConversations,
                userId,
                setUserId,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalContext;
