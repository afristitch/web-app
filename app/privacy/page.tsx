"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <SectionWrapper>
                <div className="container mx-auto max-w-4xl px-6 text-center">
                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Privacy <span className="opacity-40">Policy.</span>
                    </h1>

                    <div className="prose prose-invert prose-stone max-w-none space-y-8 text-stone-400 font-medium">
                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>1. Information We Collect</h2>
                            <p>We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, phone number, and workshop details.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>2. How We Use Your Information</h2>
                            <p>We use the information we collect to provide, maintain, and improve our services, to develop new ones, and to protect SewDigital and our users.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>3. Information Sharing</h2>
                            <p>We do not share your personal information with companies, organizations, or individuals outside of SewDigital except in the following cases: with your consent, for external processing, or for legal reasons.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>4. Data Security</h2>
                            <p>We work hard to protect SewDigital and our users from unauthorized access to or unauthorized alteration, disclosure, or destruction of information we hold.</p>
                        </section>

                        <section className="pt-12 border-t border-white/5">
                            <p className="text-xs uppercase tracking-widest">Last Updated: February 27, 2026</p>
                        </section>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
