"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const stories = [
    {
        name: "Lydia Kwakye",
        role: "Creative Director, LK Atelier",
        quote: "SewDigital transformed how we handle wedding season. No more lost measurement cards or forgotten deadlines. It's the digital backbone of my workshop.",
        image: "https://i.pravatar.cc/300?u=lydia"
    },
    {
        name: "James Mensah",
        role: "Master Tailor",
        quote: "The analytics revealed that my bespoke suits were my most profitable line, which I never realized. Now I focus my marketing there and revenue is up 40%.",
        image: "https://i.pravatar.cc/300?u=james"
    },
    {
        name: "The Gents Club",
        role: "Premium Suitery",
        quote: "Clients love receiving the automated SMS updates when their fit is ready. It adds a level of professionalism that sets us apart in a crowded market.",
        image: "https://i.pravatar.cc/300?u=gents"
    }
];

const FEATURED_STORY_IMAGE = "https://i.pravatar.cc/600?u=ellen";

const WorkshopVisual = ({ className = "", variant = "default" }: { className?: string, variant?: "default" | "detail" }) => (
    <div className={`relative w-full h-full bg-stone-950 overflow-hidden ${className}`}>
        {/* Abstract Digital Thread Background */}
        <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="white" stopOpacity="0" />
                        <stop offset="50%" stopColor="white" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="white" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {[...Array(6)].map((_, i) => (
                    <path
                        key={i}
                        d={`M ${-20 + i * 20} 0 L ${20 + i * 20} 100`}
                        stroke="url(#line-grad)"
                        strokeWidth="0.1"
                        className="animate-pulse"
                        style={{ animationDelay: `${i * 0.5}s`, animationDuration: '4s' }}
                    />
                ))}
            </svg>
        </div>

        {/* Central Craft Element */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="relative w-full max-w-sm aspect-[4/3]">
                {/* Fabric Slab */}
                <div className="absolute inset-0 bg-stone-900/50 border border-white/10 rounded-xl overflow-hidden backdrop-blur-sm">
                    {/* Texture Overlay */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>

                {/* Measuring Lines */}
                <div className="absolute top-1/4 left-0 w-full h-full">
                    <div className="absolute top-0 left-4 right-4 h-[1px] bg-white/20" />
                    <div className="absolute top-8 left-12 right-12 h-[1px] bg-white/10" />
                    <div className="absolute top-16 left-8 right-8 h-[1px] bg-white/10" />
                </div>

                {/* Digital Focus Point */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/10 animate-ping" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                        </div>
                    </div>
                </div>

                {/* Data Points */}
                {variant === "detail" && (
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                        <div className="space-y-1">
                            <div className="w-8 h-1 bg-white/20 rounded-full" />
                            <div className="w-12 h-1 bg-white/10 rounded-full" />
                        </div>
                        <div className="space-y-1 items-end flex flex-col">
                            <div className="w-10 h-1 bg-white/20 rounded-full" />
                            <div className="w-6 h-1 bg-white/10 rounded-full" />
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </div>
);

export default function StoriesPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 overflow-x-hidden">
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="max-w-4xl">
                        <h1
                            className="text-4xl md:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Success <span className="opacity-40">By Design.</span>
                        </h1>
                        <p className="text-xl text-stone-500 max-w-2xl font-medium">
                            Meet the visionary tailors and designers who are scaling their businesses with SewDigital.
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Featured Story */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="relative group overflow-hidden sm:rounded-[40px] sm:aspect-[16/9] h-[350px] md:h-auto md:aspect-[21/9] border border-white/10">
                        {/* <WorkshopVisual /> */}
                        <div className="absolute inset-0 grayscale opacity-40 mix-blend-overlay">
                            <Image
                                src={FEATURED_STORY_IMAGE}
                                alt="Ellen Osei"
                                fill
                                className="object-cover  transition-transform duration-1000 group-hover:scale-105"
                                priority
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="white" className="text-white" />)}
                            </div>
                            <h2
                                className="text-2xl md:text-5xl font-bold tracking-tighter uppercase mb-6 leading-none"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                &quot;THE MOST IMPORTANT TOOL IN MY WORKSHOP AFTER MY SEWING MACHINE.&quot;
                            </h2>
                            <p className="text-white font-bold tracking-cinematic uppercase text-sm">- ELLEN OSEI, THE VOGUE HOUSE</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Stories Grid */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
                        {stories.map((story, idx) => (
                            <div key={idx} className="group">
                                <div className="relative mb-8 overflow-hidden rounded-2xl aspect-square border border-white/5 bg-stone-950 transition-all group-hover:border-white/20">
                                    <WorkshopVisual variant="detail" />
                                    <div className="absolute inset-0 grayscale transition-all group-hover:grayscale-0">
                                        <Image
                                            src={story.image}
                                            alt={story.name}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                </div>
                                <h3
                                    className="text-xl font-bold uppercase mb-2"
                                    style={{ fontFamily: 'var(--font-varela-round)' }}
                                >
                                    {story.name}
                                </h3>
                                <p className="text-white/40 text-xs font-bold tracking-cinematic uppercase mb-6">{story.role}</p>
                                <p className="text-stone-500 font-medium leading-relaxed italic">
                                    &quot;{story.quote}&quot;
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Final CTA */}
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 py-24 text-center border-t border-white/5">
                    <h2
                        className="text-3xl md:text-6xl font-bold tracking-tighter uppercase mb-12"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        WRITE YOUR <span className="opacity-40">OWN STORY.</span>
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
