"use client";

import React, { useState } from "react";
import { QrCode, Download, Share2, Scissors, Building2, Phone, Mail, MapPin } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function BusinessCardPage() {
  const [businessName, setBusinessName] = useState("SewDigital Studio");
  const [tagline, setTagline] = useState("Bespoke Tailoring & Haute Couture");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [email, setEmail] = useState("contact@sewdigital.com");
  const [address, setAddress] = useState("14 Victoria Island, Lagos, Nigeria");

  const cardData = JSON.stringify({
    name: businessName,
    phone,
    email,
    address,
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Digital Business Card & QR Code
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Share your digital tailor contact card with clients for instant phone saved contact & WhatsApp links.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#005B82] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#004A6B] transition-all"
        >
          <Share2 className="h-3.5 w-3.5 text-white" />
          Print / Export Card
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Form Editor */}
        <div className="lg:col-span-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Card Details Customizer
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Business / Studio Name
            </label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tagline / Specialty
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Phone / WhatsApp
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Studio Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column: Live Card Preview & QR Code */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center space-y-6">
          {/* Card Component */}
          <div className="w-full max-w-md rounded-3xl bg-slate-900 p-7 text-white shadow-xl space-y-6 border border-slate-800 relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
                  <Scissors className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-extrabold tracking-tight">{businessName}</h2>
                  <p className="text-[11px] text-slate-400 font-medium">{tagline}</p>
                </div>
              </div>
            </div>

            {/* QR Code & Contact Info */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="space-y-2 text-xs font-medium text-slate-200">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  <span>{phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  <span className="truncate max-w-[180px]">{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="text-[11px] leading-tight">{address}</span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="rounded-2xl bg-white p-2.5 shadow-md shrink-0">
                <QRCodeSVG value={cardData} size={90} />
              </div>
            </div>

            <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider text-center pt-2 border-t border-white/10">
              Scan QR Code to save contact
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
