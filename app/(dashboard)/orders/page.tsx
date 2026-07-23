"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Order } from "@/lib/types";
import { orderService } from "@/lib/services";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/Badge";
import { OrderModal } from "@/components/orders/OrderModal";
import { Modal } from "@/components/ui/Modal";

export default function OrdersListPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(50);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders = safeOrders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ord.client?.name && ord.client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (ord.notes && ord.notes.toLowerCase().includes(searchTerm.toLowerCase()));

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && ord.status === activeTab;
  });

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || paymentAmount <= 0) return;
    try {
      await orderService.recordPayment(selectedOrder._id, paymentAmount);
      fetchOrders();
      setIsPaymentModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const tabs: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Fitting", value: "fitting" },
    { label: "Completed", value: "completed" },
    { label: "Delivered", value: "delivered" },
  ];

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase">
            Orders & Production
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Track garment progress, fitting dates, client deposits, and completed deliveries.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" /> Create Order
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-3.5 py-2 text-xs font-bold whitespace-nowrap transition-all rounded-full border ${
                activeTab === tab.value
                  ? "bg-white text-black border-white shadow-xs font-extrabold"
                  : "text-stone-400 border-white/10 hover:text-white hover:bg-stone-900"
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-extrabold ${
                activeTab === tab.value ? "bg-black text-white" : "bg-white/10 text-stone-300"
              }`}>
                {tab.value === "all" ? safeOrders.length : safeOrders.filter((o) => o.status === tab.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-stone-950 p-4 shadow-xl">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search order number or client name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9.5 w-full rounded-xl border border-white/10 bg-stone-900/80 pl-10 pr-4 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/30 focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Mobile: Card list ── */}
      <div className="sm:hidden space-y-3">
        {loading ? (
          <div className="py-10 text-center text-xs text-stone-400">Loading orders...</div>
        ) : filteredOrders.length === 0 ? (
          <div className="py-10 text-center text-xs text-stone-400">No orders found in this view.</div>
        ) : (
          filteredOrders.map((ord) => (
            <div key={ord._id} className="rounded-2xl border border-white/10 bg-stone-950 p-4 space-y-3">
              {/* Row 1: Order number + status */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-extrabold text-white text-sm">{ord.orderNumber}</span>
                <OrderStatusBadge status={ord.status} />
              </div>
              {/* Row 2: Client info */}
              <div>
                <p className="font-bold text-white text-xs">{ord.client?.name || "N/A"}</p>
                {ord.client?.phone && <p className="text-[11px] text-stone-400">{ord.client.phone}</p>}
              </div>
              {/* Row 3: Payment + amounts */}
              <div className="flex items-center justify-between text-xs border-t border-white/10 pt-2">
                <div className="space-y-1">
                  <PaymentStatusBadge status={ord.paymentStatus} />
                  <p className="text-stone-400 font-medium">Due: {ord.dueDate || "N/A"}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-white">₵{(ord.amount || 0).toLocaleString()}</p>
                  <p className="text-[11px] text-stone-400">₵{(ord.amountPaid || 0).toLocaleString()} paid</p>
                </div>
              </div>
              {/* Row 4: Actions */}
              <div className="flex items-center gap-2 border-t border-white/10 pt-2">
                {ord.amountPaid < ord.amount && (
                  <button
                    onClick={() => { setSelectedOrder(ord); setPaymentAmount(ord.amount - ord.amountPaid); setIsPaymentModalOpen(true); }}
                    className="flex-1 rounded-xl border border-white/20 bg-stone-900 py-2 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors text-center"
                  >
                    + Payment
                  </button>
                )}
                <Link
                  href={`/orders/${ord._id}`}
                  className="flex-1 flex items-center justify-center gap-1 rounded-xl border border-white/20 bg-stone-900 py-2 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors"
                >
                  Details <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Desktop: Table ── */}
      <div className="hidden sm:block rounded-3xl border border-white/10 bg-stone-950 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-stone-900/60 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="px-6 py-4">Order Number</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Total (₵)</th>
                <th className="px-6 py-4">Paid (₵)</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={8} className="px-6 py-10 text-center text-stone-400 font-medium">Loading orders from API...</td></tr>
              ) : filteredOrders.length === 0 ? (
                <tr><td colSpan={8} className="px-6 py-10 text-center text-stone-400 font-medium">No orders found in this view.</td></tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord._id} className="group transition-colors hover:bg-white/5">
                    <td className="px-6 py-4 font-bold text-white">{ord.orderNumber}</td>
                    <td className="px-6 py-4 font-medium text-white">
                      <p className="font-bold text-white">{ord.client?.name || "N/A"}</p>
                      <p className="text-[10px] text-stone-400">{ord.client?.phone || ""}</p>
                    </td>
                    <td className="px-6 py-4"><OrderStatusBadge status={ord.status} /></td>
                    <td className="px-6 py-4"><PaymentStatusBadge status={ord.paymentStatus} /></td>
                    <td className="px-6 py-4 font-bold text-white">₵{(ord.amount || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-stone-300">₵{(ord.amountPaid || 0).toLocaleString()}</td>
                    <td className="px-6 py-4 text-stone-300 font-medium">{ord.dueDate || "N/A"}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {ord.amountPaid < ord.amount && (
                          <button
                            onClick={() => { setSelectedOrder(ord); setPaymentAmount(ord.amount - ord.amountPaid); setIsPaymentModalOpen(true); }}
                            className="rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors"
                          >
                            + Payment
                          </button>
                        )}
                        <Link href={`/orders/${ord._id}`} className="rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-colors">
                          Details
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <OrderModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onSuccess={fetchOrders} />

      <Modal isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} title="Record Payment Deposit" subtitle={`Order ${selectedOrder?.orderNumber} • ${selectedOrder?.client?.name}`}>
        <form onSubmit={handleRecordPayment} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-stone-300 mb-1">Payment Amount (₵) *</label>
            <input type="number" required min={1} value={paymentAmount} onChange={(e) => setPaymentAmount(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-stone-900 px-3 py-2 text-xs font-medium text-white focus:border-white/30 focus:outline-none" />
          </div>
          <div className="rounded-xl bg-stone-900 p-3.5 text-xs text-stone-300 border border-white/10 space-y-1.5">
            <div className="flex justify-between"><span>Total:</span><span className="font-bold text-white">₵{(selectedOrder?.amount || 0).toLocaleString()}</span></div>
            <div className="flex justify-between"><span>Paid:</span><span className="font-bold text-white">₵{(selectedOrder?.amountPaid || 0).toLocaleString()}</span></div>
            <div className="flex justify-between border-t border-white/10 pt-1.5 font-bold text-white"><span>Balance:</span><span>₵{((selectedOrder?.amount || 0) - (selectedOrder?.amountPaid || 0)).toLocaleString()}</span></div>
          </div>
          <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4 mt-6">
            <button type="button" onClick={() => setIsPaymentModalOpen(false)} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-stone-400 hover:bg-white/10 hover:text-white cursor-pointer">Cancel</button>
            <button type="submit" className="rounded-xl bg-white px-5 py-2 text-xs font-bold text-black hover:bg-stone-200 shadow-xs cursor-pointer">Record Payment</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
