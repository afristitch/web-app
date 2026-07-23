"use client";

import React, { useState } from "react";
import { MessageSquare, Send, Users, CheckCircle2 } from "lucide-react";

export default function MarketingPage() {
  const [recipientGroup, setRecipientGroup] = useState("all");
  const [message, setMessage] = useState(
    "Hello! This is a reminder from SewDigital Studio. Your fitting session or order collection is ready. Please call us to confirm your schedule."
  );
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            SMS Broadcast & Fitting Reminders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Send instant SMS or WhatsApp updates to clients regarding collection dates & promotional offers.
          </p>
        </div>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-6">
        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Recipient Client Group
            </label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            >
              <option value="all">All Registered Clients (5)</option>
              <option value="pending-fitting">Clients Pending Fitting (2)</option>
              <option value="unpaid-balances">Clients with Pending Balances (2)</option>
              <option value="wedding-asoebi">Adeleke Wedding Group (12)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Message Content (Max 160 chars per SMS segment)
            </label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none resize-none"
            />
            <div className="mt-1 flex justify-between text-[11px] text-slate-400 font-medium">
              <span>{message.length} characters</span>
              <span>1 SMS Segment</span>
            </div>
          </div>

          {sentSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="h-4 w-4" /> Broadcast SMS dispatched successfully to recipient list!
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#005B82] px-5 py-2.5 text-xs font-semibold text-white shadow-2xs hover:bg-[#004A6B] transition-all"
            >
              <Send className="h-3.5 w-3.5 text-white" /> Send Broadcast SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
