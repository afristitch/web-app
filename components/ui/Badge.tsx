"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { OrderStatus, PaymentStatus } from "@/lib/types";

interface BadgeProps {
  variant?: "slate" | "emerald" | "amber" | "rose" | "purple" | "indigo";
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant = "slate", children, className, dot = false }: BadgeProps) {
  const variantStyles = {
    slate: "bg-slate-100 text-slate-800 border-slate-200/80 font-semibold",
    emerald: "bg-emerald-50 text-emerald-800 border-emerald-200/80 font-semibold",
    amber: "bg-amber-50 text-amber-900 border-amber-200/80 font-semibold",
    rose: "bg-rose-50 text-rose-800 border-rose-200/80 font-semibold",
    purple: "bg-purple-50 text-purple-800 border-purple-200/80 font-semibold",
    indigo: "bg-indigo-50 text-indigo-800 border-indigo-200/80 font-semibold",
  };

  const dotColors = {
    slate: "bg-slate-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-600",
    rose: "bg-rose-600",
    purple: "bg-purple-600",
    indigo: "bg-indigo-600",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-semibold rounded-md border tracking-tight transition-colors",
        variantStyles[variant],
        className
      )}
    >
      {dot && <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotColors[variant])} />}
      {children}
    </span>
  );
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  switch (status) {
    case "pending":
      return <Badge variant="amber" dot>Pending</Badge>;
    case "in-progress":
      return <Badge variant="slate" dot>In Progress</Badge>;
    case "fitting":
      return <Badge variant="purple" dot>Fitting</Badge>;
    case "completed":
      return <Badge variant="emerald" dot>Completed</Badge>;
    case "delivered":
      return <Badge variant="indigo" dot>Delivered</Badge>;
    case "cancelled":
      return <Badge variant="rose" dot>Cancelled</Badge>;
    default:
      return <Badge variant="slate" dot>{status}</Badge>;
  }
}

export function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  switch (status) {
    case "paid":
      return <Badge variant="emerald">Paid Full</Badge>;
    case "partial":
      return <Badge variant="amber">Deposit Paid</Badge>;
    case "unpaid":
      return <Badge variant="rose">Unpaid</Badge>;
    default:
      return <Badge variant="slate">{status}</Badge>;
  }
}
