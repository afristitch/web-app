'use client'

import { useState, useEffect, useRef } from "react";
import { Menu, X, User, LogOut, CreditCard, ChevronDown, Building2, Smartphone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { handleStoreClick } from "@/lib/store";
import { useAuth } from "@/context/AuthContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { user, activeWorkspace: organization, logout } = useAuth();

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
        <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
            {/* Top Advertising Announcement Banner - Balanced font size using Varela Round */}
            <div
                className="bg-white/90 backdrop-blur-md border-b border-white/10 text-black text-[10px] sm:text-xs font-semibold py-2 px-4 sm:px-6 text-center flex flex-row items-center justify-center gap-1 sm:gap-2 shadow-xs"
                style={{ fontFamily: 'var(--font-varela-round)' }}
            >
                <div className="flex items-center gap-1 sm:gap-1.5">
                    <Smartphone size={12} className="shrink-0 text-black sm:w-[14px] sm:h-[14px]" />
                    <span className="hidden sm:inline">Take SewDigital anywhere — Download our official Mobile App on iOS & Android</span>
                    <span className="sm:hidden leading-none pt-0.5">Download the SewDigital Mobile App</span>
                </div>
                <button
                    onClick={handleStoreClick}
                    className="bg-black text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[9px] sm:text-xs font-bold hover:bg-stone-800 transition-all shadow-xs cursor-pointer ml-1 inline-flex items-center gap-1"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    Get App →
                </button>
            </div>

            {/* Main Navbar */}
            <nav
                className={`transition-all duration-300 px-6 py-2.5 border-b ${isScrolled
                    ? "bg-black/90 backdrop-blur-lg border-white/10 shadow-2xl shadow-black/50"
                    : "bg-black/40 backdrop-blur-md border-white/5"
                    }`}
            >
                <div className="container mx-auto max-w-7xl flex items-center justify-between">
                    {/* Logo with text by the side */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <Image
                            src="/stitch-logo-white.png"
                            alt="SewDigital Logo"
                            width={38}
                            height={38}
                            className="object-contain"
                            unoptimized
                        />
                        <span
                            className="text-xl font-bold tracking-tight text-white group-hover:text-white/80 transition-colors"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            SewDigital
                        </span>
                    </Link>

                    {/* Desktop Menu - Perfect balanced font size */}
                    <div
                        className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-semibold text-stone-200"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        <Link href="/how-it-works" className="hover:text-white transition-colors">Platform</Link>
                        <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>

                        {/* If user is logged in: show profile dropdown ONLY. Otherwise: show Sign Up button ONLY */}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                                    className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-900/90 border border-white/20 hover:border-white/40 transition-all text-white group shadow-xs"
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
                                        <div className="w-6 h-6 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-[10px] uppercase shrink-0">
                                            {user.name ? user.name.charAt(0) : "U"}
                                        </div>
                                    )}
                                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-white group-hover:text-white transition-colors">
                                        {user.name || "Account"}
                                    </span>
                                    <ChevronDown size={12} className={`text-stone-400 transition-transform ${isProfileDropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Profile Dropdown Menu */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-56 p-2 rounded-2xl bg-stone-950 border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 text-left font-normal z-50">
                                        <div className="px-3 py-2.5 border-b border-white/10">
                                            <div className="font-bold text-sm text-white truncate" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                                {user.name || "User"}
                                            </div>
                                            <div className="text-xs text-stone-400 truncate">{user.email}</div>
                                            {organization?.name && (
                                                <div className="mt-1 text-[10px] text-stone-500 font-bold tracking-wider flex items-center gap-1">
                                                    <Building2 size={10} /> {organization.name}
                                                </div>
                                            )}
                                        </div>

                                        <div className="py-1 space-y-0.5">
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-white hover:bg-white/10 rounded-xl transition-colors"
                                            >
                                                <Building2 size={14} />
                                                <span>Open Web App Dashboard</span>
                                            </Link>
                                            <Link
                                                href="/subscription"
                                                onClick={() => setIsProfileDropdownOpen(false)}
                                                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-stone-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                                            >
                                                <CreditCard size={14} className="text-white" />
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
                                className="px-5 py-2 bg-white text-black rounded-full hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 font-bold text-xs sm:text-sm shadow-xs"
                            >
                                Log In
                            </Link>
                        )}
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
                    <div className="absolute top-full left-0 right-0 bg-black border-b border-white/10 p-8 flex flex-col gap-6 text-sm font-semibold animate-in fade-in slide-in-from-top-4" style={{ fontFamily: 'var(--font-varela-round)' }}>
                        <Link href="/how-it-works" onClick={() => setIsMobileMenuOpen(false)}>Platform</Link>
                        <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)}>Demo</Link>
                        <Link href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</Link>

                        {user ? (
                            <>
                                <Link
                                    href="/subscription"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center gap-3 text-white"
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
                                        <div className="w-7 h-7 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-xs shrink-0">
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
                                    className="text-red-400 text-left flex items-center gap-2"
                                >
                                    <LogOut size={16} /> Sign Out
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3.5 bg-white text-black rounded-full hover:bg-stone-200 transition-all hover:scale-105 active:scale-95 font-bold text-sm text-center"
                            >
                                Log In
                            </Link>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}
