"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MessageSquare, Send, Users, CheckCircle2, Sparkles, Lock } from "lucide-react";
import Link from "next/link";
import { clientService, groupService, organizationService } from "@/lib/services";
import { Client, Group } from "@/lib/types";

export default function MarketingPage() {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [recipientGroup, setRecipientGroup] = useState("all");
  const [message, setMessage] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);

  useEffect(() => {
    Promise.all([
      clientService.getAll(),
      groupService.getAll(),
      organizationService.getSubscription(),
    ]).then(([cList, gList, sub]) => {
      setClients(Array.isArray(cList) ? cList : []);
      setGroups(Array.isArray(gList) ? gList : []);
      if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
        router.replace("/subscription");
      }
      setLoadingSub(false);
    });
  }, [router]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPremium || !message) return;
    setSentSuccess(true);
    setMessage("");
    setTimeout(() => setSentSuccess(false), 4000);
  };

  if (loadingSub || !isPremium) {
    return (
      <div className="flex h-64 items-center justify-center text-stone-400 font-medium text-xs">
        Checking PRO subscription permissions...
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/20 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase">
              <Sparkles className="h-3 w-3 text-white" /> PRO FEATURE ACTIVE
            </span>
          </div>
          <h1 
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            SMS Broadcast & Fitting Reminders
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Send instant SMS or WhatsApp updates to clients regarding collection dates & promotional offers.
          </p>
        </div>

        <Link
          href="/subscription"
          className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2 text-xs font-bold text-white hover:bg-white hover:text-black transition-all cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-white" /> Manage Subscription
        </Link>
      </div>

      <div className="max-w-2xl rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-xl space-y-6">
        <form onSubmit={handleSendBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Select Recipient Client Group
            </label>
            <select
              value={recipientGroup}
              onChange={(e) => setRecipientGroup(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <option value="all" className="bg-stone-900 text-white">All Registered Clients ({clients.length})</option>
              {groups.map((g) => (
                <option key={g._id} value={g._id} className="bg-stone-900 text-white">
                  {g.name} ({g.memberCount || 0} Members)
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Message Content (Max 160 chars per SMS segment)
            </label>
            <textarea
              rows={4}
              placeholder="Type your client broadcast message or fitting reminder here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none resize-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
            <div className="mt-1.5 flex justify-between text-[11px] text-stone-400 font-medium">
              <span>{message.length} characters</span>
              <span>{Math.ceil(message.length / 160) || 1} SMS Segment</span>
            </div>
          </div>

          {sentSuccess && (
            <div className="flex items-center gap-2 rounded-xl bg-emerald-950/60 p-3.5 text-xs font-bold text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-4 w-4" /> Broadcast SMS dispatched successfully to recipient list!
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={!message}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 disabled:opacity-50 transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <Send className="h-3.5 w-3.5 text-black" /> Send Broadcast SMS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
