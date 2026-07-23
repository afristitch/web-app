"use client";

import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Users,
  Wallet,
  Clock,
  TrendingUp,
  Plus,
  Eye,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/Badge";
import { Order, Client } from "@/lib/types";
import { clientService, orderService } from "@/lib/services";
import { OrderModal } from "@/components/orders/OrderModal";
import { ClientModal } from "@/components/clients/ClientModal";

export default function DashboardOverviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [fetchedOrders, fetchedClients] = await Promise.all([
        orderService.getAll(),
        clientService.getAll(),
      ]);
      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
      setClients(Array.isArray(fetchedClients) ? fetchedClients : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
      setClients([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const safeClients = Array.isArray(clients) ? clients : [];

  const totalRevenue = safeOrders.reduce((acc, o) => acc + (o.amount || 0), 0);
  const totalPaid = safeOrders.reduce((acc, o) => acc + (o.amountPaid || 0), 0);
  const pendingBalance = totalRevenue - totalPaid;
  const activeOrdersCount = safeOrders.filter(
    (o) => o.status === "in-progress" || o.status === "fitting" || o.status === "pending"
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Title & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
            Business Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Real-time breakdown of tailoring orders, client revenue, and pending fittings.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsClientModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-slate-500" />
            Add Client
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
          >
            <Plus className="h-3.5 w-3.5 text-white" />
            Create Order
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Gross Revenue</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              ₦{totalRevenue.toLocaleString()}
            </p>
            <div className="mt-2 flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span className="text-emerald-600 font-semibold">₦{totalPaid.toLocaleString()} paid</span>
              <span className="text-rose-500 font-semibold">₦{pendingBalance.toLocaleString()} pending</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Active Work orders</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShoppingBag className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeOrdersCount}
            </p>
            <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-0.5 text-emerald-600 font-semibold">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
              <span>vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Clients */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Total Clients</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {clients.length}
            </p>
            <p className="mt-2 text-[11px] text-slate-500 font-medium">
              Registered tailor clients
            </p>
          </div>
        </div>

        {/* Card 4: Upcoming Due Dates */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-slate-300">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Upcoming Fittings</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {orders.filter((o) => o.status === "fitting").length}
            </p>
            <p className="mt-2 text-[11px] text-amber-600 font-semibold">
              Requires client fitting session
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders Data Table */}
      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Tailoring Orders
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Manage live production status, deposits, and client delivery dates.
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-900 hover:underline"
          >
            View all orders <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-3">Order Ref</th>
                <th className="px-6 py-3">Client</th>
                <th className="px-6 py-3">Order Status</th>
                <th className="px-6 py-3">Payment</th>
                <th className="px-6 py-3">Total Amount</th>
                <th className="px-6 py-3">Paid Deposit</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                    Loading recent orders...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-400">
                    No orders created yet. Click "Create Order" to start.
                  </td>
                </tr>
              ) : (
                orders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="group transition-colors hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-3.5 font-medium text-slate-900">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-700 text-[11px]">
                          {order.client.name ? order.client.name.slice(0, 2).toUpperCase() : "CL"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{order.client.name}</p>
                          <p className="text-[10px] text-slate-400">{order.client.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-3.5">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-3.5 font-bold text-slate-900">
                      ₦{order.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-emerald-600">
                      ₦{order.amountPaid.toLocaleString()}
                    </td>
                    <td className="px-6 py-3.5 text-slate-500 font-medium">
                      {order.dueDate}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <Eye className="h-3 w-3 text-slate-500" /> View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Global Quick Action Modals */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        onSuccess={fetchData}
      />
      <ClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}
