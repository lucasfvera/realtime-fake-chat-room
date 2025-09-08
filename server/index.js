import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import { ConnectedUsers } from "./utils/api.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const __dirname = dirname(fileURLToPath(import.meta.url));

let openConnections = [];

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"));
});

const UsersLogged = new ConnectedUsers(io);

UsersLogged.generateInitialUsers();

// We simulate a random user logging out every X amount of time
UsersLogged.logOutUser();
// And a user logging in every X amount of time
UsersLogged.logInUser();

io.on("connection", async (socket) => {
    console.log("connection established id: ", socket.id);
    // console.log("logged in users", UsersLogged.getLoggedUsers());
    openConnections.push(socket.id);
    io.emit("logged-in-users", { users: UsersLogged.getLoggedUsers() });

    socket.on("disconnect", () => {
        openConnections = openConnections.filter((u) => u !== socket.id);
        console.log("connection ended id: ", socket.id);
    });
});

const PORT = 5001;

server.listen(PORT, () => {
    console.log("server running at http://localhost:" + PORT);
});
