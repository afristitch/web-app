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
        <section className="py-28 md:py-40 px-6 bg-black text-white border-t border-white/10">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2
                        className="text-xs font-bold tracking-cinematic uppercase text-stone-400 mb-4"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Simple Pricing
                    </h2>
                    <h3
                        className="text-3xl md:text-6xl font-bold tracking-tighter leading-none mb-6 uppercase text-white"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        CHOOSE THE <span className="opacity-40">PERFECT PLAN.</span>
                    </h3>
                    <p 
                        className="text-stone-300 text-lg max-w-2xl mx-auto font-medium"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        We've made the core features completely free. Upgrade when your shop needs it. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative py-12 px-8 rounded-3xl transition-all duration-300 bg-black ${plan.isPopular ? 'border-2 border-white shadow-2xl ring-1 ring-white/40 hover:scale-[1.02]' : 'border border-white/25 hover:border-white/50'
                                } flex flex-col items-center text-center`}
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            {plan.isPopular && (
                                <div 
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full tracking-wider uppercase shadow-lg"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {plan.tag}
                                </div>
                            )}

                            <div className="mb-8 flex flex-col items-center">
                                <h4
                                    className="text-stone-300 font-bold uppercase tracking-widest text-sm mb-2"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {plan.name}
                                </h4>
                                <div className="flex items-baseline justify-center gap-2">
                                    <span
                                        className="text-4xl font-extrabold text-white"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span
                                        className="text-stone-400 font-medium"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        / {plan.duration}
                                    </span>
                                </div>
                                <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 mx-auto">
                                    <span 
                                        className="text-[10px] font-bold text-stone-300 tracking-wider uppercase"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {plan.name === "Free Forever" ? "No Credit Card Needed" : "Upgrade Anytime"}
                                    </span>
                                </div>
                                <p 
                                    className="mt-4 text-stone-300 text-sm font-medium"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {plan.description}
                                </p>
                            </div>

                            <div className="space-y-4 flex-grow w-full border-t border-white/10 pt-6">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center justify-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                            <Check className="text-white" size={12} />
                                        </div>
                                        <span 
                                            className="text-sm font-medium text-stone-200"
                                            style={{ fontFamily: 'var(--font-varela-round)' }}
                                        >
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <p 
                        className="text-stone-400 text-[11px] font-medium tracking-wider uppercase"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        * Bulk SMS, Team Management, and Style Gallery are Pro features.
                    </p>
                </div>
            </div>
        </section>
    );
}
