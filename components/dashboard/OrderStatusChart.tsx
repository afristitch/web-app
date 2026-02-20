"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
    { name: "Pending", value: 400, color: "#f59e0b" },
    { name: "In Progress", value: 300, color: "#3b82f6" },
    { name: "Completed", value: 300, color: "#10b981" },
    { name: "Delivered", value: 200, color: "#6366f1" },
];

export function OrderStatusChart() {
    return (
        <div className="h-[350px] w-full rounded-2xl border bg-white p-6 shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="mb-6 text-lg font-semibold text-zinc-900 dark:text-white">Order Status</h3>
            <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: "12px",
                            border: "none",
                            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                            backgroundColor: "white"
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
