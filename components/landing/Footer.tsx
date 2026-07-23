"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-16 px-6 border-t border-white/10 bg-black text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    {/* Side-by-side Logo with text */}
                    <div className="flex flex-col items-center md:items-start">
                        <Link href="/" className="flex items-center gap-2.5 group mb-2">
                            <Image
                                src="/stitch-logo-white.png"
                                alt="SewDigital Logo"
                                width={32}
                                height={32}
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

                        <p 
                            className="text-stone-400 text-center md:text-left text-xs max-w-xs font-medium mb-5"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Next-generation Operating System for Tailors & Fashion Studios.
                        </p>

                        <div className="flex items-center gap-3">
                            <a
                                href="https://apps.apple.com/us/app/sew-digital/id6760103170"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-stone-200 transition-all cursor-pointer shadow-sm"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.05 20.28c-.96.95-2.04 1.9-3.26 1.9-1.2 0-1.59-.74-3-.74-1.42 0-1.87.72-3 .74-1.16.03-2.35-.98-3.35-1.99a11.1 11.1 0 0 1-2.15-5.8c0-3.3 2.14-5.06 4.2-5.06 1.1 0 2.06.7 2.62.7.55 0 1.76-.74 3.03-.74a4.8 4.8 0 0 1 3.52 1.9c-2.84 1.66-2.39 5.5.4 6.7-.63 1.57-1.44 3.12-2.3 4.29zM13.2 2c1.08.06 2.07.69 2.65 1.4.63.77.8 1.83.65 2.82-1.03.07-2.06-.57-2.65-1.3-.67-.84-.87-1.92-.65-2.92z" />
                                </svg>
                                <span className="text-[11px] font-extrabold" style={{ fontFamily: 'var(--font-varela-round)' }}>iOS App</span>
                            </a>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.jimmy.sewdigital&hl=en"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl hover:bg-stone-200 transition-all shadow-sm"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.186-.31-.444-.31-.736V2.55c0-.292.127-.55.31-.736zm14.47 5.105L15.308 12l2.77 5.08 3.523-2.008c.95-.54 1.597-1.576 1.597-2.768S22.551 10.15 21.6 9.61l-3.522-1.691zM4.771 1.055l12.446 6.034-2.77 5.08L4.771 1.055zm12.446 15.856l-12.446 6.034 9.677-11.131 2.769 5.097z" />
                                </svg>
                                <span className="text-[11px] font-extrabold" style={{ fontFamily: 'var(--font-varela-round)' }}>Android</span>
                            </a>
                        </div>
                    </div>

                    <div
                        className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-10 text-xs font-semibold text-stone-300"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        <Link href="/how-it-works" className="hover:text-white transition-colors">Platform</Link>
                        <Link href="/demo" className="hover:text-white transition-colors">Demo</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="/help" className="hover:text-white transition-colors">Help</Link>
                        <Link href="/support" className="hover:text-white transition-colors">Support</Link>
                    </div>
                </div>

                <div 
                    className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-medium text-stone-400"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    <p>© 2026 SewDigital. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
