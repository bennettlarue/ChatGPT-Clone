import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GlobalProvider } from "./context/globalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <head>
            <link
                href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap"
                rel="stylesheet"
            />
        </head>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </React.StrictMode>
);
