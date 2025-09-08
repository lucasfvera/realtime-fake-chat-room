import { useEffect, useState } from "react";
import { useSocketContext } from "../contexts/useSocketContext";

interface User {
    id: string;
    name: string;
}

export const Dashboard = () => {
    const { socket } = useSocketContext();
    const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.on("logged-in-users", (data: { users: User[] }) => {
            console.log(data);
            setConnectedUsers(data.users ?? []);
        });
        socket.on("user-logged-out", (data: User) => {
            setConnectedUsers((prev) =>
                prev.filter((user) => user.id !== data.id)
            );
        });
        socket.on("user-logged-in", (data: User) => {
            setConnectedUsers((prev) => [...prev, data]);
        });
    }, [socket]);

    return (
        <div className="bg-linear-to-r from-slate-300 to-slate-400 flex-1 rounded-2xl p-8 flex flex-col gap-4">
            <div className="flex justify-between">
                <div className="text-lg font-bold">Users</div>
                <div>
                    <span
                        className={`inline-block w-[12px] h-[12px] rounded-2xl ${
                            connectedUsers.length > 0
                                ? "bg-green-600"
                                : "bg-red-600"
                        } mr-2`}
                    ></span>
                    {connectedUsers.length} users online
                </div>
            </div>
            <ul>
                {connectedUsers.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};
