import type { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
    return <div className="bg-linear-to-r from-slate-300 to-slate-400 flex-1 rounded-2xl p-8 flex flex-col gap-4">
        {children}
    </div>
}