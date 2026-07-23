"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { handleStoreClick } from "@/lib/store";

export function Hero() {
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    };

    return (
        <section className="relative min-h-[90vh] md:min-h-screen pt-32 md:pt-40 pb-4 md:pb-20 overflow-x-clip bg-black text-white">
            {/* Grid Radial Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
                 style={{ 
                     backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
                     backgroundSize: '32px 32px'
                 }} 
            />

            {/* Top Background Glow */}
            <div className="absolute top-0 left-0 right-0 h-[620px] md:h-[650px] lg:h-[750px] bg-black z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black/80" />
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] border border-white/[0.05] rounded-full pointer-events-none" />
            </div>

            {/* Main Content Container - Centered Column */}
            <div className="relative z-10 container mx-auto max-w-7xl px-6 flex flex-col items-center text-center">
                
                {/* Header Content */}
                <div className="max-w-4xl w-full flex flex-col items-center mb-6 md:mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-stone-800 bg-stone-950/80 backdrop-blur-md mb-8 shadow-xs"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-white animate-pulse" />
                        <span className="text-xs sm:text-sm font-semibold tracking-wide text-stone-300">
                            Built Specifically for Modern Tailors & Designers
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-white leading-[1.1] uppercase mb-4 md:mb-8 max-w-4xl"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Stop running your tailoring business from a <span className="opacity-40">chaotic notebook</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                        className="text-stone-300 text-sm md:text-xl max-w-2xl mb-6 md:mb-12 font-medium leading-relaxed"
                    >
                        SewDigital keeps your clients, measurements, and orders <br className="hidden md:block" />
                        synced across all devices in real-time.
                    </motion.p>

                    {/* App Store Buttons - Centered */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 w-full sm:w-auto"
                    >
                        <Link 
                            href="/signup"
                            className="flex items-center justify-center gap-2 bg-white text-black px-10 py-5 rounded-full hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 shadow-2xl font-extrabold text-base sm:text-lg tracking-wider"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Get Started Free
                        </Link>
                    </motion.div>
                </div>

                {/* Screenshots Showcase - Spaced Out Row */}
                <div className="w-full max-w-6xl relative h-[280px] md:h-[550px] lg:h-[650px] mt-10 md:mt-20 pointer-events-none">
                    
                    {/* Mockup 1 (Center) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[140px] md:w-[240px] lg:w-[280px]"
                    >
                        <Image src="/phoneloginmockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-3xl" />
                    </motion.div>

                    {/* Mockup 2 (Floating Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="absolute top-6 left-0 md:left-[2%] lg:left-[5%] z-10 w-[120px] md:w-[220px] lg:w-[260px]"
                    >
                        <Image src="/phonewelcomemockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>

                    {/* Mockup 3 (Floating Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute top-6 right-0 md:right-[2%] lg:right-[5%] z-10 w-[120px] md:w-[220px] lg:w-[260px]"
                    >
                        <Image src="/phonetemplatemockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
        </section>
    );
}
