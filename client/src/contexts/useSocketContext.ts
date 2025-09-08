import { useContext } from "react";
import { SocketContext } from "./SocketContext";

export const useSocketContext = () => {
    const context = useContext(SocketContext);

    if (!context) throw new Error("Must be used inside the provider");

    return context;
};
