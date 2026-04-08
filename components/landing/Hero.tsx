"use client";

import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export function Hero() {
    const fadeUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any }
    };

    const float = {
        animate: {
            y: [0, -12, 0],
            rotate: [-0.5, 0.5, -0.5]
        },
        transition: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    const mockupWidths = "w-[180px] md:w-[260px] lg:w-[320px]";

    return (
        <section className="relative min-h-screen pt-40 pb-20 overflow-hidden bg-white">
            {/* Top Background (Black Section) */}
            <div className="absolute top-0 left-0 right-0 h-[650px] lg:h-[750px] bg-black z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent shadow-[inset_0_-150px_250px_rgba(0,0,0,0.8)]" />
                
                {/* Subtle Decorative Elements */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] border border-white/[0.03] rounded-full pointer-events-none" />
            </div>

            {/* Main Content Container - Centered Column */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
                
                {/* Header Content */}
                <div className="max-w-4xl w-full flex flex-col items-center mb-16">
                    <motion.div 
                        {...fadeUp}
                        className="flex items-center gap-3 mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#FDDA0D] animate-pulse" />
                        <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-varela-round)' }}>Professional Operating System</span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-0.03em] text-white leading-[1.1] uppercase mb-8 max-w-3xl"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Sewing The <span className="text-[#FDDA0D]">New</span> <br />
                        Professional Way.
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.2 }}
                        className="text-white/30 text-base md:text-lg max-w-2xl mb-12 font-medium leading-relaxed"
                    >
                        The all-in-one platform for modern tailoring workshops. <br className="hidden md:block" />
                        Manage clients, measurements, and production with precision.
                    </motion.p>

                    {/* App Store Buttons - Centered */}
                    <motion.div 
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-6"
                    >
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-white text-black px-6 py-3 rounded-xl hover:bg-[#FDDA0D] transition-all hover:scale-105 shadow-2xl shadow-black/40 group"
                        >
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={120} height={36} className="h-8 w-auto" />
                        </a>
                        <div className="flex items-center gap-3 bg-white/5 border border-white/15 text-white/30 px-6 py-3 rounded-xl cursor-not-allowed opacity-40 grayscale flex-shrink-0">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={120} height={36} className="h-8 w-auto" />
                        </div>
                    </motion.div>
                </div>

                {/* Screenshots Showcase - Spaced Out Row */}
                <div className="w-full max-w-6xl relative h-[450px] md:h-[550px] lg:h-[650px] mt-10">
                    
                    {/* Mockup 1 (Center) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[180px] md:w-[240px] lg:w-[300px]"
                    >
                        <Image src="/phoneloginmockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-3xl" />
                    </motion.div>

                    {/* Mockup 2 (Floating Left - Static & Clear) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="absolute top-10 left-0 md:left-[2%] lg:left-[5%] z-10 w-[160px] md:w-[220px] lg:w-[280px]"
                    >
                        <Image src="/phonewelcomemockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>

                    {/* Mockup 3 (Floating Right - Static & Clear) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="absolute top-10 right-0 md:right-[2%] lg:right-[5%] z-10 w-[160px] md:w-[220px] lg:w-[280px]"
                    >
                        <Image src="/phonetemplatemockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-2xl" />
                        
                        
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
        </section>
    );
}
