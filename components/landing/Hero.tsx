"use client";

import { ArrowRight } from "lucide-react";

export function Hero() {
    const scrollToWaitlist = () => {
        document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-10" />
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598501479155-006c6270e501?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center animate-slow-zoom" />
            </div>

            {/* Content */}
            <div className="relative z-20 container mx-auto px-6 text-center">
                <div className="inline-block px-4 py-1 mb-8 border border-white/20 rounded-full bg-white/5 backdrop-blur-sm">
                    <span
                        className="text-white text-xs font-bold tracking-cinematic uppercase"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        Coming Soon
                    </span>
                </div>

                <h1
                    className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 max-w-5xl mx-auto leading-[0.9] text-balance uppercase"
                    style={{ fontFamily: 'var(--font-termina)' }}
                >
                    SEWING THE <span className="text-white">NEW WAY</span>
                </h1>

                <p className="text-stone-500 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
                    The ultimate digital companion for modern tailors. Manage orders, clients, and measurements with cinematic elegance.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                        onClick={scrollToWaitlist}
                        className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            Join the Waitlist <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button className="px-8 py-4 border border-white/10 hover:bg-white/5 backdrop-blur-md text-white font-bold rounded-full transition-all">
                        See how it works
                    </button>
                </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-20" />
        </section>
    );
}
