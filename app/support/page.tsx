"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { Mail, MessageCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

const faqs = [
    {
        question: "How do I get started with SewDigital?",
        answer: "Getting started is easy! Simply download our app from the Google Play Store to get started. Once you're in, you can start creating templates and managing your measurements immediately."
    },
    {
        question: "Is there a mobile app available?",
        answer: "Yes! SewDigital is available for both iOS and Android. You can find the download links in the footer of our website."
    },
    {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking 'Forgot Password' on the login screen of the mobile app or web platform."
    },
    {
        question: "Who can I contact for business inquiries?",
        answer: "For all business and partnership inquiries, please reach out to us via email at support@sewdigital.app."
    }
];

export default function SupportPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-black text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
            <SectionWrapper>
                <div className="container mx-auto max-w-5xl px-6">
                    {/* Header */}
                    <div className="mb-20 text-center flex flex-col items-center">
                        <h1
                            className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Support <span className="opacity-40">& Assistance.</span>
                        </h1>
                        <p className="text-stone-400 text-xl max-w-2xl font-medium mx-auto" style={{ fontFamily: 'var(--font-varela-round)' }}>
                            Need help with your sewing projects or have questions about the platform?
                            We&apos;re here to help you every step of the way.
                        </p>
                    </div>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-2 gap-6 mb-32">
                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center" style={{ fontFamily: 'var(--font-varela-round)' }}>
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
                                <Mail className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Email Us
                            </h3>
                            <p className="text-stone-400 mb-8 font-medium" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Send us an email and we&apos;ll get back to you within 24 hours.
                            </p>
                            <a
                                href="mailto:support@sewdigital.app"
                                className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/link"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                Send Email <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </div>

                        <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group flex flex-col items-center text-center" style={{ fontFamily: 'var(--font-varela-round)' }}>
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-white/10">
                                <MessageCircle className="text-white w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                WhatsApp
                            </h3>
                            <p className="text-stone-400 mb-8 font-medium" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Chat with us directly for quick support and inquiries.
                            </p>
                            <a
                                href="https://wa.me/233592407690"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs group/link"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                Start Chat <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="space-y-12 text-center flex flex-col items-center">
                        <h2
                            className="text-3xl font-bold text-white uppercase tracking-tight mb-12"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Frequently Asked <span className="opacity-40">Questions</span>
                        </h2>

                        <div className="grid gap-8 w-full max-w-3xl">
                            {faqs.map((faq, index) => (
                                <div key={index} className="pb-8 border-b border-white/5 group flex flex-col items-center" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                    <h4
                                        className="text-lg font-bold text-white mb-4 uppercase tracking-tight"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {faq.question}
                                    </h4>
                                    <p className="text-stone-400 font-medium leading-relaxed" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
