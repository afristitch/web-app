"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Bell,
  User,
  ChevronDown,
  Scissors,
  Menu,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { profileService } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(user?.photoUrl || null);

  useEffect(() => {
    // Fetch up-to-date profile photo
    profileService.getMyProfile().then((res: any) => {
      const data = res?.data || res;
      const u = data?.user || data;
      if (u?.photoUrl) setPhotoUrl(u.photoUrl);
    }).catch(() => {});
  }, []);

  return (
    <header
      className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/10 bg-black/90 px-6 backdrop-blur-md text-white"
      style={{ fontFamily: 'var(--font-varela-round)' }}
    >
      {/* Left: Hamburger (mobile) + Search */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-xl border border-white/10 bg-stone-950 text-stone-300 hover:bg-white/10 hover:text-white transition-colors shadow-xs flex-shrink-0"
          aria-label="Toggle navigation"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search clients, order numbers, fabrics..."
            className="h-9.5 w-full rounded-xl border border-white/10 bg-stone-950/80 pl-10 pr-4 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/30 focus:bg-black focus:outline-none transition-all shadow-xs"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notifications Bell */}
        <Link
          href="/notifications"
          className="relative rounded-xl border border-white/10 bg-stone-950 p-2 text-stone-300 hover:bg-white/10 hover:text-white transition-colors shadow-xs"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-white ring-2 ring-black" />
        </Link>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 rounded-full border border-white/20 bg-stone-950 p-1 pl-1.5 pr-2.5 hover:bg-white/10 transition-colors shadow-xs"
          >
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={user?.name || "Profile"}
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover border border-white/20"
                unoptimized
              />
            ) : (
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[11px] font-extrabold text-black uppercase">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : "SD"}
              </div>
            )}
            <span className="text-xs font-bold text-white hidden sm:inline-block">
              {user?.name || "Master Tailor"}
            </span>
            <ChevronDown className="h-3 w-3 text-stone-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-stone-950 p-2 shadow-2xl z-40 animate-in fade-in zoom-in-95">
              <div className="px-3 py-2 border-b border-white/10 mb-1">
                <p className="text-xs font-bold text-white">{user?.name || "Master Tailor"}</p>
                <p className="text-[11px] text-stone-400 truncate">{user?.email || "tailor@sewdigital.com"}</p>
              </div>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/10"
              >
                <User className="h-3.5 w-3.5 text-stone-400" /> Account Profile
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/10"
              >
                <Scissors className="h-3.5 w-3.5 text-white" /> Subscription Plan
              </Link>
              <div className="my-1 border-t border-white/10" />
              <button
                onClick={logout}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-950/40 hover:text-red-300 transition-colors"
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
