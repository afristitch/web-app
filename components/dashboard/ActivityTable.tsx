"use client";

import { Eye } from "lucide-react";

interface Activity {
    id: string;
    user: {
        name: string;
        avatar: string;
        email: string;
    };
    date: string;
    action: string;
    location: string;
}

const mockActivities: Activity[] = [
    {
        id: "1",
        user: { name: "Danielle Stewart", avatar: "https://i.pravatar.cc/150?u=1", email: "d.stew@gmail.com" },
        date: "02 Jul, 2025",
        action: "Subscription Upgraded",
        location: "USA"
    },
    {
        id: "2",
        user: { name: "Thomas Walsh", avatar: "https://i.pravatar.cc/150?u=2", email: "t.walsh@gmail.com" },
        date: "02 Jul, 2025",
        action: "New Order Created",
        location: "UK"
    },
    {
        id: "3",
        user: { name: "Guy Hawkins", avatar: "https://i.pravatar.cc/150?u=3", email: "guy.h@gmail.com" },
        date: "01 Jul, 2025",
        action: "Login Attempt",
        location: "USA"
    },
    {
        id: "4",
        user: { name: "Cameron Williamson", avatar: "https://i.pravatar.cc/150?u=4", email: "cam.w@gmail.com" },
        date: "01 Jul, 2025",
        action: "Profile Updated",
        location: "CA"
    }
];

export function ActivityTable() {
    return (
        <div className="rounded-2xl border border-slate-100 bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-50 px-5 py-4">
                <h3 className="text-sm font-bold text-slate-900">Recent Activities</h3>
                <div className="flex gap-2">
                    <button className="text-[11px] font-bold text-slate-400 hover:text-slate-900 underline">View all</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-[12px]">
                    <thead>
                        <tr className="border-b border-slate-50 bg-slate-50/30 text-slate-400">
                            <th className="px-5 py-3 font-semibold">User</th>
                            <th className="px-5 py-3 font-semibold">Date</th>
                            <th className="px-5 py-3 font-semibold">Action</th>
                            <th className="px-5 py-3 font-semibold">Location</th>
                            <th className="px-5 py-3 font-semibold"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {mockActivities.map((activity) => (
                            <tr key={activity.id} className="group transition-colors hover:bg-slate-50/50">
                                <td className="px-5 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">
                                            <img src={activity.user.avatar} alt={activity.user.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900">{activity.user.name}</p>
                                            <p className="text-[10px] text-slate-400">{activity.user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-3 text-slate-600 font-medium">{activity.date}</td>
                                <td className="px-5 py-3">
                                    <span className="inline-flex rounded-lg bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
                                        {activity.action}
                                    </span>
                                </td>
                                <td className="px-5 py-3 text-slate-500 font-medium">{activity.location}</td>
                                <td className="px-5 py-3 text-right">
                                    <button className="rounded-lg p-1.5 text-slate-300 hover:bg-white hover:text-slate-900 hover:shadow-sm">
                                        <Eye className="h-3.5 w-3.5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
