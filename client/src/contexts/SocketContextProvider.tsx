import { useEffect, useState, type ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";

export const SocketContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const newSocket = io(import.meta.env.VITE_WEBSOCKET_URL);
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return <SocketContext value={{ socket: socket }}>{children}</SocketContext>;
};
