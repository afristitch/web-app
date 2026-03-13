"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { VideoPlayer } from "./VideoPlayer";

export function Hero() {
    const openWaitlist = () => {
        window.open("https://forms.cloud.microsoft/pages/responsepage.aspx?id=TY8KsmoNLk-Dohgclo-Iglc37NZ_n5FBjVuVuC_TfvBUNjhHS1AxN1c4Wkk4T05GWFJCUk1EWkxTWi4u&route=shorturl", "_blank");
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 bg-black overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

                {/* Digital Thread Background Effect */}
                <div className="absolute inset-0 opacity-40">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {[...Array(15)].map((_, i) => (
                            <path
                                key={i}
                                d={`M ${-50 + i * 12} 0 C ${i * 8} 40, ${100 - i * 8} 60, ${150 - i * 12} 100`}
                                stroke="white"
                                strokeWidth="0.03"
                                fill="none"
                                className="opacity-10 animate-pulse"
                                style={{
                                    animationDelay: `${i * 0.15}s`,
                                    animationDuration: `${4 + i % 4}s`
                                }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Animated Light Orbs - Refined for Modern Black */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className="inline-block px-4 py-1 mb-8 border border-white/10 rounded-full bg-white/[0.03] backdrop-blur-md">
                    <span
                        className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        Launching Soon
                    </span>
                </div>

                <h1
                    className="text-4xl md:text-8xl font-bold tracking-tighter mb-8 max-w-6xl mx-auto leading-[0.85] text-balance uppercase"
                    style={{ fontFamily: 'var(--font-termina)' }}
                >
                    SEWING THE <br className="hidden md:block" /><span className="text-white">NEW WAY</span>
                </h1>

                <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium tracking-tight">
                    Next-generation management for the modern workshop. <br className="hidden md:block" />
                    Built for the hands that create.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
                    <button
                        onClick={openWaitlist}
                        className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Join the Waitlist <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <Link href="/how-it-works" className="px-10 py-5 border border-white/5 hover:bg-white/5 hover:border-white/20 backdrop-blur-md text-white/50 hover:text-white font-bold rounded-full transition-all cursor-pointer">
                        Experience the Platform
                    </Link>
                </div>

                {/* Video Player Integration */}
                <div className="max-w-4xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
                    <VideoPlayer
                        youtubeId="dQw4w9WgXcQ" // Placeholder, user will provide real ID or I'll use a generic one
                        thumbnailUrl="/tour.png" // Reusing existing tour image as hero picture
                        title="The Product Vision"
                        subtitle="A look inside"
                    />
                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">Scroll</span>
                <ChevronDown size={20} className="text-white/40" />
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
