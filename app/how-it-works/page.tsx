"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { Play, Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayer } from "@/components/landing/VideoPlayer";

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
                <div className="container mx-auto max-w-7xl px-6 mb-24">
                    <div className="max-w-4xl">
                        <h1
                            className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
                            style={{ fontFamily: 'var(--font-termina)' }}
                        >
                            The Art of <span className="opacity-40">Precision.</span>
                        </h1>
                        <p className="text-xl text-stone-500 max-w-2xl font-medium">
                            Experience the seamless fusion of traditional craftsmanship and modern digital efficiency.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Video Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <VideoPlayer
                        youtubeId="dQw4w9WgXcQ"
                        thumbnailUrl="/tour.png"
                        title="SewDigital in Action."
                        subtitle="Product Tour"
                    />
                </div>
            </SectionWrapper>

            {/* Steps Section */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative pt-12 border-t border-white/10">
                                <span className="absolute top-4 left-0 text-xs font-bold tracking-cinematic text-stone-500 uppercase">0{idx + 1}</span>
                                <h3
                                    className="text-2xl sm:text-3xl font-bold uppercase mb-6"
                                    style={{ fontFamily: 'var(--font-termina)' }}
                                >
                                    {step.title}
                                </h3>
                                <p className="text-lg text-stone-500 font-medium mb-8 leading-relaxed">
                                    {step.description}
                                </p>
                                <ul className="space-y-4">
                                    {step.features.map((feature, fIdx) => (
                                        <li key={fIdx} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight text-white/70">
                                            <div className="w-5 h-5 rounded-md bg-white/5 flex items-center justify-center">
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
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        READY TO REVOLUTIONIZE <span className="opacity-40">YOUR WORKSHOP?</span>
                    </h2>
                    <Link
                        href="/#waitlist"
                        className="inline-flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                    >
                        Join the Waitlist <ArrowRight size={20} />
                    </Link>
                </div>
            </SectionWrapper>
        </main>
    );
}
