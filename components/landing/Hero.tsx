"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-screen lg:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0 bg-black">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />

                {/* Digital Thread Background Effect */}
                <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        {[...Array(8)].map((_, i) => (
                            <path
                                key={i}
                                d={`M ${-50 + i * 25} 0 C ${i * 15} 40, ${100 - i * 15} 60, ${150 - i * 25} 100`}
                                stroke="white"
                                strokeWidth="0.05"
                                fill="none"
                                className="opacity-10 animate-pulse"
                                style={{
                                    animationDelay: `${i * 0.3}s`,
                                    animationDuration: `${5 + i % 3}s`,
                                    willChange: 'opacity'
                                }}
                            />
                        ))}
                    </svg>
                </div>

                {/* Animated Light Orbs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ willChange: 'opacity, transform' }} />
                <div className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[150px] animate-pulse pointer-events-none" style={{ animationDelay: '2s', willChange: 'opacity, transform' }} />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        {/* Badge & Trial Info */}
                        <div className="flex flex-col items-center lg:items-start gap-4 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="inline-block px-4 py-1 border border-white/10 rounded-full bg-white/10">
                                <span
                                    className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase"
                                    style={{ fontFamily: 'var(--font-termina)' }}
                                >
                                    Launching Soon
                                </span>
                            </div>
                            <span className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase" style={{ fontFamily: 'var(--font-termina)' }}>
                                21 Days Free Trial
                            </span>
                        </div>

                        {/* Headline */}
                        <h1
                            className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter mb-10 leading-[0.85] text-balance uppercase animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100"
                            style={{ fontFamily: 'var(--font-termina)' }}
                        >
                            SEWING <br />
                            <span className="text-white/40">THE</span> <br />
                            <span className="text-white">NEW WAY</span>
                        </h1>

                        {/* Subheadline */}
                        <p className="text-stone-500 text-lg md:text-xl max-w-xl mb-12 font-medium tracking-tight leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                            The modern workshop operating system. <br className="hidden md:block" />
                            Built for hands that create, refined for minds that lead.
                        </p>
                    </div>

                    {/* Right Column: Device Mockup */}
                    <div className="flex justify-center lg:justify-end animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                        <div className="relative group w-full max-w-[400px]">
                            {/* Mockup Glow */}
                            <div className="absolute inset-0 bg-white/[0.05] rounded-full blur-[120px] -z-10" />

                            {/* Reflection effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-[3rem]" />

                            <Image
                                src="/phonemockup.png"
                                alt="SewDigital Mobile App Mockup"
                                width={800}
                                height={1200}
                                className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-30">
                <ChevronDown size={20} className="text-white animate-bounce" />
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
