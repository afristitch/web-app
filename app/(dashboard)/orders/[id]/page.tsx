"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Shirt,
  Printer,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { Order, OrderStatus } from "@/lib/types";
import { orderService } from "@/lib/services";
import { OrderStatusBadge, PaymentStatusBadge } from "@/components/ui/Badge";
import Image from "next/image";

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      orderService
        .getById(id)
        .then((data) => setOrder(data))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (!id || !order) return;
    try {
      const updated = await orderService.updateStatus(id, newStatus);
      setOrder(updated);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-slate-400">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-12 text-center text-xs font-semibold text-slate-400">
        Order not found.
      </div>
    );
  }

  const steps: { label: string; status: OrderStatus }[] = [
    { label: "Pending", status: "pending" },
    { label: "In Production", status: "in-progress" },
    { label: "Fitting Session", status: "fitting" },
    { label: "Completed", status: "completed" },
    { label: "Delivered", status: "delivered" },
  ];

  const currentStepIdx = steps.findIndex((s) => s.status === order.status);

  return (
    <div className="space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </button>

      {/* Order Header Card */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Order {order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Created on {order.createdAt?.split("T")[0]} • Target Delivery:{" "}
              <span className="font-bold text-slate-900">{order.dueDate}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" /> Print Order Slip
            </button>
            <Link
              href={`/finances?invoice=${order.orderNumber}`}
              className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-slate-800 transition-all"
            >
              <FileText className="h-3.5 w-3.5 text-[#FDDA0D]" /> View Invoice
            </Link>
          </div>
        </div>

        {/* Status Stepper Progress Bar */}
        <div className="pt-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
            Production Stage Pipeline
          </p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            {steps.map((step, idx) => {
              const isPast = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <button
                  key={step.status}
                  onClick={() => handleUpdateStatus(step.status)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-bold transition-all ${
                    isCurrent
                      ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                      : isPast
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 bg-slate-50/50 text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  <span>{step.label}</span>
                  {isPast && <CheckCircle2 className="h-3.5 w-3.5 mt-1" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Columns: Fabric Image & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Fabric Photo & Outfit Details */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900">
              Garment Specifications & Notes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.clothImageUrl ? (
                <div className="relative h-64 w-full overflow-hidden rounded-xl border border-slate-100">
                  <Image
                    src={order.clothImageUrl}
                    alt="Fabric"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-64 w-full flex-col items-center justify-center rounded-xl bg-slate-50 border border-slate-200/60 text-slate-400">
                  <Shirt className="h-8 w-8 mb-2" />
                  <span className="text-xs font-semibold">No fabric photo uploaded</span>
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <span className="block font-semibold text-slate-400">Outfit Size/Fit:</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {order.clothSize || "Custom Fit"}
                  </span>
                </div>
                <div>
                  <span className="block font-semibold text-slate-400">Tailoring Notes:</span>
                  <p className="mt-1 rounded-xl bg-slate-50 p-3 text-slate-700 font-medium border border-slate-100">
                    {order.notes || "Standard fitting guidelines."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Client & Payment Summary */}
        <div className="space-y-6">
          {/* Client Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Client Details
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-[#FDDA0D]">
                {order.client.name ? order.client.name.slice(0, 2).toUpperCase() : "CL"}
              </div>
              <div>
                <p className="font-bold text-slate-900 text-sm">{order.client.name}</p>
                <p className="text-xs text-slate-500 font-medium">{order.client.phone}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-100 flex gap-2">
              <Link
                href={`/clients/${order.client._id}`}
                className="flex-1 rounded-xl border border-slate-200 py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Client Profile
              </Link>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Financial Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Total Order Cost</span>
                <span className="font-bold text-slate-900">
                  ₦{order.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-emerald-600">
                <span>Amount Paid</span>
                <span className="font-bold">
                  ₦{order.amountPaid.toLocaleString()}
                </span>
              </div>
              <div className="my-2 border-t border-slate-100" />
              <div className="flex justify-between text-sm font-extrabold text-slate-900">
                <span>Balance Remaining</span>
                <span className="text-rose-600">
                  ₦{(order.amount - order.amountPaid).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
