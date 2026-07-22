"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api-client";
import { SectionWrapper } from "@/components/landing/SectionWrapper";
import {
    Check,
    CreditCard,
    Sparkles,
    Clock,
    AlertTriangle,
    CheckCircle2,
    Loader2,
    LogOut,
    Building2,
    User as UserIcon,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

interface SubscriptionStatus {
    plan?: string;
    status: string;
    subscriptionEndsAt?: string;
    isPremium: boolean;
    daysLeft: number;
}

interface Plan {
    _id: string;
    name: string;
    description: string;
    price: number;
    currency: string;
    interval: string;
}

const DURATION_OPTIONS = [
    { months: 1, label: "1 Month", discount: 0, tag: "Standard" },
    { months: 3, label: "3 Months", discount: 0.05, tag: "5% OFF" },
    { months: 6, label: "6 Months", discount: 0.10, tag: "10% OFF" },
    { months: 12, label: "12 Months (1 Year)", discount: 0.20, tag: "20% OFF • Best Value" },
];

function SubscriptionContent() {
    const { user, organization, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [subStatus, setSubStatus] = useState<SubscriptionStatus | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [selectedMonths, setSelectedMonths] = useState<number>(12);
    
    const [loadingStatus, setLoadingStatus] = useState(true);
    const [initializingPayment, setInitializingPayment] = useState(false);
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

    const fetchPlans = useCallback(async () => {
        try {
            const plansRes = await api.get("/plans");
            if (plansRes.success && Array.isArray(plansRes.data)) {
                setPlans(plansRes.data);
                const premium = plansRes.data.find((p: Plan) => p.name === "premium") || plansRes.data[0];
                if (premium) {
                    setSelectedPlan(premium);
                }
            }
        } catch (err) {
            console.error("Failed to load plans:", err);
        }
    }, []);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/login");
            return;
        }

        if (user) {
            fetchSubscriptionData();
            fetchPlans();
        }
    }, [authLoading, user, router, fetchSubscriptionData, fetchPlans]);

    useEffect(() => {
        if (isPaymentComplete) {
            setPaymentSuccessMsg("Your payment was processed! Refreshing your subscription status...");
            const timer = setTimeout(() => {
                fetchSubscriptionData();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isPaymentComplete, fetchSubscriptionData]);

    const handlePaystackPayment = async () => {
        if (!selectedPlan) {
            setErrorMsg("Please select a subscription plan.");
            return;
        }

        setInitializingPayment(true);
        setErrorMsg(null);

        try {
            const callbackUrl = `${window.location.origin}/subscription?payment=complete`;
            const payload = {
                planId: selectedPlan._id,
                months: selectedMonths,
                callbackUrl,
            };

            const res = await api.post("/payments/initialize", payload);

            if (res.success && res.data?.authorization_url) {
                window.location.href = res.data.authorization_url;
            } else {
                setErrorMsg(res.message || "Could not initialize Paystack payment.");
                setInitializingPayment(false);
            }
        } catch (err: any) {
            console.error("Payment initialization error:", err);
            setErrorMsg(err.message || "Error starting payment process. Please try again.");
            setInitializingPayment(false);
        }
    };

    if (authLoading || (user && loadingStatus && !subStatus)) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-stone-400">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                    <p className="text-sm font-medium">Loading subscription details...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;

    const basePrice = selectedPlan ? selectedPlan.price : 50;
    const selectedOption = DURATION_OPTIONS.find((o) => o.months === selectedMonths) || DURATION_OPTIONS[0];
    const discountFraction = selectedOption.discount;
    const rawTotal = basePrice * selectedMonths;
    const finalTotal = Number((rawTotal * (1 - discountFraction)).toFixed(2));
    const totalSavings = Number((rawTotal - finalTotal).toFixed(2));

    const statusBadge = () => {
        if (!subStatus) return null;
        switch (subStatus.status) {
            case "ACTIVE":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                        <CheckCircle2 size={14} /> Active Subscription
                    </span>
                );
            case "TRIALING":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        <Clock size={14} /> Free Trial ({subStatus.daysLeft} days remaining)
                    </span>
                );
            case "EXPIRED":
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 uppercase tracking-wider">
                        <AlertTriangle size={14} /> Trial / Subscription Expired
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-stone-800 text-stone-300 border border-stone-700 uppercase tracking-wider">
                        No Active Subscription
                    </span>
                );
        }
    };

    return (
        <main className="min-h-screen pt-28 pb-20">
            <SectionWrapper>
                <div className="container mx-auto max-w-5xl px-6">
                    {/* Header Info */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-white/10">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <Building2 className="w-5 h-5 text-stone-400" />
                                <h1
                                    className="text-2xl md:text-3xl font-bold uppercase tracking-tight"
                                    style={{ fontFamily: "var(--font-varela-round)" }}
                                >
                                    {organization?.name || "Your Tailor Shop"}
                                </h1>
                            </div>
                            <div className="flex items-center gap-4 text-xs text-stone-400">
                                <span className="flex items-center gap-1.5">
                                    <UserIcon size={14} /> {user.email}
                                </span>
                                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 uppercase tracking-wider font-bold">
                                    {user.role}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="self-start md:self-auto px-4 py-2 rounded-full border border-white/10 bg-stone-900/50 hover:bg-stone-800 text-stone-400 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors"
                        >
                            <LogOut size={14} /> Sign Out
                        </button>
                    </div>

                    {/* Alert Notices */}
                    {paymentSuccessMsg && (
                        <div className="mb-8 p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-sm flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                            <span>{paymentSuccessMsg}</span>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mb-8 p-4 rounded-2xl bg-red-950/60 border border-red-500/30 text-red-300 text-sm flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                            <span>{errorMsg}</span>
                        </div>
                    )}

                    {/* Current Subscription Card */}
                    <div className="mb-12 p-8 rounded-3xl bg-stone-950/90 border border-white/10 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <ShieldCheck size={180} />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <div className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-2">
                                    Current Subscription Status
                                </div>
                                <div className="flex items-center gap-3 mb-4">
                                    <h2
                                        className="text-2xl md:text-3xl font-bold uppercase"
                                        style={{ fontFamily: "var(--font-varela-round)" }}
                                    >
                                        {subStatus?.isPremium ? "SewDigital Premium" : "Standard Plan"}
                                    </h2>
                                    {statusBadge()}
                                </div>
                                <p className="text-stone-400 text-sm max-w-lg">
                                    {subStatus?.isPremium
                                        ? "Your business has full access to unlimited client profiles, order workflows, and analytics."
                                        : "Upgrade to SewDigital Premium to ensure uninterrupted access to all order and client management tools."}
                                </p>
                            </div>

                            <div className="md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8 flex flex-col justify-center">
                                <div className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">
                                    Days Remaining
                                </div>
                                <div className="text-4xl font-extrabold text-white">
                                    {subStatus?.daysLeft ?? 0}{" "}
                                    <span className="text-stone-500 text-lg font-normal">days</span>
                                </div>
                                {subStatus?.subscriptionEndsAt && (
                                    <div className="text-[11px] text-stone-500 mt-1">
                                        Ends: {new Date(subStatus.subscriptionEndsAt).toLocaleDateString()}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Subscribe / Upgrade Section */}
                    <div className="p-8 md:p-10 rounded-3xl bg-black border border-white/10">
                        <div className="mb-8">
                            <div className="flex items-center gap-2 text-xs font-bold text-[#FDDA0D] uppercase tracking-widest mb-2">
                                <Sparkles size={16} /> Instant Online Activation
                            </div>
                            <h2
                                className="text-2xl md:text-4xl font-bold uppercase tracking-tight mb-3"
                                style={{ fontFamily: "var(--font-varela-round)" }}
                            >
                                Manage / Renew <span className="text-stone-500">Subscription</span>
                            </h2>
                            <p className="text-stone-400 text-sm">
                                Pay securely with Paystack (Mobile Money, Cards, Bank Transfer) to instantly renew or extend your tailor shop subscription.
                            </p>
                        </div>

                        {/* Duration Selector */}
                        <div className="mb-10">
                            <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-4">
                                Select Duration & Billing Cycle
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {DURATION_OPTIONS.map((opt) => {
                                    const isSelected = selectedMonths === opt.months;
                                    const optTotal = Number((basePrice * opt.months * (1 - opt.discount)).toFixed(2));
                                    const perMonth = Number((optTotal / opt.months).toFixed(2));

                                    return (
                                        <button
                                            key={opt.months}
                                            type="button"
                                            onClick={() => setSelectedMonths(opt.months)}
                                            className={`relative p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                                                isSelected
                                                    ? "bg-white text-black border-white ring-2 ring-white/50 shadow-lg scale-[1.02]"
                                                    : "bg-stone-950 text-white border-white/10 hover:border-white/30 hover:bg-stone-900"
                                            }`}
                                        >
                                            {opt.tag && (
                                                <span
                                                    className={`inline-block self-start px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 ${
                                                        isSelected
                                                            ? "bg-black text-white"
                                                            : "bg-white/10 text-stone-300 border border-white/10"
                                                    }`}
                                                >
                                                    {opt.tag}
                                                </span>
                                            )}

                                            <div>
                                                <div
                                                    className="font-bold text-lg uppercase mb-1"
                                                    style={{ fontFamily: "var(--font-varela-round)" }}
                                                >
                                                    {opt.label}
                                                </div>
                                                <div className="text-2xl font-black mb-1">
                                                    ₵{optTotal}
                                                </div>
                                                <div
                                                    className={`text-xs ${
                                                        isSelected ? "text-stone-700" : "text-stone-500"
                                                    }`}
                                                >
                                                    ₵{perMonth}/mo
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-black text-white flex items-center justify-center">
                                                    <Check size={14} />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Order Summary & Paystack Action */}
                        <div className="p-6 rounded-2xl bg-stone-950 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1">
                                <div className="text-xs text-stone-500 font-bold uppercase tracking-wider">
                                    Summary Breakdown
                                </div>
                                <div className="text-sm text-stone-300 flex items-center gap-2">
                                    <span>Plan: SewDigital Premium ({selectedMonths} Month{selectedMonths > 1 ? "s" : ""})</span>
                                </div>
                                {totalSavings > 0 && (
                                    <div className="text-xs text-emerald-400 font-medium">
                                        You save ₵{totalSavings} with discount ({selectedOption.tag})!
                                    </div>
                                )}
                                <div className="text-2xl font-bold text-white pt-1">
                                    Total: ₵{finalTotal} <span className="text-xs text-stone-500 font-normal">GHS</span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={handlePaystackPayment}
                                disabled={initializingPayment}
                                className="px-8 py-5 rounded-full bg-white text-black font-bold tracking-widest uppercase text-xs hover:bg-[#FDDA0D] transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none shrink-0"
                                style={{ fontFamily: "var(--font-varela-round)" }}
                            >
                                {initializingPayment ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Redirecting to Paystack...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="w-4 h-4" />
                                        Pay ₵{finalTotal} with Paystack <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-stone-500 gap-4">
                            <div className="flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-stone-400" />
                                <span>Secured by Paystack. Supports MTN Mobile Money, Telecel, Card, & Bank.</span>
                            </div>
                            <div>Instant activation after payment completion.</div>
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
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-white" />
                </div>
            }
        >
            <SubscriptionContent />
        </Suspense>
    );
}
