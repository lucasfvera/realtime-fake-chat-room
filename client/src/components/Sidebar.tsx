import type { RouterProps } from "./Router";


export const Sidebar = ({ setRoute }: { setRoute: React.Dispatch<React.SetStateAction<RouterProps>> }) => {
    return (
        <nav className="flex w-fit mr-16">
            <ul className="bg-linear-to-r from-slate-300 to-slate-400 max-h-fit flex flex-col gap-12 p-12 rounded-2xl shadow-2xl">
                <li onClick={() => { setRoute({ route: 'dashboard' }) }} className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Dashboard
                </li>
                <li className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Chat Rooms
                </li>
                <li onClick={() => { setRoute({ route: 'deals' }) }} className="p-4 rounded-xl bg-white/20 hover:bg-white/40 cursor-pointer transition-all">
                    Deals
                </li>
            </ul>
        </nav>
    );
};
