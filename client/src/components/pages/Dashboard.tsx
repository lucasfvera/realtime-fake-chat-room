import { useEffect, useState } from "react";
import { useSocketContext } from "../../contexts/useSocketContext";
import { events } from '../../configuration/events'


interface User {
    id: string;
    name: string;
}

export const Dashboard = () => {
    const { socket } = useSocketContext();
    const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

    useEffect(() => {
        console.log("Running effect in dashboard")
        if (!socket) return;

        console.log("Emitting event")
        socket.emit(events.LOGGED_IN_USERS, (data: { users: User[] }) => {
            console.log("Ack received")
            setConnectedUsers(data.users ?? []);

        });
        // socket.on(events.LOGGED_IN_USERS, (data: { users: User[] }) => {
        //     console.log(data);
        // })
        socket.on(events.USER_LOGGED_OUT, (data: User) => {
            setConnectedUsers((prev) =>
                prev.filter((user) => user.id !== data.id)
            );
        });
        socket.on(events.USER_LOGGED_IN, (data: User) => {
            setConnectedUsers((prev) => [...prev, data]);
        });
    }, [socket]);

    return (
        <>
            <div className="flex justify-between">
                <div className="text-lg font-bold">Users</div>
                <button>Reset api</button>
                <div>
                    <span
                        className={`inline-block w-[12px] h-[12px] rounded-2xl ${connectedUsers.length > 0
                            ? "bg-green-600"
                            : "bg-red-600"
                            } mr-2`}
                    ></span>
                    {connectedUsers.length} users online
                </div>
            </div>
            <ul className="flex flex-col min-h-0 gap-4 overflow-auto">
                {connectedUsers.map((user) => (
                    <li className="bg-amber-50 rounded w-full p-2" key={user.id}>{user.name}</li>
                ))}
            </ul>
        </>
    );
};
