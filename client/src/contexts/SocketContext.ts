import { createContext } from "react";
import type { Socket } from "socket.io-client";

export const SocketContext = createContext<{ socket: Socket | null } | null>(
    null
);
