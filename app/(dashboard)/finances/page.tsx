"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Printer, Search, Filter, Eye } from "lucide-react";
import { Order, Organization } from "@/lib/types";
import { orderService, organizationService } from "@/lib/services";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Trash2 } from "lucide-react";

type InvoiceFilter = "all" | "paid" | "unpaid";

export default function FinancesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [org, setOrg] = useState<Organization | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<InvoiceFilter>("all");
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    Promise.all([
      orderService.getAll(),
      organizationService.getProfile(),
    ]).then(([orderData, orgData]) => {
      const arr = Array.isArray(orderData) ? orderData : [];
      setOrders(arr);
      setOrg(orgData);
      if (arr.length > 0) setSelectedOrder(arr[0]);
      setLoading(false);
    });
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];

  const filteredOrders = useMemo(() => {
    return safeOrders.filter((ord) => {
      const matchesSearch =
        ord.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
        (ord.client?.name || "").toLowerCase().includes(search.toLowerCase());

      const balance = (ord.amount || 0) - (ord.amountPaid || 0);
      const matchesFilter =
        filter === "all" ||
        (filter === "paid" && balance <= 0) ||
        (filter === "unpaid" && balance > 0);

      return matchesSearch && matchesFilter;
    });
  }, [safeOrders, search, filter]);

  const totalInvoiced = safeOrders.reduce((acc, o) => acc + (o.amount || 0), 0);
  const totalPaid = safeOrders.reduce((acc, o) => acc + (o.amountPaid || 0), 0);
  const totalUnpaid = totalInvoiced - totalPaid;

  const studioName = org?.name || "My Studio";
  const studioAddress = org?.address || "";
  const studioPhone = org?.phone || "";

  const handleDelete = async (orderId: string) => {
    if (!window.confirm("Are you sure you want to delete this invoice? This action cannot be undone.")) return;
    
    setIsDeleting(true);
    try {
      await orderService.delete(orderId);
      setOrders(orders.filter(o => o._id !== orderId));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(null);
      }
    } catch (err) {
      console.error("Failed to delete order", err);
      alert("Failed to delete invoice.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Invoices & Financial Summary
          </h1>
          <p className="text-xs text-stone-400 mt-1 font-medium">
            Track collected client deposits, outstanding tailoring balances, and print invoices.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all cursor-pointer"
          style={{ fontFamily: 'var(--font-varela-round)' }}
        >
          <Printer className="h-3.5 w-3.5 text-black" />
          Print Selected Invoice
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Invoiced</span>
          <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            ₵{totalInvoiced.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 font-medium">Across all order receipts</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Revenue Collected</span>
          <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            ₵{totalPaid.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 font-bold">
            {totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0}% paid in full
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-2">
          <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Outstanding Balances</span>
          <p className="text-3xl font-extrabold text-white tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
            ₵{totalUnpaid.toLocaleString()}
          </p>
          <p className="text-[11px] text-stone-400 font-bold">Pending client collection</p>
        </div>
      </div>

      {/* Grid: Invoice List & Branded Invoice Previewer */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Order Invoices List */}
        <div className="lg:col-span-5 rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-3">
          <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Select Order Invoice
          </h3>

          {/* Search & Filter */}
          <div className="flex items-center gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-stone-400" />
              <input
                type="text"
                placeholder="Search by order # or client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-stone-900 pl-9 pr-3 py-2 text-xs font-medium text-white placeholder:text-stone-500 focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-1">
              {(["all", "paid", "unpaid"] as InvoiceFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg px-2.5 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${
                    filter === f
                      ? "bg-white text-black"
                      : "bg-stone-900 text-stone-400 border border-white/10 hover:bg-stone-800"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {loading ? (
              <p className="text-xs text-stone-400 py-4 text-center">Loading invoices...</p>
            ) : filteredOrders.length === 0 ? (
              <p className="text-xs text-stone-400 py-4 text-center">No invoices match your search.</p>
            ) : (
              filteredOrders.map((ord) => {
                const balance = (ord.amount || 0) - (ord.amountPaid || 0);
                return (
                  <button
                    key={ord._id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all text-xs flex items-center justify-between cursor-pointer ${
                      selectedOrder?._id === ord._id
                        ? "border-white bg-white text-black font-extrabold shadow-sm"
                        : "border-white/10 bg-stone-900/80 hover:bg-stone-900 text-stone-300"
                    }`}
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold">{ord.orderNumber}</span>
                        {balance <= 0 && (
                          <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                            selectedOrder?._id === ord._id ? "bg-stone-200 text-stone-700" : "bg-white/10 text-stone-300"
                          }`}>
                            PAID
                          </span>
                        )}
                      </div>
                      <p className={`mt-0.5 font-medium ${selectedOrder?._id === ord._id ? "text-stone-700" : "text-stone-400"}`}>
                        {ord.client?.name || "N/A"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold">₵{(ord.amount || 0).toLocaleString()}</p>
                      <span className={`text-[10px] font-bold ${selectedOrder?._id === ord._id ? "text-stone-600" : "text-stone-400"}`}>
                        ₵{(ord.amountPaid || 0).toLocaleString()} paid
                      </span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Branded Invoice Viewer */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="rounded-3xl border border-white/10 bg-stone-950 p-8 shadow-xl space-y-6 print:bg-white print:text-black print:shadow-none print:border-none">
              {/* Invoice Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-6">
                <div>
                  <span className="text-2xl font-extrabold text-white tracking-tight uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
                    {studioName}
                  </span>
                  {studioAddress && <p className="text-xs text-stone-400 mt-1">{studioAddress}</p>}
                  {studioPhone && <p className="text-xs text-stone-400">Contact: {studioPhone}</p>}
                  
                  {user?.role === "ORG_ADMIN" && (
                    <button
                      onClick={() => handleDelete(selectedOrder._id)}
                      disabled={isDeleting}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-500/20 transition-colors disabled:opacity-50 print:hidden cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                      {isDeleting ? "Deleting..." : "Delete Invoice"}
                    </button>
                  )}
                </div>
                <div className="text-right">
                  <span className="inline-block px-3.5 py-1 bg-white text-black text-xs font-extrabold rounded-full tracking-wider uppercase">
                    INVOICE
                  </span>
                  <p className="text-xs font-bold text-white mt-2">
                    #{selectedOrder.orderNumber}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    Date: {selectedOrder.createdAt?.split("T")[0] || "N/A"}
                  </p>
                </div>
              </div>

              {/* Billed To Section */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">
                    BILLED TO:
                  </span>
                  <p className="font-bold text-white text-sm mt-1">{selectedOrder.client?.name || "N/A"}</p>
                  <p className="text-stone-400">{selectedOrder.client?.phone || ""}</p>
                  <p className="text-stone-400">{selectedOrder.client?.email || "No email listed"}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-stone-400 uppercase text-[10px] tracking-wider">
                    TARGET DELIVERY:
                  </span>
                  <p className="font-bold text-white text-sm mt-1">{selectedOrder.dueDate || "N/A"}</p>
                </div>
              </div>

              {/* Table of Charges */}
              <div className="border border-white/10 rounded-2xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-stone-900 border-b border-white/10 text-stone-400 font-bold uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5">Garment Description / Service</th>
                      <th className="p-3.5 text-right">Amount (₵)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="p-3.5 font-medium text-stone-200">
                        {selectedOrder.notes || "Custom Tailored Fitting & Garment Design"}
                        <span className="block text-[10px] text-stone-400 mt-0.5">Fit: {selectedOrder.clothSize || "Custom Dimensions"}</span>
                      </td>
                      <td className="p-3.5 text-right font-bold text-white">
                        ₵{(selectedOrder.amount || 0).toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Payments Summary */}
              <div className="flex flex-col items-end text-xs space-y-1.5 pt-2">
                <div className="flex justify-between w-56 text-stone-400">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">₵{(selectedOrder.amount || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-56 text-white font-bold">
                  <span>Deposit Paid:</span>
                  <span>- ₵{(selectedOrder.amountPaid || 0).toLocaleString()}</span>
                </div>
                <div className="my-2 border-t border-white/10 w-56" />
                <div className="flex justify-between w-56 text-sm font-extrabold text-white">
                  <span>Balance Due:</span>
                  <span className="text-stone-300">
                    ₵{((selectedOrder.amount || 0) - (selectedOrder.amountPaid || 0)).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-white/10 pt-6 text-center text-[11px] text-stone-400 font-medium">
                Thank you for choosing {studioName}! Please retain this invoice for fitting collection.
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-stone-400 font-medium">
              Select an order on the left to display its invoice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
