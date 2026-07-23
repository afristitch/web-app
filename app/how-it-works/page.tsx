"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        title: "Order Intake",
        description: "Capture client details, design preferences, and special instructions in seconds. No more messy paper trails.",
        features: ["Voice-to-text notes", "Style reference uploads", "Automatic deadline calculation"]
    },
    {
        title: "Digital Measurements",
        description: "Store precision measurements for every client in a searchable, secure vault that updates with every fit.",
        features: ["Standardized templates", "Fit history tracking", "Instant retrieval during cutting"]
    },
    {
        title: "Production Pipeline",
        description: "Track the journey from cutting board to finishing station. Know exactly where every garment stands.",
        features: ["Status updates", "Production bottlenecks alerts", "Team task assignment"]
    },
    {
        title: "Automated Finishing",
        description: "Keep clients in the loop without lifting a finger. Automated notifications for fittings and pickups.",
        features: ["SMS/WhatsApp updates", "Pickup scheduling", "Payment confirmation"]
    }
];

export default function HowItWorksPage() {
    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20">
            {/* Hero Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-24 text-center flex flex-col items-center">
                    <div className="max-w-4xl">
                        <h1
                            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8 text-white"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            The Art of <span className="opacity-40">Precision.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-stone-300 max-w-2xl font-medium mx-auto">
                            Experience the seamless fusion of traditional craftsmanship and modern digital efficiency.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Steps Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className="relative p-8 sm:p-10 rounded-3xl border border-white/10 bg-stone-950/80 flex flex-col items-center text-center shadow-xl"
                            >
                                <span className="text-xs font-extrabold tracking-cinematic text-stone-500 uppercase mb-3">
                                    STEP 0{idx + 1}
                                </span>
                                <h3
                                    className="text-2xl sm:text-3xl font-bold uppercase mb-4 text-white"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-sm sm:text-base text-stone-300 font-medium mb-8 leading-relaxed max-w-md mx-auto">
                                    {step.description}
                                </p>
                                <ul className="space-y-3.5 w-full flex flex-col items-center border-t border-white/10 pt-6">
                                    {step.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center justify-center gap-3 text-xs sm:text-sm font-bold uppercase tracking-tight text-white">
                                            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                                                <Check size={12} className="text-white" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 py-20 text-center border-t border-white/10">
                    <div className="p-12 sm:p-16 rounded-[40px] bg-stone-950 border border-white/10 text-white">
                        <h2
                            className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tighter uppercase mb-6 text-balance leading-none"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            READY TO REVOLUTIONIZE <span className="opacity-40">YOUR WORKSHOP?</span>
                        </h2>
                        <p className="text-stone-300 text-base max-w-xl mx-auto font-medium mb-10">
                            Create your tailor shop account today and elevate your client experience.
                        </p>
                        <Link
                            href="/signup"
                            className="inline-flex items-center gap-2.5 px-10 py-5 bg-white text-black rounded-full font-extrabold text-base sm:text-lg hover:bg-stone-200 hover:scale-105 transition-all shadow-2xl"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Get Started Free <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
