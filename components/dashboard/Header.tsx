"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Scissors,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200/80 bg-white px-6 backdrop-blur-md">
      {/* Left: Global Search Bar */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search clients, order numbers, fabrics..."
            className="h-9.5 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:bg-white focus:outline-none transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <Link
          href="/notifications"
          className="relative rounded-xl border border-slate-200/80 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-xs"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-slate-900 ring-2 ring-white" />
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-full border border-slate-200/80 p-1 pl-1.5 pr-2.5 hover:bg-slate-50 transition-colors shadow-xs"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] font-bold text-white">
              {user?.name ? user.name.slice(0, 2).toUpperCase() : "SD"}
            </div>
            <span className="text-xs font-semibold text-slate-800 hidden sm:inline-block">
              {user?.name || "Master Tailor"}
            </span>
            <ChevronDown className="h-3 w-3 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-40 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-slate-100 mb-1">
                <p className="text-xs font-bold text-slate-900">{user?.name || "Master Tailor"}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || "tailor@sewdigital.com"}</p>
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <User className="h-3.5 w-3.5 text-slate-400" /> Account Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
              >
                <Scissors className="h-3.5 w-3.5 text-slate-700" /> Subscription Plan
              </Link>
              <div className="my-1 border-t border-slate-100" />
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
