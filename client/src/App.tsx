import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { SocketContextProvider } from "./contexts/SocketContextProvider";

function App() {
    return (
        <SocketContextProvider>
            <div className="flex w-full h-full bg-linear-to-r from-slate-500 to-gray-700 p-16">
                <Sidebar />
                <Dashboard />
            </div>
        </SocketContextProvider>
    );
}

export default App;
