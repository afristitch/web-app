"use client";

import React, { useEffect, useState } from "react";
import { QrCode, Share2, Scissors, Building2, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { organizationService } from "@/lib/services";
import { Organization } from "@/lib/types";

export default function BusinessCardPage() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    organizationService.getProfile().then((data) => {
      setOrg(data);
      setLoading(false);
    });
  }, []);

  const businessName = org?.name || "My Tailoring Studio";
  const tagline = "Bespoke Tailoring & Haute Couture";
  const phone = org?.phone || "";
  const email = org?.email || "";
  const address = org?.address || "";

  const cardData = JSON.stringify({
    name: businessName,
    phone,
    email,
    address,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-white">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Digital Business Card & QR Code
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Share your digital tailor contact card with clients for instant phone saved contact & WhatsApp links.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <Share2 className="h-3.5 w-3.5 text-black" />
          Print / Export Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Studio Information */}
        <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-tight border-b border-white/10 pb-3" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Studio Information
          </h3>

          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-stone-900/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Studio Name</span>
                <p className="text-sm font-bold text-white">{businessName}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-stone-900/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Phone</span>
                <p className="text-sm font-bold text-white">{phone || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-stone-900/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Email</span>
                <p className="text-sm font-bold text-white">{email || "Not set"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl border border-white/10 bg-stone-900/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Address</span>
                <p className="text-sm font-bold text-white">{address || "Not set"}</p>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-stone-400 font-medium pt-2">
            Update your studio details in <a href="/settings" className="text-white underline">Settings</a> to reflect them here.
          </p>
        </div>

        {/* Right Column: Card Preview & QR */}
        <div className="lg:col-span-6 space-y-6">
          {/* Card Preview */}
          <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl print:bg-white print:text-black print:border-none">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-stone-900 to-black p-6 space-y-4 print:from-white print:to-stone-50 print:border-stone-200">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white print:bg-stone-100 print:text-black">
                  <Scissors className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-white uppercase print:text-black" style={{ fontFamily: 'var(--font-varela-round)' }}>
                    {businessName}
                  </h3>
                  <p className="text-[11px] text-stone-400 font-medium print:text-stone-600">{tagline}</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-xs print:border-stone-200">
                {phone && (
                  <div className="flex items-center gap-2 text-stone-300 print:text-stone-600">
                    <Phone className="h-3.5 w-3.5" />
                    <span className="font-medium">{phone}</span>
                  </div>
                )}
                {email && (
                  <div className="flex items-center gap-2 text-stone-300 print:text-stone-600">
                    <Mail className="h-3.5 w-3.5" />
                    <span className="font-medium">{email}</span>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-2 text-stone-300 print:text-stone-600">
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="font-medium">{address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <QrCode className="h-4 w-4 text-white" />
              <h3 className="text-sm font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                QR Contact Code
              </h3>
            </div>
            <div className="inline-flex rounded-2xl border border-white/10 bg-white p-4">
              <QRCodeSVG
                value={cardData}
                size={160}
                bgColor="#ffffff"
                fgColor="#000000"
                level="M"
              />
            </div>
            <p className="text-[11px] text-stone-400 font-medium">
              Clients scan this code to save your contact instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
