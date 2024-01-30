import { Chat, Sidebar } from "./components";

function App() {
    return (
        <div className="">
            {/* Grid to contain all elements */}
            <div className="flex">
                <Sidebar />
                <div className="bg-cream w-screen">
                    <Chat />
                </div>
            </div>
        </div>
    );
}

export default App;
