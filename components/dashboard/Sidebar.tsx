"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Ruler,
  Receipt,
  Briefcase,
  UserCheck,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { organizationService } from "@/lib/services";

const navigationGroups = [
  {
    title: "Document and Essentials",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Clients", href: "/clients", icon: Users },
      { name: "Orders", href: "/orders", icon: ShoppingBag },
      { name: "Measurements", href: "/measurements", icon: Ruler },
    ],
  },
  {
    title: "Financials",
    items: [
      { name: "Invoices & Revenue", href: "/finances", icon: Receipt },
    ],
  },
  {
    title: "Business Growth",
    items: [
      { name: "My Business", href: "/business", icon: Briefcase },
      { name: "Team & Staff", href: "/team", icon: UserCheck, isPro: true },
    ],
  },
  {
    title: "System Setup",
    items: [
      { name: "Settings & Billing", href: "/settings", icon: Settings },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isPremium, setIsPremium] = useState(false);
  const [orgProfile, setOrgProfile] = useState<any>(null);

  useEffect(() => {
    organizationService.getSubscription().then((sub) => {
      if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
      }
    });

    organizationService.getProfile().then((profile) => {
      if (profile) setOrgProfile(profile);
    });
  }, []);

  // Close drawer on route change
  useEffect(() => {
    onClose();
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  const sidebarContent = (
    <aside
      className="flex h-full w-64 flex-col border-r border-white/10 bg-black font-sans text-white"
      style={{ fontFamily: 'var(--font-varela-round)' }}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between px-5 border-b border-white/10">
        <Link href="/dashboard" className="flex items-center gap-3 flex-1 min-w-0 pr-2">
          {orgProfile?.logoUrl ? (
            <Image
              src={orgProfile.logoUrl}
              alt={orgProfile.name || "Business Logo"}
              width={38}
              height={38}
              className="object-cover shrink-0 rounded-full h-9 w-9 border border-white/20"
              unoptimized
            />
          ) : (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-lg font-extrabold text-black uppercase">
              {orgProfile?.name ? orgProfile.name.slice(0, 1) : "B"}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <span className="block text-sm font-extrabold tracking-tight text-white truncate">
              {orgProfile?.name || "Loading..."}
            </span>
            <span className="block text-[10px] font-semibold text-stone-400 tracking-wider truncate">
              {orgProfile?.email}
            </span>
          </div>
        </Link>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {navigationGroups.map((group) => {
          const visibleItems = group.items.filter((item) => !item.isPro || isPremium);
          if (visibleItems.length === 0) return null;

          return (
            <div key={group.title}>
              <p className="px-3 text-[11px] font-bold text-stone-500 tracking-tight mb-2">
                {group.title}
              </p>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition-all",
                        isActive
                          ? "bg-white text-black font-extrabold shadow-sm"
                          : "text-stone-300 font-medium hover:bg-stone-900 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3 truncate">
                        <item.icon
                          className={cn(
                            "h-4 w-4 transition-colors shrink-0",
                            isActive
                              ? "text-black"
                              : "text-stone-400 group-hover:text-white"
                          )}
                        />
                        <span className="truncate">{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subscription Status Footer */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <div className="rounded-2xl border border-white/10 bg-stone-950 p-4 text-xs space-y-1.5">
          <div className="flex items-center justify-between">
            {isPremium ? (
              <span className="font-extrabold text-white flex items-center gap-1.5 text-[11px] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-white" /> PRO ACTIVE
              </span>
            ) : (
              <span className="font-extrabold text-white flex items-center gap-1.5 text-[11px] uppercase">
                <Sparkles className="h-3.5 w-3.5 text-white" /> FREE PLAN
              </span>
            )}
          </div>
          <p className="text-[11px] text-stone-400 font-medium leading-normal">
            {isPremium ? "Unlimited client sync & SMS" : "Basic tailoring tools. Upgrade for Bulk SMS & Team Access."}
          </p>
          <Link
            href="/subscription"
            className="inline-block text-[11px] font-extrabold text-white hover:underline pt-1"
          >
            {isPremium ? "Manage Plan →" : "Upgrade to Pro →"}
          </Link>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <div className="hidden lg:flex h-screen w-64 shrink-0 transition-all">
        {sidebarContent}
      </div>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Drawer panel */}
          <div className="relative z-10 h-full animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
