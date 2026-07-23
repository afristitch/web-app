"use client";

import React, { useEffect, useState } from "react";
import { Printer } from "lucide-react";
import { Order } from "@/lib/types";
import { orderService } from "@/lib/services";

export default function FinancesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    orderService.getAll().then((data) => {
      const arr = Array.isArray(data) ? data : [];
      setOrders(arr);
      if (arr.length > 0) setSelectedOrder(arr[0]);
    });
  }, []);

  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalInvoiced = safeOrders.reduce((acc, o) => acc + (o.amount || 0), 0);
  const totalPaid = safeOrders.reduce((acc, o) => acc + (o.amountPaid || 0), 0);
  const totalUnpaid = totalInvoiced - totalPaid;

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Invoices & Financial Summary
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track collected client deposits, outstanding tailoring balances, and print invoices.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[#005B82] px-4 py-2 text-xs font-semibold text-white shadow-2xs hover:bg-[#004A6B] transition-all"
        >
          <Printer className="h-3.5 w-3.5 text-white" />
          Print Selected Invoice
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Invoiced</span>
          <p className="mt-2 text-2xl font-extrabold text-slate-900">
            ₦{totalInvoiced.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-slate-400 font-medium">Across all order receipts</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Revenue Collected</span>
          <p className="mt-2 text-2xl font-extrabold text-emerald-600">
            ₦{totalPaid.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-emerald-600 font-semibold">
            {totalInvoiced > 0 ? Math.round((totalPaid / totalInvoiced) * 100) : 0}% paid in full
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Outstanding Balances</span>
          <p className="mt-2 text-2xl font-extrabold text-rose-600">
            ₦{totalUnpaid.toLocaleString()}
          </p>
          <p className="mt-1 text-[11px] text-rose-500 font-semibold">Pending client collection</p>
        </div>
      </div>

      {/* Grid: Invoice List & Paystack-style Branded Invoice Previewer */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Order Invoices List */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Order Invoice
          </h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {orders.map((ord) => (
              <button
                key={ord._id}
                onClick={() => setSelectedOrder(ord)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex items-center justify-between ${
                  selectedOrder?._id === ord._id
                    ? "border-slate-900 bg-slate-900 text-white font-bold shadow-xs"
                    : "border-slate-100 bg-white hover:bg-slate-50 text-slate-800"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">{ord.orderNumber}</span>
                  </div>
                  <p className={`mt-0.5 font-medium ${selectedOrder?._id === ord._id ? "text-slate-300" : "text-slate-500"}`}>
                    {ord.client.name}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">₦{ord.amount.toLocaleString()}</p>
                  <span className={`text-[10px] font-semibold ${selectedOrder?._id === ord._id ? "text-emerald-400" : "text-emerald-600"}`}>
                    ₦{ord.amountPaid.toLocaleString()} paid
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Branded Paystack-style Invoice Viewer */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-md space-y-6 print:shadow-none print:border-none">
              {/* Invoice Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div>
                  <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                    SewDigital Studio
                  </span>
                  <p className="text-xs text-slate-500 mt-1">14 Victoria Island, Lagos, Nigeria</p>
                  <p className="text-xs text-slate-500">Contact: +234 800 000 7393</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-bold rounded-lg tracking-wider uppercase">
                    INVOICE
                  </span>
                  <p className="text-xs font-bold text-slate-900 mt-2">
                    #{selectedOrder.orderNumber}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Date: {selectedOrder.createdAt?.split("T")[0] || "2026-07-23"}
                  </p>
                </div>
              </div>

              {/* Billed To Section */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    BILLED TO:
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedOrder.client.name}</p>
                  <p className="text-slate-500">{selectedOrder.client.phone}</p>
                  <p className="text-slate-500">{selectedOrder.client.email || "No email listed"}</p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-400 uppercase text-[10px] tracking-wider">
                    TARGET DELIVERY:
                  </span>
                  <p className="font-bold text-slate-900 text-sm mt-1">{selectedOrder.dueDate}</p>
                </div>
              </div>

              {/* Table of Charges */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                    <tr>
                      <th className="p-3">Garment Description / Service</th>
                      <th className="p-3 text-right">Amount (₦)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-medium text-slate-800">
                        {selectedOrder.notes || "Custom Tailored Fitting & Garment Design"}
                        <span className="block text-[10px] text-slate-400 mt-0.5">Fit: {selectedOrder.clothSize || "Custom Dimensions"}</span>
                      </td>
                      <td className="p-3 text-right font-bold text-slate-900">
                        ₦{selectedOrder.amount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Payments Summary */}
              <div className="flex flex-col items-end text-xs space-y-1 pt-2">
                <div className="flex justify-between w-56 text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900">₦{selectedOrder.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-56 text-emerald-600 font-semibold">
                  <span>Deposit Paid:</span>
                  <span>- ₦{selectedOrder.amountPaid.toLocaleString()}</span>
                </div>
                <div className="my-2 border-t border-slate-200 w-56" />
                <div className="flex justify-between w-56 text-sm font-extrabold text-slate-900">
                  <span>Balance Due:</span>
                  <span className="text-rose-600">
                    ₦{(selectedOrder.amount - selectedOrder.amountPaid).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Footer Stamp */}
              <div className="border-t border-slate-100 pt-6 text-center text-[11px] text-slate-400 font-medium">
                Thank you for choosing SewDigital Studio! Please retain this invoice for fitting collection.
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              Select an order on the left to display its invoice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
