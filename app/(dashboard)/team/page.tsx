"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserCheck, Plus, Mail, Phone, Shield, Trash2, CheckCircle2, UserPlus, Users, Lock, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Modal } from "@/components/ui/Modal";
import { organizationService } from "@/lib/services";

interface TeamMember {
  id: string;
  name: string;
  role: "ORG_ADMIN" | "STAFF";
  email: string;
  phone: string;
  status: "Active" | "Invited";
  joinedDate: string;
}

export default function TeamManagementPage() {
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isPremium, setIsPremium] = useState(false);
  const [loadingSub, setLoadingSub] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    organizationService.getSubscription().then((sub) => {
      if (sub && (sub.isPremium || sub.status === "ACTIVE")) {
        setIsPremium(true);
      } else {
        setIsPremium(false);
        router.replace("/subscription");
      }
      setLoadingSub(false);
    });
  }, [router]);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPremium || !name || !email) return;
    const newM: TeamMember = {
      id: `mem-${Date.now()}`,
      name,
      role: isAdmin ? "ORG_ADMIN" : "STAFF",
      email,
      phone: phone || "+233 00 000 0000",
      status: "Invited",
      joinedDate: new Date().toISOString().split("T")[0],
    };
    setMembers([newM, ...members]);
    setName("");
    setEmail("");
    setPhone("");
    setIsAdmin(false);
    setIsModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Are you sure you want to remove this staff member from your studio team?")) {
      setMembers(members.filter((m) => m.id !== id));
    }
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
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-0.5 text-[10px] font-extrabold text-white uppercase">
              <Sparkles className="h-3 w-3 text-white" /> PRO FEATURE ACTIVE
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Team & Staff Management
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Manage your tailoring studio staff and role permissions.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <UserPlus className="h-4 w-4 text-black" />
          Invite Staff Member
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Studio Staff</span>
          <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            {members.length}
          </p>
          <p className="text-[11px] text-stone-400 font-medium">Active studio team members</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Admins</span>
          <p className="text-3xl font-extrabold text-emerald-400 tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            {members.filter((m) => m.role === "ORG_ADMIN").length}
          </p>
          <p className="text-[11px] text-emerald-400 font-bold">Staff with full access</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Pending Invites</span>
          <p className="text-3xl font-extrabold text-amber-400 tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            {members.filter((m) => m.status === "Invited").length}
          </p>
          <p className="text-[11px] text-amber-400 font-bold">Awaiting email confirmation</p>
        </div>
      </div>

      {/* Team Data Table */}
      {members.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-12 text-center text-stone-400 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-stone-400">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            No Staff Members Yet
          </h3>
          <p className="text-xs text-stone-400 font-medium max-w-sm mx-auto">
            Invite workers to your studio team. Click "Invite Staff Member" to send an invite.
          </p>
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-stone-950 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 bg-stone-900/60 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Staff Member</th>
                  <th className="px-6 py-4">Studio Role</th>
                  <th className="px-6 py-4">Contact Phone</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Joined Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {members.map((member) => (
                  <tr
                    key={member.id}
                    className="group transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-extrabold text-white">
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white text-sm">{member.name}</p>
                          <p className="text-[11px] text-stone-400">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-stone-900 px-3 py-1 text-[11px] font-bold text-white">
                        <Shield className="h-3 w-3 text-stone-400" />
                        {member.role === "ORG_ADMIN" ? "Admin" : "Staff"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-300 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-3 w-3 text-stone-400" />
                        {member.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {member.status === "Active" ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 px-3 py-0.5 text-[10px] font-bold text-emerald-400">
                          <CheckCircle2 className="h-3 w-3" /> Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-950/60 border border-amber-500/30 px-3 py-0.5 text-[10px] font-bold text-amber-400">
                          Invited
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-stone-300 font-medium">
                      {member.joinedDate}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteMember(member.id)}
                        className="rounded-xl border border-rose-500/30 bg-rose-950/60 p-2 text-rose-400 hover:bg-rose-500 hover:text-black transition-colors cursor-pointer"
                        title="Remove Staff Member"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Invite Staff Member Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Invite Studio Staff Member"
        subtitle="Grant access to measurements, order tracking, and client records."
      >
        <form onSubmit={handleAddMember} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kofi Mensah"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Email Address *
              </label>
              <input
                type="email"
                required
                placeholder="kofi@sewdigital.app"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                style={{ fontFamily: 'var(--font-varela-round)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-300 mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="+233 24 987 6543"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
                style={{ fontFamily: 'var(--font-varela-round)' }}
              />
            </div>
          </div>

          <div className="mt-4 p-4 rounded-xl border border-white/10 bg-stone-900/50 flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white">Make Admin</p>
              <p className="text-xs text-stone-400 mt-1">Admins have full access to manage the business and workers.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
              <div className="w-11 h-6 bg-stone-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 transition-all cursor-pointer shadow-xs"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              Send Invite
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
