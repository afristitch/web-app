'use client'

import { useState, useEffect } from "react";
import { Menu, X, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { handleStoreClick } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();

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
                    <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
                    <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                    <Link href="/feedback" className="hover:text-white transition-colors">Feedback</Link>

                    {user ? (
                        <>
                            <Link href="/subscription" className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 transition-all text-white group">
                                {user.photoUrl ? (
                                    <Image
                                        src={user.photoUrl}
                                        alt={user.name || "User Avatar"}
                                        width={24}
                                        height={24}
                                        className="w-6 h-6 rounded-full object-cover shrink-0 border border-white/20"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-6 h-6 rounded-full bg-[#FDDA0D] text-black font-extrabold flex items-center justify-center text-[10px] uppercase shrink-0">
                                        {user.name ? user.name.charAt(0) : "U"}
                                    </div>
                                )}
                                <div className="flex flex-col text-left">
                                    <span className="text-[11px] font-bold tracking-tight text-white group-hover:text-[#FDDA0D] transition-colors leading-none">
                                        {user.name || "My Account"}
                                    </span>
                                    <span className="text-[9px] text-stone-400 font-normal tracking-wider lowercase">
                                        Subscription
                                    </span>
                                </div>
                            </Link>
                            <button
                                onClick={logout}
                                className="px-4 py-2 border border-white/20 text-stone-300 rounded-full hover:bg-white/10 hover:text-white transition-all text-[11px] uppercase tracking-wider"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="px-5 py-2 border border-white/20 text-white rounded-full hover:bg-white/10 transition-all text-[11px] uppercase tracking-wider flex items-center gap-1.5"
                        >
                            <User size={13} /> Sign In
                        </Link>
                    )}

                    <button
                        onClick={handleStoreClick}
                        className="px-6 py-2 bg-white text-black rounded-full hover:bg-[#FDDA0D] transition-all hover:scale-[1.02] active:scale-95 font-bold tracking-widest uppercase text-[11px]"
                    >
                        Download App
                    </button>
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
                    <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>Demo</Link>
                    <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>
                    <Link href="/feedback" onClick={() => setIsMobileMenuOpen(false)}>Feedback</Link>

                    {user ? (
                        <>
                            <Link
                                href="/subscription"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-3 text-[#FDDA0D]"
                            >
                                {user.photoUrl ? (
                                    <Image
                                        src={user.photoUrl}
                                        alt={user.name || "User Avatar"}
                                        width={28}
                                        height={28}
                                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-white/20"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-[#FDDA0D] text-black font-extrabold flex items-center justify-center text-xs uppercase shrink-0">
                                        {user.name ? user.name.charAt(0) : "U"}
                                    </div>
                                )}
                                <span>{user.name || "Manage Subscription"}</span>
                            </Link>
                            <button
                                onClick={() => {
                                    setIsMobileMenuOpen(false);
                                    logout();
                                }}
                                className="text-stone-400 text-left uppercase"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="text-white" onClick={() => setIsMobileMenuOpen(false)}>Sign In</Link>
                    )}

                    <button
                        onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            handleStoreClick(e as any);
                        }}
                        className="w-full py-4 bg-white text-black rounded-full hover:bg-[#FDDA0D] transition-all hover:scale-[1.02] active:scale-95 font-bold tracking-widest uppercase text-sm text-center"
                    >
                        Download App
                    </button>
                </div>
            )}
        </nav>
    );
}
