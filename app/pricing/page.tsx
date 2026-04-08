"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { Pricing as PricingSection } from "@/components/landing/Pricing";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            {/* Extended Pricing Hero */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-24 text-center flex flex-col items-center">
                    <div className="max-w-4xl">
                        <h1
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Plans for every <span className="opacity-40">scale.</span>
                        </h1>
                        <p className="text-xl text-stone-500 max-w-2xl font-medium mx-auto">
                            Whether you&apos;re a solo artisan or a high-volume workshop, find the perfect digital partner for your craft.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            <PricingSection />

            {/* Comparison Table / Features Detail */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 py-24 border-t border-white/5">
                    <h2
                        className="text-3xl font-bold tracking-tighter uppercase mb-12"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Everything included
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div>
                            <h3 className="text-lg font-bold mb-4 uppercase text-white/40" style={{ fontFamily: 'var(--font-varela-round)' }}>Workflow</h3>
                            <ul className="space-y-4">
                                {["Order Intake", "Measurement Vault", "Progress Tracking", "Deadline Reminders"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-stone-500 font-medium">
                                        <Check size={16} className="text-white" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 uppercase text-white/40" style={{ fontFamily: 'var(--font-varela-round)' }}>Management</h3>
                            <ul className="space-y-4">
                                {["Client History", "Financial Insights", "Inventory Logs", "Staff Permissions"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-stone-500 font-medium">
                                        <Check size={16} className="text-white" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-4 uppercase text-white/40" style={{ fontFamily: 'var(--font-varela-round)' }}>Growth</h3>
                            <ul className="space-y-4">
                                {["Business Reports", "SMS Notifications", "Customer Portal", "API Access"].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-stone-500 font-medium">
                                        <Check size={16} className="text-white" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* FAQ / Final CTA */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 py-24 text-center">
                    <div className="p-16 rounded-[40px] bg-white text-black">
                        <h2
                            className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-8"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Still have questions?
                        </h2>
                        <p className="text-lg font-medium mb-12 max-w-xl mx-auto opacity-70">
                            Our team is ready to help you find the best fit for your business needs.
                        </p>
                        <Link
                            href="/support"
                            className="inline-flex items-center gap-2 px-5 py-3 sm:px-10 sm:py-5 bg-black text-white rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Get in touch <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
