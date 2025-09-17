// The generated data will be an array of users
import { events } from '../configuration/events.ts'
import { type DefaultEventsMap, Server } from "socket.io";

interface User {
    name: string,
    id: string
}

export const generateRandomData = async (initialUsers: number): Promise<User[]> => {
    let loggedInUsers = [];
    for (let index = 0; index < initialUsers; index++) {
        const newUser = MOCKED_USERS[index];
        loggedInUsers.push(newUser);
    }

    return new Promise((res, rej) => {
        setTimeout(() => res(loggedInUsers), 800);
    });
};

export class ConnectedUsers {
    #users: User[] = [];
    io;

    constructor(io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io;
    }

    getLoggedUsers() {
        return this.#users;
    }

    async generateInitialUsers() {
        const MOCKED_INITIAL_USERS = 5;
        let loggedInUsers = await generateRandomData(MOCKED_INITIAL_USERS);
        this.#users = loggedInUsers;
    }

    logOutUser() {
        const timeToNextLogout = Math.floor(Math.random() * 5000) + 2000;

        const userToLogOutIndex = Math.floor(
            Math.random() * this.getLoggedUsers().length
        );
        try {
            if (this.getLoggedUsers().length > 0) {
                const loggedOutUser = this.getLoggedUsers()[userToLogOutIndex];
                this.#users = this.getLoggedUsers().filter(
                    (_, i) => i !== userToLogOutIndex
                );
                this.io.emit(events.USER_LOGGED_OUT, loggedOutUser);
            }
            setTimeout(() => this.logOutUser(), timeToNextLogout);
        } catch (e) {
            console.error(e);
            // set another timeout to retry
        }
    }

    logInUser() {
        const timeToNextLogIn = Math.floor(Math.random() * 5000);

        try {
            const loggedOutUsers = MOCKED_USERS.filter(
                (user) => !this.getLoggedUsers().some((u) => u.id === user.id)
            );
            if (loggedOutUsers.length > 0) {
                const userToLogInIndex = Math.floor(
                    Math.random() * loggedOutUsers.length
                );
                this.#users.push(loggedOutUsers[userToLogInIndex]);
                this.io.emit(events.USER_LOGGED_IN, loggedOutUsers[userToLogInIndex]);
            }
            setTimeout(() => this.logInUser(), timeToNextLogIn);
        } catch (e) {
            console.error(e);
            // set another timeout
        }
    }
}

export const MOCKED_USERS = [
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-10e11f12a13b", name: "Alice" },
    { id: "b2c3d4e5-f6a7-4b8c-9d10-e11f12a13b14", name: "Bob" },
    { id: "c3d4e5f6-a7b8-4c9d-10e1-1f12a13b14c1", name: "Charlie" },
    { id: "d4e5f6a7-b8c9-4d10-e11f-12a13b14c1d2", name: "David" },
    { id: "e5f6a7b8-c9d1-4e11-f12a-13b14c1d2e3f", name: "Eve" },
    { id: "f6a7b8c9-d1e2-4f13-a14b-15c16d17e18f", name: "Frank" },
    { id: "a7b8c9d1-e2f3-4a14-b15c-16d17e18f19a", name: "Grace" },
    { id: "b8c9d1e2-f3a4-4b15-c16d-17e18f19a1b2", name: "Heidi" },
    { id: "c9d1e2f3-a4b5-4c16-d17e-18f19a1b2c3d", name: "Ivan" },
    { id: "d1e2f3a4-b5c6-4d17-e18f-19a1b2c3d4e5", name: "Judy" },
    { id: "e2f3a4b5-c6d7-4e18-f19a-1b2c3d4e5f6a", name: "Kevin" },
    { id: "f3a4b5c6-d7e8-4f19-a1b2-c3d4e5f6a7b8", name: "Linda" },
    { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Mike" },
    { id: "b5c6d7e8-f9a1-4b2c-3d4e-5f6a7b8c9d1e", name: "Nancy" },
    { id: "c6d7e8f9-a1b2-4c3d-4e5f-6a7b8c9d1e2f", name: "Oscar" },
    { id: "d7e8f9a1-b2c3-4d4e-5f6a-7b8c9d1e2f3a", name: "Peggy" },
    { id: "e8f9a1b2-c3d4-4e5f-6a7b-8c9d1e2f3a4b", name: "Quentin" },
    { id: "f9a1b2c3-d4e5-4f6a-7b8c-9d1e2f3a4b5c", name: "Rachel" },
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", name: "Steve" },
    { id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e", name: "Tina" },
    { id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f", name: "Victor" },
    { id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a", name: "Wendy" },
    { id: "e5f6a7b8-c9d1-4e2f-3a4b-5c6d7e8f9a1b", name: "Xavier" },
    { id: "f6a7b8c9-d1e2-4f3a-4b5c-6d7e8f9a1b2c", name: "Yvonne" },
    { id: "a7b8c9d1-e2f3-4a4b-5c6d-7e8f9a1b2c3d", name: "Zack" },
    { id: "b8c9d1e2-f3a4-4b5c-6d7e-8f9a1b2c3d4e", name: "Anna" },
    { id: "c9d1e2f3-a4b5-4c6d-7e8f-9a1b2c3d4e5f", name: "Ben" },
    { id: "d1e2f3a4-b5c6-4d7e-8f9a-1b2c3d4e5f6a", name: "Catherine" },
    { id: "e2f3a4b5-c6d7-4e8f-9a1b-2c3d4e5f6a7b", name: "Daniel" },
    { id: "f3a4b5c6-d7e8-4f9a-1b2c-3d4e5f6a7b8c", name: "Eva" },
    { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Felix" },
    { id: "b5c6d7e8-f9a1-4b2c-3d4e-5f6a7b8c9d1e", name: "Gina" },
    { id: "c6d7e8f9-a1b2-4c3d-4e5f-6a7b8c9d1e2f", name: "Harry" },
    { id: "d7e8f9a1-b2c3-4d4e-5f6a-7b8c9d1e2f3a", name: "Iris" },
    { id: "e8f9a1b2-c3d4-4e5f-6a7b-8c9d1e2f3a4b", name: "Jack" },
    { id: "f9a1b2c3-d4e5-4f6a-7b8c-9d1e2f3a4b5c", name: "Karen" },
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", name: "Larry" },
    { id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e", name: "Megan" },
    { id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f", name: "Nathan" },
    { id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a", name: "Olivia" },
    { id: "e5f6a7b8-c9d1-4e2f-3a4b-5c6d7e8f9a1b", name: "Peter" },
    { id: "f6a7b8c9-d1e2-4f3a-4b5c-6d7e8f9a1b2c", name: "Quinn" },
    { id: "a7b8c9d1-e2f3-4a4b-5c6d-7e8f9a1b2c3d", name: "Rose" },
    { id: "b8c9d1e2-f3a4-4b5c-6d7e-8f9a1b2c3d4e", name: "Sam" },
    { id: "c9d1e2f3-a4b5-4c6d-7e8f-9a1b2c3d4e5f", name: "Teresa" },
    { id: "d1e2f3a4-b5c6-4d7e-8f9a-1b2c3d4e5f6a", name: "Ulysses" },
    { id: "e2f3a4b5-c6d7-4e8f-9a1b-2c3d4e5f6a7b", name: "Violet" },
    { id: "f3a4b5c6-d7e8-4f9a-1b2c-3d4e5f6a7b8c", name: "Will" },
    { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Zara" },
    { id: "b5c6d7e8-f9a1-4b2c-3d4e-5f6a7b8c9d1e", name: "Adam" },
    { id: "c6d7e8f9-a1b2-4c3d-4e5f-6a7b8c9d1e2f", name: "Beth" },
    { id: "d7e8f9a1-b2c3-4d4e-5f6a-7b8c9d1e2f3a", name: "Charles" },
    { id: "e8f9a1b2-c3d4-4e5f-6a7b-8c9d1e2f3a4b", name: "Diana" },
    { id: "f9a1b2c3-d4e5-4f6a-7b8c-9d1e2f3a4b5c", name: "Eric" },
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", name: "Fiona" },
    { id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e", name: "George" },
    { id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f", name: "Helen" },
    { id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a", name: "Ian" },
    { id: "e5f6a7b8-c9d1-4e2f-3a4b-5c6d7e8f9a1b", name: "Julia" },
    { id: "f6a7b8c9-d1e2-4f3a-4b5c-6d7e8f9a1b2c", name: "Kyle" },
    { id: "a7b8c9d1-e2f3-4a4b-5c6d-7e8f9a1b2c3d", name: "Laura" },
    { id: "b8c9d1e2-f3a4-4b5c-6d7e-8f9a1b2c3d4e", name: "Mark" },
    { id: "c9d1e2f3-a4b5-4c6d-7e8f-9a1b2c3d4e5f", name: "Nora" },
    { id: "d1e2f3a4-b5c6-4d7e-8f9a-1b2c3d4e5f6a", name: "Paul" },
    { id: "e2f3a4b5-c6d7-4e8f-9a1b-2c3d4e5f6a7b", name: "Queen" },
    { id: "f3a4b5c6-d7e8-4f9a-1b2c-3d4e5f6a7b8c", name: "Robert" },
    { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Sara" },
    { id: "b5c6d7e8-f9a1-4b2c-3d4e-5f6a7b8c9d1e", name: "Tom" },
    { id: "c6d7e8f9-a1b2-4c3d-4e5f-6a7b8c9d1e2f", name: "Ursula" },
    { id: "d7e8f9a1-b2c3-4d4e-5f6a-7b8c9d1e2f3a", name: "Vincent" },
    { id: "e8f9a1b2-c3d4-4e5f-6a7b-8c9d1e2f3a4b", name: "Wanda" },
    { id: "f9a1b2c3-d4e5-4f6a-7b8c-9d1e2f3a4b5c", name: "Xena" },
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", name: "Yusuf" },
    { id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e", name: "Zoe" },
    { id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f", name: "Alex" },
    { id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a", name: "Brittany" },
    { id: "e5f6a7b8-c9d1-4e2f-3a4b-5c6d7e8f9a1b", name: "Chris" },
    { id: "f6a7b8c9-d1e2-4f3a-4b5c-6d7e8f9a1b2c", name: "Dawn" },
    { id: "a7b8c9d1-e2f3-4a4b-5c6d-7e8f9a1b2c3d", name: "Edward" },
    { id: "b8c9d1e2-f3a4-4b5c-6d7e-8f9a1b2c3d4e", name: "Faith" },
    { id: "c9d1e2f3-a4b5-4c6d-7e8f-9a1b2c3d4e5f", name: "Gabriel" },
    { id: "d1e2f3a4-b5c6-4d7e-8f9a-1b2c3d4e5f6a", name: "Hannah" },
    { id: "e2f3a4b5-c6d7-4e8f-9a1b-2c3d4e5f6a7b", name: "Isaac" },
    { id: "f3a4b5c6-d7e8-4f9a-1b2c-3d4e5f6a7b8c", name: "Jasmine" },
    { id: "a4b5c6d7-e8f9-4a1b-2c3d-4e5f6a7b8c9d", name: "Karl" },
    { id: "b5c6d7e8-f9a1-4b2c-3d4e-5f6a7b8c9d1e", name: "Leah" },
    { id: "c6d7e8f9-a1b2-4c3d-4e5f-6a7b8c9d1e2f", name: "Matthew" },
    { id: "d7e8f9a1-b2c3-4d4e-5f6a-7b8c9d1e2f3a", name: "Natalie" },
    { id: "e8f9a1b2-c3d4-4e5f-6a7b-8c9d1e2f3a4b", name: "Omar" },
    { id: "f9a1b2c3-d4e5-4f6a-7b8c-9d1e2f3a4b5c", name: "Paige" },
    { id: "a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d", name: "Rebecca" },
    { id: "b2c3d4e5-f6a7-4b8c-9d1e-2f3a4b5c6d7e", name: "Scott" },
    { id: "c3d4e5f6-a7b8-4c9d-1e2f-3a4b5c6d7e8f", name: "Sophia" },
    { id: "d4e5f6a7-b8c9-4d1e-2f3a-4b5c6d7e8f9a", name: "Timothy" },
    { id: "e5f6a7b8-c9d1-4e2f-3a4b-5c6d7e8f9a1b", name: "Valerie" },
    { id: "f6a7b8c9-d1e2-4f3a-4b5c-6d7e8f9a1b2c", name: "Wayne" },
    { id: "a7b8c9d1-e2f3-4a4b-5c6d-7e8f9a1b2c3d", name: "Chloe" },
    { id: "b8c9d1e2-f3a4-4b5c-6d7e-8f9a1b2c3d4e", name: "Derek" },
    { id: "c9d1e2f3-a4b5-4c6d-7e8f-9a1b2c3d4e5f", name: "Eliza" },
    { id: "d1e2f3a4-b5c6-4d7e-8f9a-1b2c3d4e5f6a", name: "Frankie" },
];
