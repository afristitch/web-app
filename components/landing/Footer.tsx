"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
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
                                style={{ fontFamily: 'var(--font-termina)' }}
                            >
                                SewDigital
                            </span>
                        </Link>

                        <p className="text-stone-500 text-sm max-w-xs font-medium mb-8">
                            Empowering tailors with modern digital tools for a timeless craft.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-xl group hover:bg-white hover:text-black transition-all">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.05 20.28c-.96.95-2.04 1.9-3.26 1.9-1.2 0-1.59-.74-3-.74-1.42 0-1.87.72-3 .74-1.16.03-2.35-.98-3.35-1.99a11.1 11.1 0 0 1-2.15-5.8c0-3.3 2.14-5.06 4.2-5.06 1.1 0 2.06.7 2.62.7.55 0 1.76-.74 3.03-.74a4.8 4.8 0 0 1 3.52 1.9c-2.84 1.66-2.39 5.5.4 6.7-.63 1.57-1.44 3.12-2.3 4.29zM13.2 2c1.08.06 2.07.69 2.65 1.4.63.77.8 1.83.65 2.82-1.03.07-2.06-.57-2.65-1.3-.67-.84-.87-1.92-.65-2.92z" />
                                </svg>
                                <span className="text-[10px] font-bold font-termina tracking-widest uppercase">iOS</span>
                            </a>
                            <a href="#" className="flex items-center gap-2 border border-white/10 px-4 py-2 rounded-xl group hover:bg-white hover:text-black transition-all">
                                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186c-.183-.186-.31-.444-.31-.736V2.55c0-.292.127-.55.31-.736zm14.47 5.105L15.308 12l2.77 5.08 3.523-2.008c.95-.54 1.597-1.576 1.597-2.768S22.551 10.15 21.6 9.61l-3.522-1.691zM4.771 1.055l12.446 6.034-2.77 5.08L4.771 1.055zm12.446 15.856l-12.446 6.034 9.677-11.131 2.769 5.097z" />
                                </svg>
                                <span className="text-[10px] font-bold font-termina tracking-widest uppercase">Android</span>
                            </a>
                        </div>
                    </div>

                    <div
                        className="flex gap-12 text-[11px] font-bold tracking-cinematic uppercase text-stone-500"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        <Link href="/how-it-works" className="hover:text-white transition-colors">Platform</Link>
                        <Link href="/stories" className="hover:text-white transition-colors">Stories</Link>
                        <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                        <Link href="#" className="hover:text-white transition-colors">Contact</Link>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold tracking-cinematic uppercase text-stone-600">
                    <p>© 2026 SewDigital. All rights reserved.</p>
                    <p className="order-first md:order-none">
                        Crafted in spirit by <a href="https://jimmyessel.com" target="_blank" rel="noopener noreferrer" className="text-white hover:opacity-70 transition-opacity">Jimmy Essel</a>
                    </p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
