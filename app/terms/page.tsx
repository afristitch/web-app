"use client";

import { useFadeUp } from "@/hooks/useFadeUp";

export default function TermsPage() {
    const headerFade = useFadeUp();

    return (
        <main className="min-h-screen bg-black text-white pt-32 pb-20 selection:bg-white selection:text-black overflow-x-hidden">
            <div className="grain-overlay" />

            <div className="container mx-auto max-w-7xl px-6">
                <div {...headerFade} className="max-w-6xl mx-auto text-center mb-32">
                    <h1
                        className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase mb-20 leading-[0.9] text-balance"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        Terms of Use <span className="text-stone-500">& End User License Agreement (EULA)</span>
                    </h1>
                </div>

                <div className="space-y-48 max-w-5xl mx-auto">
                    <section className="prose prose-invert prose-stone max-w-none text-center">
                        <div className="text-stone-400 leading-relaxed text-lg md:text-2xl font-medium">
                            <p className="text-white font-bold mb-10 italic">Effective Date: April 13, 2026</p>
                            <p className="text-balance">
                                This Terms of Use and End User License Agreement (“Agreement”) is a legal agreement between you (“User” or “End-User”) and SewDigital (“Developer”, “we”, “us”, or “our”) governing your use of the SewDigital application, website, and related services (“Service”).
                            </p>
                            <p className="mt-8 text-balance">
                                By downloading, installing, accessing, or using the Service, you agree to be bound by this Agreement.
                            </p>
                        </div>
                    </section>

                    <div className="grid gap-32 md:gap-48">
                        <Section title="Acknowledgement">
                            <p>This Agreement is between you and SewDigital only, and not with any third-party platform provider (including but not limited to Apple Inc. or Google LLC).</p>
                            <p>The platform providers are not responsible for the Service or its content.</p>
                            <p>You agree that this Agreement does not conflict with any applicable terms of the platform through which you access the Service.</p>
                        </Section>

                        <Section title="Scope of License">
                            <p>We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for personal or business use, subject to this Agreement.</p>
                            <p className="pt-8 font-bold text-white uppercase text-sm tracking-[0.2em]">You may not:</p>
                            <ul className="flex flex-col items-center gap-4 text-stone-500">
                                <li>copy, modify, distribute, sell, or lease any part of the Service</li>
                                <li>reverse engineer or attempt to extract source code</li>
                                <li>use the Service for unlawful purposes</li>
                            </ul>
                        </Section>

                        <Section title="Subscriptions and Payments">
                            <p>The Service may offer auto-renewable or recurring subscriptions.</p>
                            <p>If you purchase a subscription, payment will be processed through the platform where the Service is accessed (for example, Apple App Store, Google Play Store, or other supported platforms).</p>
                            <p>Subscriptions automatically renew unless cancelled at least 24 hours before the end of the current billing period.</p>
                            <p>You can manage or cancel subscriptions through your platform account settings.</p>
                            <p>All billing, renewal, and refunds are handled by the respective platform provider. SewDigital does not directly process or store payment information.</p>
                        </Section>

                        <Section title="Maintenance and Support">
                            <p>SewDigital is solely responsible for providing support and maintenance for the Service.</p>
                            <p>Platform providers have no obligation to provide support or maintenance for the Service.</p>
                        </Section>

                        <Section title="Disclaimer of Warranties">
                            <p>The Service is provided on an “as is” and “as available” basis.</p>
                            <p>We make no warranties of any kind, express or implied, including but not limited to merchantability, fitness for a particular purpose, or non-infringement.</p>
                        </Section>

                        <Section title="Limitation of Liability">
                            <p>To the maximum extent permitted by law, SewDigital shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the Service.</p>
                        </Section>

                        <Section title="Product Claims">
                            <p>You agree that SewDigital is responsible for addressing any claims relating to the Service, including but not limited to:</p>
                            <ul className="flex flex-col items-center gap-4 text-stone-500">
                                <li>product liability claims</li>
                                <li>legal or regulatory compliance claims</li>
                                <li>consumer protection or privacy claims</li>
                            </ul>
                        </Section>

                        <Section title="Intellectual Property Rights">
                            <p>All rights, title, and interest in and to the Service remain the property of SewDigital.</p>
                            <p>We are responsible for handling any intellectual property infringement claims relating to the Service.</p>
                        </Section>

                        <Section title="Legal Compliance">
                            <p>You represent that:</p>
                            <ul className="flex flex-col items-center gap-4 text-stone-500">
                                <li>you are not located in a country subject to sanctions or embargoes</li>
                                <li>you are not listed on any restricted or prohibited parties list under applicable law</li>
                            </ul>
                        </Section>

                        <Section title="Third-Party Services">
                            <p>The Service may integrate or rely on third-party services. You agree to comply with any applicable third-party terms when using those services.</p>
                        </Section>

                        <Section title="Third-Party Beneficiaries">
                            <p>Depending on the platform used to access the Service, the platform provider may be a third-party beneficiary of this Agreement with respect to its platform distribution rights.</p>
                        </Section>

                        <Section title="Termination">
                            <p>We may suspend or terminate access to the Service at any time if you violate this Agreement.</p>
                        </Section>

                        <Section title="Changes to This Agreement">
                            <p>We may update this Agreement from time to time. Continued use of the Service constitutes acceptance of the updated terms.</p>
                        </Section>

                        <Section title="Contact Information">
                            <p className="text-white font-bold text-center mb-10">If you have any questions about this Agreement, contact:</p>
                            <div className="p-8 md:p-16 bg-white/[0.02] border border-white/5 rounded-[2rem] md:rounded-[3rem] space-y-12 text-stone-300 text-center">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
                                    <div>
                                        <strong className="text-white uppercase text-[10px] tracking-[0.3em] block mb-4 opacity-30">Developer</strong>
                                        <p className="text-2xl font-black">SewDigital</p>
                                    </div>
                                    <div>
                                        <strong className="text-white uppercase text-[10px] tracking-[0.3em] block mb-4 opacity-30">Email</strong>
                                        <p className="text-lg md:text-xl text-stone-300">support@sewdigital.app</p>
                                    </div>
                                    <div>
                                        <strong className="text-white uppercase text-[10px] tracking-[0.3em] block mb-4 opacity-30">Address</strong>
                                        <p className="text-lg md:text-xl text-stone-300">Ahodwo, Kumasi, Ghana</p>
                                    </div>
                                    <div>
                                        <strong className="text-white uppercase text-[10px] tracking-[0.3em] block mb-4 opacity-30">Phone</strong>
                                        <p className="text-lg md:text-xl text-stone-300">+233592407690</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        <div className="pt-32 border-t border-white/5 text-center">
                            <p className="text-stone-800 uppercase tracking-[0.4em] text-[10px] font-black">
                                Acknowledgment & Acceptance
                            </p>
                            <p className="mt-8 text-stone-400 max-w-2xl mx-auto italic font-medium leading-relaxed text-lg md:text-xl">
                                By using the Service, you confirm that you have read, understood, and agree to be bound by this Agreement.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function Section({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <section className="group text-center">
            <div className="space-y-8">
                <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-white uppercase tracking-tight"
                    style={{ fontFamily: 'var(--font-varela-round)' }}
                >
                    {title}
                </h2>
                <div className="text-stone-400 leading-relaxed text-base md:text-xl font-medium mx-auto max-w-3xl space-y-6">
                    {children}
                </div>
            </div>
        </section>
    );
}
