"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Mon", total: 2400 },
    { name: "Tue", total: 1398 },
    { name: "Wed", total: 9800 },
    { name: "Thu", total: 3908 },
    { name: "Fri", total: 4800 },
    { name: "Sat", total: 3800 },
    { name: "Sun", total: 4300 },
];

export function RevenueChart() {
    return (
        <div className="h-[350px] w-full rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">Revenue Overview</h3>
            <ResponsiveContainer width="100%" height="80%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#000000" stopOpacity={0.1} />
                            <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                    />
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            backgroundColor: "white"
                        }}
                    />
                    <Area
                        type="monotone"
                        dataKey="total"
                        stroke="#000000"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                        className="dark:stroke-white dark:fill-white/10"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
