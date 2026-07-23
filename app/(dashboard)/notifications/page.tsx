"use client";

import React, { useState } from "react";
import { ShoppingBag, Wallet, Clock, CheckCircle2 } from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "order" | "payment" | "fitting";
  read: boolean;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "n1",
      title: "New Payment Deposit Recorded",
      description: "Amina Bello recorded a deposit payment of ₦95,000 for Order ORD-2026-001.",
      time: "2 hours ago",
      type: "payment",
      read: false,
    },
    {
      id: "n2",
      title: "Fitting Session Reminder",
      description: "Babajide Adeleke is scheduled for a fitting session today at 2:00 PM.",
      time: "5 hours ago",
      type: "fitting",
      read: false,
    },
    {
      id: "n3",
      title: "Order Status Updated",
      description: "Order ORD-2026-004 (Navy Blue Tuxedo) moved to Completed status.",
      time: "1 day ago",
      type: "order",
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Notifications Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time notifications for client fitting reminders, order updates, and payment receipts.
          </p>
        </div>

        <button
          onClick={markAllRead}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-slate-500" />
          Mark All as Read
        </button>
      </div>

      <div className="max-w-3xl rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden divide-y divide-slate-100">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-3.5 transition-colors ${
              n.read ? "bg-white" : "bg-slate-50/70"
            }`}
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-xl shrink-0 font-bold text-xs ${
                n.type === "payment"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                  : n.type === "fitting"
                  ? "bg-amber-50 text-amber-700 border border-amber-200/60"
                  : "bg-blue-50 text-blue-700 border border-blue-200/60"
              }`}
            >
              {n.type === "payment" ? (
                <Wallet className="h-4 w-4" />
              ) : n.type === "fitting" ? (
                <Clock className="h-4 w-4" />
              ) : (
                <ShoppingBag className="h-4 w-4" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">{n.time}</span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 font-medium">{n.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
