"use client";

import React, { useEffect, useState } from "react";
import { Plus, Trash2, Smartphone, Landmark, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { organizationService } from "@/lib/services";
import { Organization } from "@/lib/types";
import { Modal } from "@/components/ui/Modal";

type PaymentType = "momo" | "bank";

export default function PaymentSettingsPage() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentType, setPaymentType] = useState<PaymentType>("momo");
  const [error, setError] = useState("");

  // MoMo form
  const [momoNetwork, setMomoNetwork] = useState("MTN");
  const [momoNumber, setMomoNumber] = useState("");
  const [momoName, setMomoName] = useState("");

  // Bank form
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");

  const fetchOrg = async () => {
    setLoading(true);
    try {
      const data = await organizationService.getProfile();
      setOrg(data);
    } catch {
      setError("Failed to load payment settings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrg();
  }, []);

  const momoMethods = org?.paymentInstructions?.momo || [];
  const bankMethods = org?.paymentInstructions?.bank || [];

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!org) return;

    const updatedInstructions = { ...org.paymentInstructions };

    if (paymentType === "momo") {
      if (!momoNetwork || !momoNumber || !momoName) {
        setError("Please fill all MoMo details");
        return;
      }
      if (!updatedInstructions.momo) updatedInstructions.momo = [];
      updatedInstructions.momo.push({ network: momoNetwork, number: momoNumber, name: momoName });
    } else {
      if (!bankName || !accountNumber || !accountName) {
        setError("Please fill all bank details");
        return;
      }
      if (!updatedInstructions.bank) updatedInstructions.bank = [];
      updatedInstructions.bank.push({ bankName, accountNumber, accountName, branch: branch || undefined });
    }

    setSaving(true);
    setError("");
    try {
      await organizationService.updateProfile({ paymentInstructions: updatedInstructions } as any);
      setIsModalOpen(false);
      resetForms();
      await fetchOrg();
    } catch (err: any) {
      setError(err?.message || "Failed to save payment method");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: "momo" | "bank", index: number) => {
    if (!org) return;
    const key = `${type}-${index}`;
    setDeleting(key);
    try {
      const updatedInstructions = { ...org.paymentInstructions };
      if (type === "momo" && updatedInstructions.momo) {
        updatedInstructions.momo = updatedInstructions.momo.filter((_, i) => i !== index);
      } else if (type === "bank" && updatedInstructions.bank) {
        updatedInstructions.bank = updatedInstructions.bank.filter((_, i) => i !== index);
      }
      await organizationService.updateProfile({ paymentInstructions: updatedInstructions } as any);
      await fetchOrg();
    } catch (err: any) {
      setError(err?.message || "Failed to delete payment method");
    } finally {
      setDeleting(null);
    }
  };

  const resetForms = () => {
    setMomoNetwork("MTN");
    setMomoNumber("");
    setMomoName("");
    setBankName("");
    setAccountNumber("");
    setAccountName("");
    setBranch("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-white">
        <Loader2 className="h-6 w-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <Link
            href="/settings"
            className="text-xs font-bold text-stone-400 hover:text-white flex items-center gap-1 mb-1 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Settings
          </Link>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Payment Settings
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Manage your MoMo and bank account details for client payments shown on invoices.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <Plus className="h-3.5 w-3.5 text-black" />
          Add Payment Method
        </button>
      </div>

      {error && (
        <div className="rounded-2xl bg-red-950/40 border border-red-500/20 px-4 py-3 text-xs text-red-300 font-medium flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-200 cursor-pointer">✕</button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* MoMo Section */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <Smartphone className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Mobile Money</h3>
              <p className="text-[11px] text-stone-400 font-medium">MTN, Vodafone, AirtelTigo</p>
            </div>
          </div>

          {momoMethods.length === 0 ? (
            <p className="text-xs text-stone-400 py-4 text-center font-medium">No MoMo accounts added yet.</p>
          ) : (
            <div className="space-y-2">
              {momoMethods.map((m, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-white/10 bg-stone-900/50">
                  <div>
                    <p className="text-xs font-bold text-white">{m.name}</p>
                    <p className="text-[11px] text-stone-400">{m.network} • {m.number}</p>
                  </div>
                  <button
                    onClick={() => handleDelete("momo", i)}
                    disabled={deleting === `momo-${i}`}
                    className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {deleting === `momo-${i}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bank Section */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-white/10 pb-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <Landmark className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">Bank Accounts</h3>
              <p className="text-[11px] text-stone-400 font-medium">Direct bank transfers</p>
            </div>
          </div>

          {bankMethods.length === 0 ? (
            <p className="text-xs text-stone-400 py-4 text-center font-medium">No bank accounts added yet.</p>
          ) : (
            <div className="space-y-2">
              {bankMethods.map((b, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-2xl border border-white/10 bg-stone-900/50">
                  <div>
                    <p className="text-xs font-bold text-white">{b.accountName}</p>
                    <p className="text-[11px] text-stone-400">{b.bankName} • {b.accountNumber}{b.branch ? ` • ${b.branch}` : ""}</p>
                  </div>
                  <button
                    onClick={() => handleDelete("bank", i)}
                    disabled={deleting === `bank-${i}`}
                    className="p-1.5 text-stone-400 hover:text-red-400 hover:bg-red-950/40 rounded-lg transition-all cursor-pointer disabled:opacity-50"
                  >
                    {deleting === `bank-${i}` ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Payment Method Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); resetForms(); }}
        title="Add Payment Method"
        subtitle="Add a MoMo or bank account for client payments."
      >
        <form onSubmit={handleSave} className="space-y-4 pt-2">
          {/* Type Selector */}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPaymentType("momo")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                paymentType === "momo" ? "bg-white text-black" : "bg-stone-900 text-stone-400 border border-white/10"
              }`}
            >
              Mobile Money
            </button>
            <button
              type="button"
              onClick={() => setPaymentType("bank")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all cursor-pointer ${
                paymentType === "bank" ? "bg-white text-black" : "bg-stone-900 text-stone-400 border border-white/10"
              }`}
            >
              Bank Account
            </button>
          </div>

          {paymentType === "momo" ? (
            <>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Network *</label>
                <select
                  value={momoNetwork}
                  onChange={(e) => setMomoNetwork(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white focus:border-white/40 focus:outline-none"
                >
                  <option value="MTN">MTN Mobile Money</option>
                  <option value="Vodafone">Vodafone Cash</option>
                  <option value="AirtelTigo">AirtelTigo Money</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0551234567"
                  value={momoNumber}
                  onChange={(e) => setMomoNumber(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Account Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Name on MoMo account"
                  value={momoName}
                  onChange={(e) => setMomoName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Bank Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. GCB Bank"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Account Number *</label>
                <input
                  type="text"
                  required
                  placeholder="Account number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Account Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Name on account"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-stone-300 mb-1">Branch (Optional)</label>
                <input
                  type="text"
                  placeholder="Branch name"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-stone-900 px-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/40 focus:outline-none"
                />
              </div>
            </>
          )}

          <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4 mt-6">
            <button
              type="button"
              onClick={() => { setIsModalOpen(false); resetForms(); }}
              className="rounded-full border border-white/20 px-4 py-2 text-xs font-bold text-stone-300 hover:bg-stone-800 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-white px-5 py-2 text-xs font-extrabold text-black hover:bg-stone-200 shadow-xs disabled:opacity-50 cursor-pointer"
            >
              {saving ? "Saving..." : "Save Method"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
