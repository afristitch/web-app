"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { CreateClientRequest } from "@/lib/types";
import { clientService } from "@/lib/services";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ClientModal({ isOpen, onClose, onSuccess }: ClientModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateClientRequest>({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    try {
      setLoading(true);
      await clientService.create(formData);
      setFormData({ name: "", phone: "", email: "", address: "", notes: "" });
      if (onSuccess) onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Client"
      subtitle="Enter client contact details and notes for tailoring records."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Amina Bello"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Phone Number *
            </label>
            <input
              type="tel"
              required
              placeholder="+233 59 240 7690"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="amina@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Delivery / Physical Address
          </label>
          <input
            type="text"
            placeholder="Ahodwo, Kumasi, Ghana"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Style Preferences & Special Notes
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Prefers slim fit cut, high waist preference..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none resize-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/10 px-5 py-2.5 text-xs font-bold text-stone-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-white px-6 py-2.5 text-xs font-extrabold text-black hover:bg-stone-200 disabled:opacity-50 transition-all cursor-pointer shadow-xs"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            {loading ? "Saving Client..." : "Save Client"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
