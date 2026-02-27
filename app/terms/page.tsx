"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";

export default function TermsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <SectionWrapper>
                <div className="container mx-auto max-w-4xl px-6">
                    <h1
                        className="text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-12"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        Terms of <span className="opacity-40">Service.</span>
                    </h1>

                    <div className="prose prose-invert prose-stone max-w-none space-y-8 text-stone-400 font-medium">
                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-termina)' }}>1. Acceptance of Terms</h2>
                            <p>By accessing or using SewDigital, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-termina)' }}>2. Use License</h2>
                            <p>Permission is granted to temporarily download one copy of the materials on SewDigital&apos;s website for personal, non-commercial transitory viewing only.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-termina)' }}>3. Disclaimer</h2>
                            <p>The materials on SewDigital&apos;s website are provided on an &apos;as is&apos; basis. SewDigital makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white uppercase tracking-tight" style={{ fontFamily: 'var(--font-termina)' }}>4. Limitations</h2>
                            <p>In no event shall SewDigital or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SewDigital&apos;s website.</p>
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
