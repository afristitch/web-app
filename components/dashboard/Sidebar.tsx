"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FolderGit2,
  ShoppingBag,
  Ruler,
  Receipt,
  QrCode,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navigationGroups = [
  {
    title: "Document and Essentials",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "Clients Directory", href: "/clients", icon: Users },
      { name: "Group Orders", href: "/clients/groups", icon: FolderGit2 },
      { name: "Orders & Fits", href: "/orders", icon: ShoppingBag },
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
      { name: "Digital Business Card", href: "/business/card", icon: QrCode },
      { name: "Outfit Portfolio", href: "/business/portfolio", icon: ImageIcon },
      { name: "SMS Broadcasts", href: "/business/marketing", icon: MessageSquare },
    ],
  },
  {
    title: "System Setup",
    items: [
      { name: "Settings & Billing", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200/80 bg-white font-sans transition-all shrink-0">
      {/* Brand Header using User Logo */}
      <div className="flex h-16 items-center px-5 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Image
            src="/stitchlogo.png"
            alt="SewDigital Logo"
            width={32}
            height={32}
            className="object-contain shrink-0"
          />
          <div>
            <span className="block text-base font-extrabold tracking-tight text-slate-900 uppercase">
              SewDigital
            </span>
            <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Tailoring Platform
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
        {navigationGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[11px] font-bold text-slate-400 tracking-tight mb-2">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs transition-all",
                      isActive
                        ? "bg-slate-900 text-white font-bold shadow-xs"
                        : "text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-4 w-4 transition-colors shrink-0",
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-600"
                      )}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Subscription Status Footer */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 flex items-center gap-1 text-[11px]">
              <Sparkles className="h-3.5 w-3.5 text-slate-900" /> PRO ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-600 font-medium">Unlimited clients & measurement sync</p>
          <Link
            href="/settings"
            className="inline-block text-[11px] font-bold text-slate-900 hover:underline pt-1"
          >
            Manage Subscription →
          </Link>
        </div>

        <button
          onClick={logout}
          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-slate-500 transition-all hover:bg-rose-50 hover:text-rose-600"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
