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
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
    },
    {
        name: "James Mensah",
        role: "Master Tailor",
        quote: "The analytics revealed that my bespoke suits were my most profitable line, which I never realized. Now I focus my marketing there and revenue is up 40%.",
        image: "https://images.unsplash.com/photo-1558227108-83a15ddbbb15?w=800&q=80"
    },
    {
        name: "The Gents Club",
        role: "Premium Suitery",
        quote: "Clients love receiving the automated SMS updates when their fit is ready. It adds a level of professionalism that sets us apart in a crowded market.",
        image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=800&q=80"
    }
];

export default function StoriesPage() {
    return (
        <main className="min-vh-100 pt-32 pb-20 overflow-hidden">
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 mb-32">
                    <div className="max-w-4xl">
                        <h1
                            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] uppercase mb-8"
                            style={{ fontFamily: 'var(--font-termina)' }}
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
                    <div className="relative group overflow-hidden rounded-[40px] aspect-[16/9] md:aspect-[21/9]">
                        <Image
                            src="https://images.unsplash.com/photo-1598501479155-00c0a93bd855?w=1600&q=80"
                            alt="Workshop"
                            fill
                            className="absolute inset-0 object-cover grayscale opacity-50 transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-8 md:p-16 max-w-3xl">
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="white" className="text-white" />)}
                            </div>
                            <h2
                                className="text-3xl md:text-5xl font-bold tracking-tighter uppercase mb-6 leading-none"
                                style={{ fontFamily: 'var(--font-termina)' }}
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
                                <div className="mb-8 overflow-hidden rounded-2xl aspect-square grayscale transition-all group-hover:grayscale-0 border border-white/5">
                                    <Image
                                        src={story.image}
                                        alt={story.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <h3
                                    className="text-xl font-bold uppercase mb-2"
                                    style={{ fontFamily: 'var(--font-termina)' }}
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
                        className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-12"
                        style={{ fontFamily: 'var(--font-termina)' }}
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
