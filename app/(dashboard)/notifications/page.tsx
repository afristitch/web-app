"use client";

import React, { useEffect, useState } from "react";
import { Bell, CheckCircle2, BellOff, Loader2 } from "lucide-react";
import { notificationService } from "@/lib/services";
import { NotificationItem } from "@/lib/types";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchNotifications = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1 && !append) setLoading(true);
      else setLoadingMore(true);

      const res = await notificationService.getNotifications(pageNum, 20);
      if (res) {
        const items = res.notifications || [];
        if (append) {
          setNotifications((prev) => [...prev, ...items]);
        } else {
          setNotifications(items);
        }
        if (res.pagination) {
          setTotalPages(res.pagination.totalPages || 1);
          setPage(res.pagination.page || 1);
        }
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchNotifications(1);
  }, []);

  const markAllRead = async () => {
    setMarking(true);
    try {
      await notificationService.markAllAsRead();
      setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    } finally {
      setMarking(false);
    }
  };

  const markOneRead = async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(notifications.map((n) => n._id === id ? { ...n, isRead: true } : n));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      fetchNotifications(page + 1, true);
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHrs = Math.floor(diffMins / 60);
      if (diffHrs < 24) return `${diffHrs}h ago`;
      const diffDays = Math.floor(diffHrs / 24);
      if (diffDays < 7) return `${diffDays}d ago`;
      return date.toLocaleDateString(undefined, { day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Notifications Center
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            View order updates, fitting reminders, and payment notifications from your backend.
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllRead}
            disabled={marking}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-50"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            {marking ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-3.5 w-3.5" />
            )}
            Mark All as Read
          </button>
        )}
      </div>

      {loading ? (
        <div className="py-16 text-center text-xs text-stone-400 font-medium">
          Fetching notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-400">
            <BellOff className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            No Notifications
          </h3>
          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
            You&apos;re all caught up! New notifications will appear here when orders, fittings, or payments are processed.
          </p>
        </div>
      ) : (
        <div className="max-w-4xl rounded-3xl border border-white/10 bg-stone-950 shadow-xl overflow-hidden divide-y divide-white/5">
          {notifications.map((n) => (
            <button
              key={n._id}
              onClick={() => !n.isRead && markOneRead(n._id)}
              className={`w-full text-left p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                n.isRead ? "bg-stone-950" : "bg-white/[0.03] hover:bg-white/[0.06]"
              }`}
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl shrink-0 bg-white/10 border border-white/20 text-white">
                <Bell className="h-5 w-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-bold text-white uppercase truncate" style={{ fontFamily: 'var(--font-varela-round)' }}>
                    {n.title}
                  </h4>
                  <span className="text-[11px] text-stone-400 font-medium shrink-0">
                    {formatTime(n.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-stone-300 mt-1 font-medium leading-relaxed">
                  {n.message}
                </p>
                {!n.isRead && (
                  <span className="inline-block mt-2 text-[10px] font-bold text-white bg-white/10 border border-white/20 px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                )}
              </div>
            </button>
          ))}

          {page < totalPages && (
            <div className="p-4 text-center">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer disabled:opacity-50"
              >
                {loadingMore ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : null}
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
