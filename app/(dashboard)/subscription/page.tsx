"use client";

import React, { useEffect, useState, useCallback, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api-client";
import {
  Check,
  CreditCard,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  Building2,
  User as UserIcon,
  ShieldCheck,
  ArrowRight,
  Lock,
  Zap
} from "lucide-react";

interface SubscriptionStatus {
  plan?: string;
  status: string;
  subscriptionEndsAt?: string;
  isPremium: boolean;
  daysLeft: number;
}

const DURATION_OPTIONS = [
  {
    months: 1,
    name: "Monthly Pro",
    durationLabel: "1 Month",
    discount: 0,
    tag: "Flexible",
    isPopular: false,
    features: [
      "Bulk SMS Notifications",
      "Multi-staff & Team Access",
      "Style Portfolio Gallery",
      "Unlimited Orders & Clients",
      "Priority Support"
    ]
  },
  {
    months: 6,
    name: "Semi-Annual Pro",
    durationLabel: "6 Months",
    discount: 0.10,
    tag: "Save 10%",
    isPopular: false,
    features: [
      "Everything in Monthly",
      "Bulk SMS Notifications",
      "Multi-staff & Team Access",
      "Style Portfolio Gallery",
      "Priority Support"
    ]
  },
  {
    months: 12,
    name: "Annual Pro",
    durationLabel: "12 Months",
    discount: 0.20,
    tag: "Best Value • 20% OFF",
    isPopular: true,
    features: [
      "Everything in Monthly",
      "Bulk SMS Notifications",
      "Multi-staff & Team Access",
      "Style Portfolio Gallery",
      "VIP Priority Support"
    ]
  }
];

function SubscriptionContent() {
  const { user, activeWorkspace: organization, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [initializingMonths, setInitializingMonths] = useState<number | null>(null);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedMonths, setSelectedMonths] = useState<number | null>(12);

  const isPaymentComplete = searchParams.get("payment") === "complete" || !!searchParams.get("reference");

  const fetchSubscriptionData = useCallback(async () => {
    setLoadingStatus(true);
    try {
      const statusRes = await api.get("/organization/subscription");
      if (statusRes.success && statusRes.data) {
        setSubStatus(statusRes.data);
      }
    } catch (err: any) {
      console.error("Failed to load subscription status:", err);
      setErrorMsg(err.message || "Failed to load current subscription information.");
    } finally {
      setLoadingStatus(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?redirectUrl=/subscription");
      return;
    }

    if (user) {
      fetchSubscriptionData();
    }
  }, [authLoading, user, router, fetchSubscriptionData]);

  useEffect(() => {
    if (isPaymentComplete) {
      setPaymentSuccessMsg("Payment verified successfully! Updating your subscription status...");
      const timer = setTimeout(() => {
        fetchSubscriptionData();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPaymentComplete, fetchSubscriptionData]);

  const handlePaystackPayment = async (months: number) => {
    setInitializingMonths(months);
    setErrorMsg(null);

    try {
      const callbackUrl = `${window.location.origin}/subscription?payment=complete`;
      const payload = {
        planId: "premium",
        months,
        callbackUrl,
      };

      const res = await api.post("/payments/initialize", payload);

      if (res.success && res.data?.authorization_url) {
        window.location.href = res.data.authorization_url;
      } else {
        setErrorMsg(res.message || "Could not initialize Paystack payment.");
        setInitializingMonths(null);
      }
    } catch (err: any) {
      console.error("Payment initialization error:", err);
      setErrorMsg(err.message || "Error starting payment process. Please try again.");
      setInitializingMonths(null);
    }
  };

  if (authLoading || (user && loadingStatus && !subStatus)) {
    return (
      <div className="flex h-64 items-center justify-center text-stone-400 font-medium text-xs">
        <Loader2 className="w-5 h-5 animate-spin text-white mr-2" /> Loading Subscription Information...
      </div>
    );
  }

  if (!user) return null;

  const basePrice = 50;

  const statusBadge = () => {
    if (!subStatus) return null;
    switch (subStatus.status) {
      case "ACTIVE":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
            <CheckCircle2 size={14} /> Active Premium
          </span>
        );
      case "EXPIRED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
            <AlertTriangle size={14} /> Subscription Expired
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/20 uppercase tracking-wider">
            Free Plan
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
      {/* Profile & Business Subscription Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          {user.photoUrl && (user.photoUrl.startsWith("http://") || user.photoUrl.startsWith("https://")) ? (
            <Image
              src={user.photoUrl}
              alt={user.name || "User Photo"}
              width={56}
              height={56}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/20 shrink-0 shadow-xl"
              unoptimized
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-white text-black font-extrabold text-xl flex items-center justify-center shrink-0 uppercase shadow-xl">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
          )}

          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase" style={{ fontFamily: 'var(--font-varela-round)' }}>
              Studio Billing & Subscription
            </h1>
            <p className="text-xs text-stone-400 mt-1 font-medium flex items-center gap-2">
              <span>{user.name}</span> • <span>{organization?.name || "Tailor Studio"}</span> • <span className="text-stone-300 font-bold">{user.email}</span>
            </p>
          </div>
        </div>

        {statusBadge()}
      </div>

      {/* Alert Notices */}
      {paymentSuccessMsg && (
        <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{paymentSuccessMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-bold flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Plan Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-tight text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
            Select Plan Duration & Upgrade
          </h2>
          <span className="text-xs font-medium text-stone-400">Manual Renewal • Instant Activation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DURATION_OPTIONS.map((opt) => {
            const optTotal = Number((basePrice * opt.months * (1 - opt.discount)).toFixed(2));
            const perMonth = Number((optTotal / opt.months).toFixed(2));
            const isInitializingThisCard = initializingMonths === opt.months;
            const isSelected = selectedMonths === opt.months;

            return (
              <div
                key={opt.months}
                onClick={() => setSelectedMonths(isSelected ? null : opt.months)}
                className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-200 flex flex-col justify-between cursor-pointer select-none ${
                  isSelected
                    ? 'border-white bg-white/[0.07] shadow-2xl ring-1 ring-white/30'
                    : opt.isPopular
                    ? 'border-white/40 bg-white/[0.04] hover:border-white/70'
                    : 'border-white/10 bg-stone-950 hover:border-white/30'
                }`}
              >
                {opt.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-0.5 bg-white text-black text-[10px] font-extrabold rounded-full tracking-wider uppercase shadow-md whitespace-nowrap">
                    {opt.tag}
                  </div>
                )}

                <div>
                  {!opt.isPopular && opt.tag && (
                    <div className="mb-4 text-center">
                      <span className="inline-block px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-stone-300 tracking-wider uppercase">
                        {opt.tag}
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <h3 className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-2" style={{ fontFamily: 'var(--font-varela-round)' }}>
                      {opt.name}
                    </h3>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
                        ₵{optTotal}
                      </span>
                      <span className="text-stone-500 font-medium text-xs" style={{ fontFamily: 'var(--font-varela-round)' }}>
                        / {opt.durationLabel}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-stone-400 font-mono">
                      ₵{perMonth} / month
                    </div>
                  </div>

                  <div className="space-y-3 mb-6 border-t border-white/10 pt-5">
                    {opt.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-stone-300">
                        <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <Check className="text-white" size={10} />
                        </div>
                        <span className="text-xs font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pay button — only visible when this card is selected */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isSelected ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                  }`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handlePaystackPayment(opt.months)}
                    disabled={initializingMonths !== null}
                    className="w-full py-3 rounded-full font-extrabold tracking-wider uppercase text-xs transition-all hover:bg-stone-200 flex items-center justify-center gap-2 bg-white text-black disabled:opacity-50 cursor-pointer shadow-xs"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                  >
                    {isInitializingThisCard ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-black" />
                        Initializing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 text-black" />
                        Pay ₵{optTotal}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security & Payment Provider Note */}
      <div className="p-4 rounded-2xl bg-stone-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
        <div className="flex items-center gap-3">
          <Lock className="w-4 h-4 text-white shrink-0 hidden sm:block" />
          <span>Secured by Paystack. Supports MTN Mobile Money, Telecel Cash, Visa, & Mastercard.</span>
        </div>
        <div className="flex items-center gap-2 text-white font-bold">
          <Zap size={14} className="text-white shrink-0" /> Instant automatic activation upon payment confirmation.
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center text-stone-400">
          <Loader2 className="w-6 h-6 animate-spin text-white" />
        </div>
      }
    >
      <SubscriptionContent />
    </Suspense>
  );
}
