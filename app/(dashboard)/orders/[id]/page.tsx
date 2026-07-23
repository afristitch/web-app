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
      <div className="py-16 text-center text-xs font-medium text-stone-400" style={{ fontFamily: 'var(--font-varela-round)' }}>
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-16 text-center text-xs font-medium text-stone-400" style={{ fontFamily: 'var(--font-varela-round)' }}>
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
    <div className="space-y-6 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-white transition-colors cursor-pointer"
        style={{ fontFamily: 'var(--font-varela-round)' }}
      >
        <ArrowLeft className="h-4 w-4" /> Back to Orders
      </button>

      {/* Order Header Card */}
      <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
                Order #{order.orderNumber}
              </h1>
              <OrderStatusBadge status={order.status} />
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>
            <p className="text-xs text-stone-400 mt-1 font-medium">
              Created on {order.createdAt?.split("T")[0]} • Target Delivery:{" "}
              <span className="font-bold text-white">{order.dueDate || "N/A"}</span>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-stone-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-white hover:text-black transition-all cursor-pointer"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <Printer className="h-3.5 w-3.5" /> Print Order Slip
            </button>
            <Link
              href={`/finances?invoice=${order.orderNumber}`}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-extrabold text-black shadow-xs hover:bg-stone-200 transition-all"
              style={{ fontFamily: 'var(--font-varela-round)' }}
            >
              <FileText className="h-3.5 w-3.5 text-black" /> View Invoice
            </Link>
          </div>
        </div>

        {/* Status Stepper Progress Bar */}
        <div className="pt-6">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Production Stage Pipeline
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {steps.map((step, idx) => {
              const isPast = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;
              return (
                <button
                  key={step.status}
                  onClick={() => handleUpdateStatus(step.status)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border text-xs font-bold transition-all cursor-pointer ${
                    isCurrent
                      ? "border-white bg-white text-black font-extrabold shadow-sm"
                      : isPast
                      ? "border-emerald-500/30 bg-emerald-950/60 text-emerald-400"
                      : "border-white/10 bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-white"
                  }`}
                  style={{ fontFamily: 'var(--font-varela-round)' }}
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
          <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 sm:p-8 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
              Garment Specifications & Notes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {order.clothImageUrl ? (
                <div className="relative h-64 w-full overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={order.clothImageUrl}
                    alt="Fabric"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-64 w-full flex-col items-center justify-center rounded-2xl bg-stone-900 border border-white/10 text-stone-400">
                  <Shirt className="h-8 w-8 mb-2 text-stone-500" />
                  <span className="text-xs font-semibold">No fabric photo uploaded</span>
                </div>
              )}

              <div className="space-y-4 text-xs">
                <div>
                  <span className="block font-bold text-stone-400 uppercase text-[10px] tracking-wider mb-1">Outfit Size / Fit:</span>
                  <span className="font-extrabold text-white text-base">
                    {order.clothSize || "Custom Fit"}
                  </span>
                </div>
                <div>
                  <span className="block font-bold text-stone-400 uppercase text-[10px] tracking-wider mb-1">Tailoring Notes:</span>
                  <p className="rounded-2xl bg-stone-900 p-4 text-stone-300 font-medium border border-white/10 leading-relaxed">
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
          <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Client Details
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xs font-extrabold text-black uppercase">
                {order.client?.name ? order.client.name.slice(0, 2).toUpperCase() : "CL"}
              </div>
              <div>
                <p className="font-bold text-white text-sm">{order.client?.name || "N/A"}</p>
                <p className="text-xs text-stone-400 font-medium">{order.client?.phone || ""}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <Link
                href={`/clients/${order.client?._id || ""}`}
                className="flex-1 rounded-full border border-white/20 bg-stone-900 py-2 text-center text-xs font-bold text-white hover:bg-white hover:text-black transition-colors"
                style={{ fontFamily: 'var(--font-varela-round)' }}
              >
                View Client Profile
              </Link>
            </div>
          </div>

          {/* Payment Summary Card */}
          <div className="rounded-3xl border border-white/10 bg-stone-950 p-6 shadow-xl space-y-4">
            <h3 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Financial Breakdown
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-400">
                <span>Total Order Cost</span>
                <span className="font-bold text-white">
                  ₵{(order.amount || 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Amount Paid</span>
                <span>
                  ₵{(order.amountPaid || 0).toLocaleString()}
                </span>
              </div>
              <div className="my-2 border-t border-white/10" />
              <div className="flex justify-between text-sm font-extrabold text-white">
                <span>Balance Remaining</span>
                <span className="text-rose-400">
                  ₵{((order.amount || 0) - (order.amountPaid || 0)).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
