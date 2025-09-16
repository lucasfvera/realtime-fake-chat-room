import "./App.css";
import { Sidebar } from "./components/Sidebar";
import { SocketContextProvider } from "./contexts/SocketContextProvider";
import { useState } from "react";
import { Router, type RouterProps } from "./components/Router";
import { Layout } from "./components/Layout";


function App() {
    const [router, setRouter] = useState<RouterProps>({
        route: 'dashboard'
    })


    return (
        <SocketContextProvider>
            <div className="flex w-full h-full bg-linear-to-r from-slate-500 to-gray-700 p-16">
                <Sidebar setRoute={setRouter} />
                <Layout>
                    <Router route={router.route} />
                </Layout>
            </div>
        </SocketContextProvider>
    );
}

export default App;
