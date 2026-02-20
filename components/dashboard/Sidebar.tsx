"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Globe,
    Users2,
    BarChart2,
    Settings,
    LogOut,
    Scissors,
    MessageSquare,
    Boxes
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Global Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Organizations", href: "/organizations", icon: Globe },
    { name: "Global Members", href: "/clients", icon: Users2 },
    { name: "Platform Plans", href: "/plans", icon: Boxes },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Analytics", href: "/reports", icon: BarChart2 },
    { name: "Configuration", href: "/settings", icon: Settings },
];

import { useAuth } from "@/context/AuthContext";

export function Sidebar() {
    const pathname = usePathname();
    const { organization, logout } = useAuth();

    return (
        <div className="flex h-full w-60 flex-col border-r border-slate-100 bg-white font-sans transition-all">
            <div className="flex h-20 items-center px-6">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-sm">
                        <Scissors className="h-5 w-5" />
                    </div>
                    <div>
                        <span className="block text-sm font-bold tracking-tight text-slate-900">
                            SewPortal
                        </span>
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                            Management
                        </span>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 space-y-0.5 px-3 py-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "group flex items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold transition-all hover:bg-slate-50",
                                isActive
                                    ? "bg-slate-900 text-white shadow-md shadow-slate-200 hover:bg-slate-800"
                                    : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            <item.icon className={cn(
                                "h-4.5 w-4.5 transition-colors",
                                isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"
                            )} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto p-4">
                <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 mb-4">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Support</p>
                    <p className="text-[12px] text-slate-600 font-medium">Need any help with the platform?</p>
                    <button className="mt-2 text-[12px] font-bold text-slate-900 hover:underline">Support Hub</button>
                </div>
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600"
                >
                    <LogOut className="h-4.5 w-4.5" />
                    Sign Out
                </button>
            </div>

            <div className="px-6 py-4 opacity-30">
                <p className="text-[10px] font-medium text-slate-400">© 2026 SewPortal v2.0</p>
            </div>
        </div>
    );
}
