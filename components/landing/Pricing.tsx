"use client";

import { Check } from "lucide-react";

const plans = [
    {
        name: "Monthly",
        duration: "1 Month",
        price: "$3.99",
        description: "Essential features for your shop.",
        features: ["Unlimited Clients", "Order Management", "Advanced Reports", "Cloud Backup", "SMS Notifications", "Priority Support"],
        isPopular: false
    },
    {
        name: "6 Months",
        duration: "6 Months",
        price: "$19.99",
        description: "Save 16% with the 6-month plan.",
        features: ["Unlimited Clients", "Order Management", "Advanced Reports", "Cloud Backup", "SMS Notifications", "Priority Support"],
        isPopular: false
    },
    {
        name: "Yearly",
        duration: "12 Months",
        price: "$35.99",
        description: "Save 25% with the annual plan.",
        features: ["Unlimited Clients", "Order Management", "Advanced Reports", "Cloud Backup", "SMS Notifications", "Priority Support"],
        isPopular: true,
        tag: "Best Value"
    }
];

export function Pricing() {
    return (
        <section className="py-28 md:py-48 px-6 bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-20">
                    <h2
                        className="text-xs font-bold tracking-cinematic uppercase text-white/40 mb-4"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        Simple Pricing
                    </h2>
                    <h3
                        className="text-3xl md:text-6xl font-bold tracking-tighter leading-none mb-6 uppercase"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        CHOOSE THE <span className="text-stone-500">PERFECT PLAN.</span>
                    </h3>
                    <p className="text-stone-500 text-lg max-w-2xl mx-auto">
                        Transparent pricing designed to scale with your tailoring business. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-3xl border ${plan.isPopular ? 'border-white bg-white/[0.02]' : 'border-white/5 bg-black'
                                } flex flex-col transition-all hover:scale-[1.02]`}
                        >
                            {plan.isPopular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-xs font-bold rounded-full tracking-wider uppercase">
                                    {plan.tag}
                                </div>
                            )}

                            <div className="mb-8">
                                <h4
                                    className="text-stone-500 font-bold uppercase tracking-widest text-sm mb-2"
                                    style={{ fontFamily: 'var(--font-termina)' }}
                                >
                                    {plan.name}
                                </h4>
                                <div className="flex items-baseline gap-2">
                                    <span
                                        className="text-4xl font-bold"
                                        style={{ fontFamily: 'var(--font-termina)' }}
                                    >
                                        {plan.price}
                                    </span>
                                    <span
                                        className="text-stone-500 font-medium"
                                        style={{ fontFamily: 'var(--font-termina)' }}
                                    >
                                        / {plan.duration}
                                    </span>
                                </div>
                                <p className="mt-4 text-stone-500 text-sm font-medium">{plan.description}</p>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                                            <Check className="text-white" size={12} />
                                        </div>
                                        <span className="text-sm font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <a
                                href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=TY8KsmoNLk-Dohgclo-Iglc37NZ_n5FBjVuVuC_TfvBUNjhHS1AxN1c4Wkk4T05GWFJCUk1EWkxTWi4u&route=shorturl"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`w-full py-4 rounded-full font-bold transition-all text-center ${plan.isPopular
                                    ? 'bg-white text-black hover:bg-white/90'
                                    : 'bg-white/5 text-white hover:bg-white/10'
                                    }`}
                            >
                                Coming Soon
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
