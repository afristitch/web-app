"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { Play, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <main className="min-h-screen bg-black pt-32 pb-20">
            {/* Hero Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-24 text-center flex flex-col items-center">
                    <div className="max-w-4xl">
                        <h1
                            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            The Art of <span className="opacity-40">Precision.</span>
                        </h1>
                        <p className="text-xl text-stone-500 max-w-2xl font-medium mx-auto">
                            Experience the seamless fusion of traditional craftsmanship and modern digital efficiency.
                        </p>
                    </div>
                </div>
            </SectionWrapper>


            {/* Steps Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative pt-12 border-t border-white/10 flex flex-col items-center text-center">
                                <span className="absolute top-4 left-1/2 -translate-x-1/2 text-xs font-bold tracking-cinematic text-stone-500 uppercase">0{idx + 1}</span>
                                <h3
                                    className="text-2xl sm:text-3xl font-bold uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-lg text-stone-500 font-medium mb-8 leading-relaxed max-w-md mx-auto">
                                    {step.description}
                                </p>
                                <ul className="space-y-4 w-full flex flex-col items-center">
                                    {step.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center justify-center gap-3 text-sm font-bold uppercase tracking-tight text-white/70">
                                            <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center shrink-0">
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
                <div className="container mx-auto max-w-7xl px-6 py-24 text-center border-t border-white/5">
                    <h2
                        className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-12 text-balance leading-none"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        READY TO REVOLUTIONIZE <span className="opacity-40">YOUR WORKSHOP?</span>
                    </h2>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Download Now <ArrowRight size={20} />
                    </a>
                </div>
            </SectionWrapper>
        </main>
    );
}
