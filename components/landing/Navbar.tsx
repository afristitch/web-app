'use client'

import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, CreditCard, ChevronDown, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { handleStoreClick } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { user, organization, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
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
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-stone-900/90 border border-white/10 hover:border-white/30 transition-all text-white group"
                            >
                                {user.photoUrl && (user.photoUrl.startsWith("http://") || user.photoUrl.startsWith("https://")) ? (
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
                                <span className="text-[11px] font-bold tracking-tight text-white group-hover:text-[#FDDA0D] transition-colors">
                                    {user.name || "Account"}
                                </span>
                                <ChevronDown size={12} className={`text-stone-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Profile Dropdown Menu */}
                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-3 w-56 p-2 rounded-2xl bg-stone-950 border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 text-left normal-case font-normal z-50">
                                    <div className="px-3 py-2.5 border-b border-white/10">
                                        <div className="font-bold text-sm text-white truncate" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                            {user.name || "User"}
                                        </div>
                                        <div className="text-xs text-stone-400 truncate">{user.email}</div>
                                        {organization?.name && (
                                            <div className="mt-1 text-[10px] text-stone-500 uppercase font-bold tracking-wider flex items-center gap-1">
                                                <Building2 size={10} /> {organization.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="py-1">
                                        <Link
                                            href="/subscription"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                        >
                                            <CreditCard size={14} className="text-[#FDDA0D]" />
                                            <span>Manage Subscription</span>
                                        </Link>
                                    </div>

                                    <div className="pt-1 border-t border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsProfileDropdownOpen(false);
                                                logout();
                                            }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-xl transition-colors"
                                        >
                                            <LogOut size={14} />
                                            <span>Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
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
                                {user.photoUrl && (user.photoUrl.startsWith("http://") || user.photoUrl.startsWith("https://")) ? (
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
                                className="text-red-400 text-left uppercase flex items-center gap-2"
                            >
                                <LogOut size={16} /> Sign Out
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
