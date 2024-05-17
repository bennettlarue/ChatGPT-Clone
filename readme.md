# ChatGPT Clone

## Introduction

This project is a functional clone of the popular ChatGPT AI assistant, built using React, Tailwind CSS, Express, MongoDB, and the OpenAI API. It provides users with a seamless and interactive experience, allowing them to engage in natural language conversations with an AI-powered chatbot.

The project showcases a clean and responsive user interface, ensuring a smooth and user-friendly experience across various devices and screen sizes. 

## 🚀 Features

- **Conversation Creation:** Users can create new conversations and name them according to their preferences.
- **Predefined Personalities:** Select from several pre-made personalities for the chatbot to assume during the conversation.
- **Natural Language Processing:** Powered by the OpenAI API, the chatbot can understand and respond to natural language queries with human-like comprehension.
- **Responsive Design:** The application's user interface is built with a mobile-first approach, ensuring optimal usability across different devices and screen sizes.
- **Conversation History:** Users can access their previous conversations through a togglable sidebar, allowing for seamless navigation and continuation of past discussions.

## 🛠️ Technologies Used

- **🌐 Frontend:**
 - **React.js** for building the user interface.
 - **Tailwind CSS** for styling and responsive design.

- **⚙️ Backend:**
 - **Node.js** with **Express.js** for server-side logic and API handling.

- **📦 Database:**
 - **MongoDB** for storing conversation data and user preferences.

- **🧠 AI Integration:**
 - **OpenAI API** for natural language processing and generating intelligent responses.

## 💻 Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine.
2. Install the required dependencies by running `npm install` in both the `client` and `server` directories.
3. Set up your MongoDB database and obtain an OpenAI API key.
4. In the `server` directory, create a `.env` file and add the following environment variables:
  - `MONGO_URI={your MongoDB connection string}`
  - `REACT_APP_OPENAI_API_KEY={your OpenAI API key}`
5. Start the development server by running `npm start` in both the `client` and `server` directories.

## 🤝 Contributing

Contributions to this project are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).