"use client";

import React, { useEffect, useState } from "react";
import {
  QrCode,
  Receipt,
  Image as ImageIcon,
  MessageSquare,
  Ruler,
  Loader2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { organizationService } from "@/lib/services";
import { Organization } from "@/lib/types";

const businessTools = [
  { label: "Templates", icon: Ruler, href: "/measurements/templates" },
  { label: "Business Card", icon: QrCode, href: "/business/card" },
  { label: "Invoices", icon: Receipt, href: "/finances" },
  { label: "Portfolio", icon: ImageIcon, href: "/business/portfolio", premium: true },
  { label: "Marketing", icon: MessageSquare, href: "/business/marketing", premium: true },
];

export default function MyBusinessPage() {
  const { activeWorkspace: organization } = useAuth();
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    organizationService.getProfile().then((data) => {
      setOrg(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const orgName = org?.name || organization?.name || "My Studio";
  const orgLogo = org?.logoUrl || organization?.logoUrl;
  const orgEmail = org?.email || "";
  const orgPhone = org?.phone || "";
  const orgAddress = org?.address || "";

  const initials = orgName.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // Determine premium status
  const [isPremium, setIsPremium] = useState(false);
  useEffect(() => {
    organizationService.getSubscription().then((sub) => {
      if (sub && (sub.isPremium || sub.status === "ACTIVE")) setIsPremium(true);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-white">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: "var(--font-varela-round)" }}>
      {/* Header */}
      <div className="border-b border-white/10 pb-5">
        <h1
          className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
          style={{ fontFamily: "var(--font-varela-round)" }}
        >
          My Business
        </h1>
        <p className="text-xs text-stone-400 mt-1 font-medium">
          Your studio profile and business tools.
        </p>
      </div>

      {/* Organization Profile Card */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl">
        <div className="flex items-center gap-5">
          {/* Logo / Initials */}
          {orgLogo && !logoError ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={orgLogo}
              alt={orgName}
              className="h-20 w-20 rounded-full object-cover border-2 border-white/10 shrink-0"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border-2 border-white/10 text-xl font-extrabold text-white shrink-0">
              {initials}
            </div>
          )}

          {/* Info */}
          <div className="space-y-1 min-w-0">
            <h2 className="text-lg font-extrabold text-white uppercase truncate">
              {orgName}
            </h2>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-400 font-medium">
              {orgPhone && <span>{orgPhone}</span>}
              {orgEmail && <span>{orgEmail}</span>}
            </div>
            {orgAddress && (
              <p className="text-xs text-stone-500 font-medium truncate">{orgAddress}</p>
            )}
          </div>
        </div>

        <p className="text-[11px] text-stone-500 font-medium mt-4 pt-3 border-t border-white/10">
          Update your studio details in{" "}
          <Link href="/settings" className="text-white underline">
            Settings
          </Link>
          .
        </p>
      </div>

      {/* Business Tools Grid */}
      <div className="space-y-3">
        <h3
          className="text-sm font-bold text-white uppercase tracking-tight"
          style={{ fontFamily: "var(--font-varela-round)" }}
        >
          Business Tools
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {businessTools
            .filter((tool) => !tool.premium || isPremium)
            .map((tool) => (
              <Link
                key={tool.label}
                href={tool.href}
                className="group flex aspect-square flex-col items-center justify-center rounded-3xl border border-white/10 bg-stone-950 p-4 shadow-sm hover:border-white/30 hover:bg-stone-900 transition-all cursor-pointer"
                style={{ fontFamily: "var(--font-varela-round)" }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-900 border border-white/5 mb-3 group-hover:scale-110 transition-transform">
                  <tool.icon className="h-6 w-6 text-stone-300 group-hover:text-white transition-colors" />
                </div>
                <span className="text-[13px] font-bold text-stone-300 text-center uppercase tracking-tight group-hover:text-white transition-colors">
                  {tool.label}
                </span>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
