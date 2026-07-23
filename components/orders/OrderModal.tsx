"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Client, CreateOrderRequest, OrderPriority, OrderStatus } from "@/lib/types";
import { clientService, orderService } from "@/lib/services";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function OrderModal({ isOpen, onClose, onSuccess }: OrderModalProps) {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState<CreateOrderRequest>({
    clientId: "",
    amount: 500,
    amountPaid: 250,
    status: "pending",
    priority: "medium",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    notes: "",
    clothImageUrl: "",
    clothSize: "Custom Fit",
  });

  useEffect(() => {
    if (isOpen) {
      clientService.getAll().then((data) => {
        setClients(data);
        if (data.length > 0) {
          setFormData((prev) => (prev.clientId ? prev : { ...prev, clientId: data[0]._id }));
        }
      });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientId || formData.amount <= 0) return;

    try {
      setLoading(true);
      await orderService.create(formData);
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
      title="Create New Tailoring Order"
      subtitle="Log a new order, set pricing, deposit, and delivery deadline."
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Select Client *
          </label>
          <select
            required
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            {clients.map((c) => (
              <option key={c._id} value={c._id} className="bg-stone-900 text-white">
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Total Order Amount (₵) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Initial Deposit Paid (₵) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.amountPaid}
              onChange={(e) => setFormData({ ...formData, amountPaid: Number(e.target.value) })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Order Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <option value="pending" className="bg-stone-900 text-white">Pending</option>
              <option value="in-progress" className="bg-stone-900 text-white">In Progress</option>
              <option value="fitting" className="bg-stone-900 text-white">Fitting</option>
              <option value="completed" className="bg-stone-900 text-white">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as OrderPriority })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <option value="low" className="bg-stone-900 text-white">Low</option>
              <option value="medium" className="bg-stone-900 text-white">Medium</option>
              <option value="high" className="bg-stone-900 text-white">High</option>
              <option value="urgent" className="bg-stone-900 text-white">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-300 mb-1.5">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white focus:border-white/30 focus:outline-none"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Fabric / Outfit Image URL (Optional)
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.clothImageUrl}
            onChange={(e) => setFormData({ ...formData, clothImageUrl: e.target.value })}
            className="w-full rounded-xl border border-white/10 bg-stone-900 px-3.5 py-2.5 text-xs font-medium text-white placeholder-stone-500 focus:border-white/30 focus:outline-none"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-300 mb-1.5">
            Design Description & Tailoring Notes
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Royal blue senator suit with gold embroidery on collar and sleeve cuffs."
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
            {loading ? "Creating Order..." : "Create Order"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
