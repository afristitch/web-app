'use client'

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 border-b ${isScrolled
                ? "bg-black/80 backdrop-blur-lg border-white/10 py-3 shadow-2xl shadow-black/50"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="container mx-auto max-w-7xl flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <Image
                        src="/stitch-logo-white.png"
                        alt="SewDigital Logo"
                        width={40}
                        height={40}
                        className="object-contain"
                        unoptimized
                    />
                    <span
                        className="text-2xl font-bold tracking-tighter uppercase group-hover:text-white/70 transition-colors"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        SewDigital
                    </span>
                </Link>
                {/* Desktop Menu */}
                <div
                    className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-cinematic uppercase text-stone-400"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    <Link href="/how-it-works" className="hover:text-white transition-colors">Platform</Link>
                    <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    {/* <Link href="/stories" className="hover:text-white transition-colors">Stories</Link> */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-white text-black rounded-full hover:bg-stone-100 transition-all active:scale-95"
                    >
                        Download
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black border-b border-white/5 p-8 flex flex-col gap-6 text-sm font-bold tracking-cinematic uppercase animate-in fade-in slide-in-from-top-4" style={{ fontFamily: 'var(--font-varela-round)' }}>
                    <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Platform</Link>
                    <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                    {/* <Link href="/stories" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link> */}
                    <a
                        href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-4 bg-white text-black rounded-full font-bold text-center"
                    >
                        Download App
                    </a>
                </div>
            )}
        </nav>
    );
}
