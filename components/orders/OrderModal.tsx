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
    amount: 50000,
    amountPaid: 25000,
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
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Select Client *
          </label>
          <select
            required
            value={formData.clientId}
            onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
          >
            {clients.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name} ({c.phone})
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Total Order Amount (₦) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Initial Deposit Paid (₦) *
            </label>
            <input
              type="number"
              required
              min={0}
              value={formData.amountPaid}
              onChange={(e) => setFormData({ ...formData, amountPaid: Number(e.target.value) })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Order Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="fitting">Fitting</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Priority Level
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as OrderPriority })}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Fabric / Outfit Image URL (Optional)
          </label>
          <input
            type="url"
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.clothImageUrl}
            onChange={(e) => setFormData({ ...formData, clothImageUrl: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Design Description & Tailoring Notes
          </label>
          <textarea
            rows={3}
            placeholder="e.g. Royal blue senator suit with gold embroidery on collar and sleeve cuffs."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none resize-none"
          />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-xs"
          >
            {loading ? "Creating Order..." : "Create Order"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
