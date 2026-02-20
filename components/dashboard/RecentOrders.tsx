"use client";

import { formatDate, formatCurrency, cn } from "@/lib/utils";

const orders = [
    { id: "ORD-001", client: "John Doe", status: "pending", amount: 120, dueDate: "2024-03-25" },
    { id: "ORD-002", client: "Jane Smith", status: "in-progress", amount: 350, dueDate: "2024-03-22" },
    { id: "ORD-003", client: "Alice Brown", status: "completed", amount: 200, dueDate: "2024-03-20" },
    { id: "ORD-004", client: "Robert Wilson", status: "delivered", amount: 450, dueDate: "2024-03-18" },
    { id: "ORD-005", client: "Sarah Miller", status: "in-progress", amount: 180, dueDate: "2024-03-28" },
];

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50",
    "in-progress": "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/50",
    completed: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50",
    delivered: "bg-zinc-50 text-zinc-700 border-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700",
};

import { Order, Client } from "@/lib/types";

export function RecentOrders({ orders: initialOrders }: { orders?: Order[] }) {
    const defaultOrders: Partial<Order>[] = [
        { _id: "1", orderNumber: "ORD-001", client: { name: "John Doe" } as Client, status: "pending", amount: 120, dueDate: "2024-03-25" },
        { _id: "2", orderNumber: "ORD-002", client: { name: "Jane Smith" } as Client, status: "in-progress", amount: 350, dueDate: "2024-03-22" },
        { _id: "3", orderNumber: "ORD-003", client: { name: "Alice Brown" } as Client, status: "completed", amount: 200, dueDate: "2024-03-20" },
        { _id: "4", orderNumber: "ORD-004", client: { name: "Robert Wilson" } as Client, status: "delivered", amount: 450, dueDate: "2024-03-18" },
        { _id: "5", orderNumber: "ORD-005", client: { name: "Sarah Miller" } as Client, status: "in-progress", amount: 180, dueDate: "2024-03-28" },
    ];

    const orders = initialOrders?.length ? initialOrders : (defaultOrders as Order[]);

    return (
        <div className="rounded-2xl border bg-white shadow-sm dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between border-b px-6 py-4 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">Recent Orders</h3>
                <button className="text-sm font-medium text-zinc-500 hover:text-black dark:hover:text-white">
                    View All
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b bg-zinc-50/50 text-zinc-500 dark:bg-zinc-800/50 dark:border-zinc-800 dark:text-zinc-400">
                            <th className="px-6 py-3 font-medium">Order ID</th>
                            <th className="px-6 py-3 font-medium">Client</th>
                            <th className="px-6 py-3 font-medium">Status</th>
                            <th className="px-6 py-3 font-medium">Amount</th>
                            <th className="px-6 py-3 font-medium">Due Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y dark:divide-zinc-800">
                        {orders.map((order) => (
                            <tr key={order._id} className="transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                                <td className="whitespace-nowrap px-6 py-4 font-medium text-zinc-900 dark:text-white">
                                    {order.orderNumber}
                                </td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">
                                    {typeof order.client === 'string' ? order.client : order.client.name}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={cn(
                                        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                                        statusStyles[order.status as keyof typeof statusStyles] || statusStyles.pending
                                    )}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-zinc-900 dark:text-white">{formatCurrency(order.amount)}</td>
                                <td className="px-6 py-4 text-zinc-600 dark:text-zinc-400">{formatDate(order.dueDate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
