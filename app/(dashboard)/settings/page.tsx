"use client";

import React, { useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState("SewDigital Studio");
  const [currency, setCurrency] = useState("NGN (₦)");
  const [phone, setPhone] = useState("+234 803 123 4567");
  const [address, setAddress] = useState("14 Victoria Island, Lagos, Nigeria");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Business Settings & Billing
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Manage your tailoring studio profile, currency preferences, and Paystack plan subscription.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Organization Profile Form */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
            Studio Profile & Preferences
          </h3>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Studio / Brand Name
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-900 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Default Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-900 focus:outline-none"
                >
                  <option value="NGN (₦)">NGN - Nigerian Naira (₦)</option>
                  <option value="USD ($)">USD - US Dollar ($)</option>
                  <option value="GBP (£)">GBP - British Pound (£)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Studio Contact Phone
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Physical Studio Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-900 focus:outline-none"
              />
            </div>

            {savedSuccess && (
              <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4" /> Settings updated successfully!
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Active Subscription Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-bold text-slate-300 uppercase tracking-wider">
                <Sparkles className="h-4 w-4 text-white" /> PRO SUBSCRIPTION
              </span>
              <span className="rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2.5 py-0.5 text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div>
              <p className="text-2xl font-extrabold tracking-tight">₦15,000 / month</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                Renews automatically via Paystack on August 23, 2026.
              </p>
            </div>

            <div className="space-y-2 text-xs text-slate-200 font-medium border-t border-slate-800 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Unlimited Client Records
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Unlimited Orders & Fitting Logs
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Paystack Direct Payment Gateway
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/subscription"
                className="block w-full text-center rounded-xl bg-white py-2.5 text-xs font-bold text-slate-900 hover:bg-slate-100 transition-all shadow-xs"
              >
                Manage Paystack Subscription Plan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
