"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-white/5 bg-black">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div>
                        <h2
                            className="text-2xl font-bold tracking-tighter mb-4 uppercase"
                            style={{ fontFamily: 'var(--font-termina)' }}
                        >
                            SEWDIGITAL
                        </h2>
                        <p className="text-stone-500 text-sm max-w-xs font-medium">
                            Empowering tailors with modern digital tools for a timeless craft.
                        </p>
                    </div>

                    <div
                        className="flex gap-12 text-[11px] font-bold tracking-cinematic uppercase text-stone-500"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
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
