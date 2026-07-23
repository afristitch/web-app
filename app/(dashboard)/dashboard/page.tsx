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
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Page Title & Action Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 
            className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            Business Dashboard
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Real-time breakdown of tailoring orders, client revenue, and pending fittings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsClientModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-white hover:text-black transition-all cursor-pointer"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            <Plus className="h-3.5 w-3.5" />
            Add Client
          </button>
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            <Plus className="h-3.5 w-3.5 text-black" />
            Create Order
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Revenue */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Gross Revenue</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <Wallet className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              ₵{totalRevenue.toLocaleString()}
            </p>
            <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-stone-400">
              <span className="text-white font-bold">₵{totalPaid.toLocaleString()} paid</span>
              <span className="text-stone-400 font-bold">₵{pendingBalance.toLocaleString()} pending</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Active Work orders</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <ShoppingBag className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              {activeOrdersCount}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-stone-400">
              <span className="inline-flex items-center gap-0.5 text-white font-bold">
                <TrendingUp className="h-3 w-3" /> Live Sync
              </span>
              <span>with node api</span>
            </div>
          </div>
        </div>

        {/* Card 3: Total Clients */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Clients</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <Users className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              {safeClients.length}
            </p>
            <p className="mt-3 text-[11px] text-stone-400 font-medium">
              Registered tailor clients
            </p>
          </div>
        </div>

        {/* Card 4: Upcoming Due Dates */}
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Upcoming Fittings</span>
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10 border border-white/20 text-white">
              <Clock className="h-4.5 w-4.5" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              {safeOrders.filter((o) => o.status === "fitting").length}
            </p>
            <p className="mt-3 text-[11px] text-stone-400 font-bold">
              Requires client fitting session
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Orders Data Table */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h3 className="text-base font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              Recent Tailoring Orders
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-medium">
              Manage live production status, deposits, and client delivery dates.
            </p>
          </div>
          <Link
            href="/orders"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-stone-300 transition-colors"
            style={{ fontFamily: 'var(--font-varela-round)' }}
          >
            View all orders <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-stone-900/60 text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                <th className="px-6 py-4">Order Ref</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Order Status</th>
                <th className="px-6 py-4">Payment</th>
                <th className="px-6 py-4">Total Amount</th>
                <th className="px-6 py-4">Paid Deposit</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-stone-400 font-medium">
                    Loading live orders from API...
                  </td>
                </tr>
              ) : safeOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-stone-400 font-medium">
                    No orders created yet. Click "Create Order" to start.
                  </td>
                </tr>
              ) : (
                safeOrders.slice(0, 5).map((order) => (
                  <tr
                    key={order._id}
                    className="group transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4 font-bold text-white">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 font-bold text-white text-[11px]">
                          {order.client?.name ? order.client.name.slice(0, 2).toUpperCase() : "CL"}
                        </div>
                        <div>
                          <p className="font-bold text-white">{order.client?.name || "N/A"}</p>
                          <p className="text-[10px] text-stone-400">{order.client?.phone || ""}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      ₵{(order.amount || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 font-bold text-white">
                      ₵{(order.amountPaid || 0).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-stone-300 font-medium">
                      {order.dueDate || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/orders/${order._id}`}
                        className="inline-flex items-center gap-1 rounded-xl border border-white/20 bg-stone-900 px-3 py-1.5 text-[11px] font-bold text-white hover:bg-white hover:text-black transition-all"
                      >
                        <Eye className="h-3 w-3" /> View
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
