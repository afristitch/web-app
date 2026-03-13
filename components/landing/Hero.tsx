"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

export function Hero() {
    const testingFormUrl = "https://forms.cloud.microsoft/pages/responsepage.aspx?id=TY8KsmoNLk-Dohgclo-Iglc37NZ_n5FBjVuVuC_TfvBUNjhHS1AxN1c4Wkk4T05GWFJCUk1EWkxTWi4u&route=shorturl";

    const openWaitlist = () => {
        window.open(testingFormUrl, "_blank");
    };

    return (
        <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
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
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-7 text-left order-2 lg:order-1 animate-in fade-in slide-in-from-left-8 duration-1000">
                        <div className="inline-block px-4 py-1 mb-8 border border-white/10 rounded-full bg-white/[0.03] backdrop-blur-md">
                            <span
                                className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase"
                                style={{ fontFamily: 'var(--font-termina)' }}
                            >
                                Launching Soon
                            </span>
                        </div>

                        <h1
                            className="text-4xl md:text-6xl lg:text-[80px] font-bold tracking-tighter mb-8 leading-[0.8] text-balance uppercase"
                            style={{ fontFamily: 'var(--font-termina)' }}
                        >
                            SEWING <br />
                            <span className="text-white/40">THE</span> <br />
                            <span className="text-white">NEW WAY</span>
                        </h1>

                        <p className="text-stone-500 text-lg md:text-xl max-w-xl mb-12 font-medium tracking-tight leading-relaxed">
                            Next-generation management for the modern workshop.
                            Built for the hands that create, refined for the minds that lead.
                        </p>

                        <div className="flex flex-col sm:flex-row items-start justify-start gap-6">
                            <button
                                onClick={openWaitlist}
                                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_40px_rgba(255,255,255,0.1)] cursor-pointer"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Join the Waitlist <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: QR Code Visual */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
                        <div className="relative group p-1 w-full max-w-md aspect-[4/5] rounded-[48px] overflow-hidden">
                            {/* Card Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[48px] blur-sm transition-all group-hover:from-white/20" />

                            <div className="relative h-full w-full bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[46px] p-8 md:p-12 flex flex-col items-center justify-between text-center">
                                {/* Top Badge */}
                                <div className="w-full flex justify-between items-center mb-12">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">System Active</span>
                                    </div>
                                    <span className="text-[8px] font-bold tracking-[0.2em] uppercase text-white/40">ID: SD-2026</span>
                                </div>

                                {/* QR Code Container */}
                                <div className="relative mb-12">
                                    {/* Tech Borders */}
                                    <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/20 rounded-tl-lg group-hover:border-white/40 transition-colors" />
                                    <div className="absolute -top-4 -right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 rounded-tr-lg group-hover:border-white/40 transition-colors" />
                                    <div className="absolute -bottom-4 -left-4 w-8 h-8 border-b-2 border-l-2 border-white/20 rounded-bl-lg group-hover:border-white/40 transition-colors" />
                                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/20 rounded-br-lg group-hover:border-white/40 transition-colors" />

                                    <div className="p-6 bg-white rounded-3xl shadow-[0_0_80px_rgba(255,255,255,0.05)] shadow-inner transition-transform group-hover:scale-[1.02]">
                                        <QRCodeSVG
                                            value={testingFormUrl}
                                            size={200}
                                            level="H"
                                            includeMargin={false}
                                            imageSettings={{
                                                src: "/favicon.ico",
                                                x: undefined,
                                                y: undefined,
                                                height: 32,
                                                width: 32,
                                                excavate: true,
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Card Footer */}
                                <div className="space-y-4">
                                    <div className="space-y-4 w-full">
                                        <button
                                            onClick={openWaitlist}
                                            className="w-full py-4 bg-white text-black font-bold rounded-2xl text-[11px] tracking-[0.2em] uppercase hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer"
                                            style={{ fontFamily: 'var(--font-termina)' }}
                                        >
                                            Join Beta Now
                                        </button>
                                        <p className="text-stone-500 text-xs font-medium tracking-tight">
                                            Scan to verify or tap button <br /> to join our early-access community
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 opacity-30">
                <ChevronDown size={20} className="text-white animate-bounce" />
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />
        </section>
    );
}
