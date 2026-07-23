"use client";

import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
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
  const [paymentAmount, setPaymentAmount] = useState<number>(10000);

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

  const filteredOrders = orders.filter((ord) => {
    const matchesSearch =
      ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
    { label: "All Orders", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "In Progress", value: "in-progress" },
    { label: "Fitting", value: "fitting" },
    { label: "Completed", value: "completed" },
    { label: "Delivered", value: "delivered" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Orders & Production
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Track garment progress, fitting dates, client deposits, and completed deliveries.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
        >
          <Plus className="h-3.5 w-3.5 text-white" />
          Create Order
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-4">
        {/* Soft White Active Tab Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`px-4 py-2 text-xs font-bold whitespace-nowrap transition-all rounded-xl ${
                activeTab === tab.value
                  ? "bg-white text-slate-900 border border-slate-200/80 shadow-xs"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {tab.label}
              <span
                className={`ml-2 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold ${
                  activeTab === tab.value
                    ? "bg-slate-100 text-slate-900"
                    : "bg-slate-200/70 text-slate-600"
                }`}
              >
                {tab.value === "all"
                  ? orders.length
                  : orders.filter((o) => o.status === tab.value).length}
              </span>
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by order number, client name, or outfit notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-4 text-xs font-medium text-slate-900 focus:border-slate-400 focus:bg-white focus:outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Clean Data Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Order Number</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Total (₦)</th>
                <th className="px-6 py-3">Paid (₦)</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                    No orders found in this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr
                    key={ord._id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {ord.orderNumber}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-slate-900">
                      <div>
                        <p className="font-bold text-slate-900">{ord.client.name}</p>
                        <p className="text-[10px] text-slate-400">{ord.client.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <OrderStatusBadge status={ord.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <PaymentStatusBadge status={ord.paymentStatus} />
                    </td>
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      ₦{ord.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-emerald-600">
                      ₦{ord.amountPaid.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 font-medium">
                      {ord.dueDate}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {ord.amountPaid < ord.amount && (
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setPaymentAmount(ord.amount - ord.amountPaid);
                              setIsPaymentModalOpen(true);
                            }}
                            className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
                          >
                            + Payment
                          </button>
                        )}
                        <Link
                          href={`/orders/${ord._id}`}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                        >
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
      <OrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchOrders}
      />

      <Modal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        title="Record Payment Deposit"
        subtitle={`Order ${selectedOrder?.orderNumber} • Client: ${selectedOrder?.client.name}`}
      >
        <form onSubmit={handleRecordPayment} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Payment Amount (₦) *
            </label>
            <input
              type="number"
              required
              min={1}
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(Number(e.target.value))}
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
            <div className="flex justify-between">
              <span>Total Order Cost:</span>
              <span className="font-bold">₦{selectedOrder?.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-1">
              <span>Already Paid:</span>
              <span className="font-semibold text-emerald-600">₦{selectedOrder?.amountPaid.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mt-1 border-t border-slate-200 pt-1 font-bold text-slate-900">
              <span>Remaining Balance:</span>
              <span>₦{((selectedOrder?.amount || 0) - (selectedOrder?.amountPaid || 0)).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-4 mt-6">
            <button
              type="button"
              onClick={() => setIsPaymentModalOpen(false)}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-semibold text-white hover:bg-slate-800 shadow-xs"
            >
              Record Payment
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
