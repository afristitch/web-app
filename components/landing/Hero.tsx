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
        <section className="relative min-h-[90vh] md:min-h-screen pt-24 md:pt-32 pb-4 md:pb-20 overflow-hidden bg-white">
            {/* White Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.12] pointer-events-none" 
                 style={{ 
                     backgroundImage: `radial-gradient(#000 1.5px, transparent 1.5px), linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
                     backgroundSize: '40px 40px, 200px 200px, 200px 200px',
                     backgroundPosition: 'center center'
                 }} 
            />

            {/* Top Background (Black Section) */}
            <div className="absolute top-0 left-0 right-0 h-[620px] md:h-[650px] lg:h-[750px] bg-black z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-transparent shadow-[inset_0_-80px_120px_rgba(0,0,0,0.95)]" />
                
                {/* Subtle Decorative Elements */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] border border-white/[0.03] rounded-full pointer-events-none" />
            </div>

            {/* Main Content Container - Centered Column */}
            <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
                
                {/* Header Content */}
                <div className="max-w-4xl w-full flex flex-col items-center mb-6 md:mb-16">
                    <motion.div 
                        {...fadeUp}
                        className="flex items-center gap-3 mb-6 md:mb-8 px-4 py-2 bg-white/5 border border-white/10 rounded-full"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#FDDA0D] animate-pulse" />
                        <span className="text-white/60 text-[9px] font-bold uppercase tracking-[0.3em]" style={{ fontFamily: 'var(--font-varela-round)' }}>Professional Operating System</span>
                    </motion.div>

                    <motion.h1
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-[-0.03em] text-white leading-[1.1] uppercase mb-4 md:mb-8 max-w-3xl"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Sewing The <span className="text-[#FDDA0D]">New</span> <br />
                        Professional Way.
                    </motion.h1>

                    <motion.p
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.2 }}
                        className="text-white/30 text-xs md:text-lg max-w-2xl mb-6 md:mb-12 font-medium leading-relaxed"
                    >
                        The all-in-one platform for modern tailoring workshops. <br className="hidden md:block" />
                        Manage clients, measurements, and production with precision.
                    </motion.p>

                    {/* App Store Buttons - Centered */}
                    <motion.div 
                        {...fadeUp}
                        transition={{ ...fadeUp.transition, delay: 0.3 }}
                        className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 w-full sm:w-auto"
                    >
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-[200px] sm:w-auto flex items-center justify-center bg-white text-black px-4 py-1.5 rounded-xl hover:bg-[#FDDA0D] transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-black/40 group sm:min-w-[180px]"
                        >
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" width={140} height={42} className="h-10 w-auto" />
                        </a>
                        <div className="w-[200px] sm:w-auto flex items-center justify-center bg-white text-black px-4 py-1.5 rounded-xl cursor-not-allowed transition-all opacity-95 shadow-2xl shadow-black/40 sm:min-w-[180px] group">
                            <Image src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" width={140} height={42} className="h-10 w-auto" />
                        </div>
                    </motion.div>
                </div>

                {/* Screenshots Showcase - Spaced Out Row */}
                <div className="w-full max-w-6xl relative h-[320px] md:h-[550px] lg:h-[650px] mt-4 md:mt-10">
                    
                    {/* Mockup 1 (Center) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-[140px] md:w-[240px] lg:w-[280px]"
                    >
                        <Image src="/phoneloginmockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-3xl" />
                    </motion.div>

                    {/* Mockup 2 (Floating Left - Static & Clear) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="absolute top-6 left-0 md:left-[2%] lg:left-[5%] z-10 w-[120px] md:w-[220px] lg:w-[260px]"
                    >
                        <Image src="/phonewelcomemockup.png" alt="SewDigital App" width={800} height={1600} className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>

                    {/* Mockup 3 (Floating Right - Static & Clear) */}
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
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />


        </section>
    );
}
