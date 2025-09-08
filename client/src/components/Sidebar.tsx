export const Sidebar = () => {
    return (
        <nav className="flex w-fit mr-16">
            <ul className="bg-linear-to-r from-slate-300 to-slate-400 max-h-fit flex flex-col gap-12 p-12 rounded-2xl shadow-2xl">
                <li className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Dashboard
                </li>
                <li className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Chat Rooms
                </li>
                <li className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Settings
                </li>
            </ul>
        </nav>
    );
};
