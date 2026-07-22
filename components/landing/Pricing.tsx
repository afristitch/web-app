"use client";

import { Check } from "lucide-react";
import { handleStoreClick } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const plans = [
    {
        name: "Free Forever",
        duration: "Forever",
        price: "₵0",
        description: "Everything you need to get started.",
        features: ["Unlimited Clients", "Order Management", "Client Grouping", "Invoices", "Basic Reporting"],
        isPopular: false
    },
    {
        name: "Monthly Pro",
        duration: "1 Month",
        price: "₵50",
        description: "Advanced features for growing shops.",
        features: ["Everything in Free", "Bulk SMS", "Style Portfolio", "Team Management", "Priority Support"],
        isPopular: false,
        isPro: true
    },
    {
        name: "Yearly Pro",
        duration: "12 Months",
        price: "₵450",
        description: "Save 20% with the annual plan.",
        features: ["Everything in Free", "Bulk SMS", "Style Portfolio", "Team Management", "Priority Support"],
        isPopular: true,
        tag: "Best Value",
        isPro: true
    }
];

export function Pricing() {
    const { user } = useAuth();
    const router = useRouter();

    const handlePlanClick = (plan: typeof plans[0], e: React.MouseEvent) => {
        if (plan.isPro) {
            e.preventDefault();
            if (user) {
                router.push("/subscription");
            } else {
                router.push("/login");
            }
        } else {
            handleStoreClick(e as any);
        }
    };

    return (
        <section className="py-28 md:py-48 px-6 bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2
                        className="text-xs font-bold tracking-cinematic uppercase text-white/40 mb-4"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Simple Pricing
                    </h2>
                    <h3
                        className="text-3xl md:text-6xl font-bold tracking-tighter leading-none mb-6 uppercase"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        CHOOSE THE <span className="text-stone-500">PERFECT PLAN.</span>
                    </h3>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        We've made the core features completely free. Upgrade when your shop needs it. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-3xl border ${plan.isPopular ? 'border-white bg-white/[0.02]' : 'border-white/5 bg-black'
                                } flex flex-col items-center text-center transition-all hover:scale-[1.02]`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full tracking-wider uppercase">
                                    {plan.tag}
                                </div>
                            )}

                            <div className="mb-8 flex flex-col items-center">
                                <h4
                                    className="text-stone-500 font-bold uppercase tracking-widest text-sm mb-2"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {plan.name}
                                </h4>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span
                                        className="text-4xl font-bold"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span
                                        className="text-stone-500 font-medium"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        / {plan.duration}
                                    </span>
                                </div>
                                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto">
                                    <span className="text-[10px] font-bold text-white/60 tracking-wider uppercase">
                                        {plan.name === "Free Forever" ? "No Credit Card Needed" : "Upgrade Anytime"}
                                    </span>
                                </div>
                                <p className="mt-4 text-stone-500 text-sm font-medium">{plan.description}</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow w-full">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <Check className="text-white" size={12} />
                                        </div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={(e) => handlePlanClick(plan, e)}
                                className={`w-full py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all hover:scale-[1.02] active:scale-95 ${plan.isPopular
                                    ? 'bg-white text-black hover:bg-[#FDDA0D]'
                                    : 'bg-white/5 text-white hover:bg-[#FDDA0D] hover:text-black'
                                    }`}
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                {plan.isPro ? (user ? "Manage Subscription" : "Subscribe with Paystack") : "Download for Free"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p className="text-stone-600 text-[10px] font-medium tracking-wider uppercase">
                        * Bulk SMS, Team Management, and Style Gallery are Pro features.
                    </p>
                </div>
            </div>
        </section>
    );
}
