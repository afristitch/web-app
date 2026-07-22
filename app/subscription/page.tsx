"use client";

import Image from "next/image";
import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api-client";
import { SectionWrapper } from "@/components/landing/SectionWrapper";
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
    Lock
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
    const { user, organization, loading: authLoading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [initializingMonths, setInitializingMonths] = useState<number | null>(null);
    const [paymentSuccessMsg, setPaymentSuccessMsg] = useState<string | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="flex flex-col items-center gap-4 text-stone-400">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                    <p className="text-xs font-medium tracking-wider uppercase text-stone-500">Loading Account Details...</p>
                </div>
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
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                        <AlertTriangle size={14} /> Subscription Expired
                    </span>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen pt-24 sm:pt-32 pb-20 sm:pb-28 bg-black text-white">
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* User Header Profile */}
                    <div className="mb-10 pb-6 sm:pb-8 border-b border-white/10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            {user.photoUrl && (user.photoUrl.startsWith("http://") || user.photoUrl.startsWith("https://")) ? (
                                <Image
                                    src={user.photoUrl}
                                    alt={user.name || "User Photo"}
                                    width={56}
                                    height={56}
                                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-white/20 shrink-0 shadow-2xl"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FDDA0D] text-black font-extrabold text-xl sm:text-2xl flex items-center justify-center shrink-0 uppercase shadow-2xl">
                                    {user.name ? user.name.charAt(0) : "U"}
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <h1
                                    className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-white leading-tight break-words"
                                    style={{ fontFamily: "var(--font-varela-round)" }}
                                >
                                    {user.name || "Tailor Account"}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-stone-400 mt-1.5">
                                    <span className="flex items-center gap-1.5 font-medium text-stone-200">
                                        <Building2 size={14} className="text-stone-500 shrink-0" /> {organization?.name || "Tailor Shop"}
                                    </span>
                                    <span className="text-stone-600 hidden sm:inline">•</span>
                                    <span className="flex items-center gap-1.5 text-stone-400 truncate max-w-[220px] sm:max-w-none">
                                        <UserIcon size={14} className="shrink-0" /> {user.email}
                                    </span>
                                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-wider font-bold text-[10px] text-stone-300">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Alert Notices */}
                    {paymentSuccessMsg && (
                        <div className="mb-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span>{paymentSuccessMsg}</span>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-8 p-4 rounded-2xl bg-red-950/60 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-3 animate-in fade-in">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Current Subscription Banner */}
                    <div className="mb-12 sm:mb-16 p-6 sm:p-8 md:p-10 rounded-3xl bg-stone-950/90 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none hidden sm:block">
                            <ShieldCheck size={240} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500 mb-2" style={{ fontFamily: "var(--font-varela-round)" }}>
                                    Active Account Overview
                                </div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <h2
                                        className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-tight text-white"
                                        style={{ fontFamily: "var(--font-varela-round)" }}
                                    >
                                        {subStatus?.isPremium ? "SewDigital Premium" : "Standard Plan"}
                                    </h2>
                                    {statusBadge()}
                                </div>
                                <p className="text-stone-400 text-xs sm:text-sm max-w-xl leading-relaxed">
                                    {subStatus?.isPremium
                                        ? "Your shop is currently enjoying full access to Bulk SMS marketing, multi-staff permissions, and unlimited order management."
                                        : "Upgrade to SewDigital Premium to unlock Bulk SMS customer updates, multi-staff management, and priority support."}
                                </p>
                            </div>

                            {subStatus?.isPremium && (
                                <div className="md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center shrink-0">
                                    <div className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">
                                        Days Remaining
                                    </div>
                                    <div className="text-3xl sm:text-4xl font-extrabold text-white">
                                        {subStatus?.daysLeft ?? 0}{" "}
                                        <span className="text-stone-500 text-sm font-normal">days</span>
                                    </div>
                                    {subStatus?.subscriptionEndsAt && (
                                        <div className="text-[11px] text-stone-500 mt-1 font-mono">
                                            Expires: {new Date(subStatus.subscriptionEndsAt).toLocaleDateString()}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Plans Header */}
                    <div className="text-center mb-12 sm:mb-16">
                        <h2
                            className="text-xs font-bold tracking-cinematic uppercase text-[#FDDA0D] mb-3 flex items-center justify-center gap-2"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            <Sparkles size={14} /> Instant Activation
                        </h2>
                        <h3
                            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-4"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            CHOOSE YOUR <span className="text-stone-500">BILLING DURATION.</span>
                        </h3>
                        <p className="text-stone-400 text-xs sm:text-base max-w-2xl mx-auto px-2">
                            Extend or upgrade your tailoring business subscription. Pay securely with Paystack on any plan below.
                        </p>
                    </div>

                    {/* Plan Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
                        {DURATION_OPTIONS.map((opt) => {
                            const optTotal = Number((basePrice * opt.months * (1 - opt.discount)).toFixed(2));
                            const perMonth = Number((optTotal / opt.months).toFixed(2));
                            const isInitializingThisCard = initializingMonths === opt.months;

                            return (
                                <div
                                    key={opt.months}
                                    className={`relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                                        opt.isPopular
                                            ? 'border-white bg-white/[0.03] shadow-2xl ring-1 ring-white/20'
                                            : 'border-white/10 bg-stone-950 hover:border-white/30 hover:bg-white/[0.01]'
                                    }`}
                                >
                                    {opt.isPopular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] sm:text-[11px] font-bold rounded-full tracking-wider uppercase shadow-lg whitespace-nowrap">
                                            {opt.tag}
                                        </div>
                                    )}

                                    <div>
                                        {!opt.isPopular && opt.tag && (
                                            <div className="mb-4 text-center">
                                                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-stone-300 tracking-wider uppercase">
                                                    {opt.tag}
                                                </span>
                                            </div>
                                        )}

                                        <div className="text-center mb-6 sm:mb-8">
                                            <h4
                                                className="text-stone-400 font-bold uppercase tracking-widest text-xs mb-3"
                                                style={{ fontFamily: 'var(--font-varela-round)' }}
                                            >
                                                {opt.name}
                                            </h4>
                                            <div className="flex items-baseline justify-center gap-1.5">
                                                <span
                                                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                                >
                                                    ₵{optTotal}
                                                </span>
                                                <span
                                                    className="text-stone-500 font-medium text-xs sm:text-sm"
                                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                                >
                                                    / {opt.durationLabel}
                                                </span>
                                            </div>
                                            <div className="mt-2 text-xs text-stone-400 font-mono">
                                                ₵{perMonth} / month
                                            </div>
                                        </div>

                                        <div className="space-y-3.5 mb-8 border-t border-white/10 pt-6">
                                            {opt.features.map((feature, fIdx) => (
                                                <div key={fIdx} className="flex items-center gap-3 text-stone-300">
                                                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                                        <Check className="text-white" size={12} />
                                                    </div>
                                                    <span className="text-xs font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pay Button Directly on Card */}
                                    <button
                                        type="button"
                                        onClick={() => handlePaystackPayment(opt.months)}
                                        disabled={initializingMonths !== null}
                                        className={`w-full py-4 rounded-full font-bold tracking-widest uppercase text-xs transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 ${
                                            opt.isPopular
                                                ? 'bg-white text-black hover:bg-[#FDDA0D]'
                                                : 'bg-white/10 text-white hover:bg-[#FDDA0D] hover:text-black border border-white/10'
                                        } disabled:opacity-50 disabled:pointer-events-none`}
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {isInitializingThisCard ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Initializing...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="w-4 h-4" />
                                                Pay ₵{optTotal}
                                            </>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* Paystack Security Notice */}
                    <div className="p-4 sm:p-6 rounded-2xl bg-stone-950 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-stone-400">
                        <div className="flex items-center gap-3 text-center sm:text-left">
                            <Lock className="w-4 h-4 text-stone-400 shrink-0 hidden sm:block" />
                            <span>Secured by Paystack. Supports MTN Mobile Money, Telecel Cash, Visa, & Mastercard.</span>
                        </div>
                        <div className="flex items-center gap-2 text-stone-300 font-medium">
                            <ArrowRight size={14} className="text-[#FDDA0D] shrink-0" /> Instant automatic activation upon payment.
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default function SubscriptionPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-black">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
            }
        >
            <SubscriptionContent />
        </Suspense>
    );
}
