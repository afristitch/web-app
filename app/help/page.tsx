"use client";

import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { 
    Mail, 
    MessageCircle, 
    ArrowRight, 
    BookOpen, 
    User, 
    Scale, 
    CreditCard, 
    Smartphone, 
    Search 
} from "lucide-react";
import Link from "next/link";

const categories = [
    {
        title: "Getting Started",
        description: "New to SewDigital? Learn how it works.",
        icon: <BookOpen className="w-6 h-6" />,
        link: "#getting-started"
    },
    {
        title: "My Account",
        description: "Manage your profile and security.",
        icon: <User className="w-6 h-6" />,
        link: "#account"
    },
    {
        title: "Measurements",
        description: "How to take and save measurements.",
        icon: <Scale className="w-6 h-6" />,
        link: "#measurements"
    },
    {
        title: "Payments",
        description: "Billing, pricing, and subscriptions.",
        icon: <CreditCard className="w-6 h-6" />,
        link: "#payments"
    },
    {
        title: "Mobile App",
        description: "Using the app on iOS and Android.",
        icon: <Smartphone className="w-6 h-6" />,
        link: "#mobile"
    }
];

const faqs = [
    {
        question: "How do I get started with SewDigital?",
        answer: "Getting started is easy! Simply download our app from the Google Play Store to get started. Once you're in, you can start creating templates and managing your measurements immediately.",
        category: "Getting Started"
    },
    {
        question: "Is there a mobile app available?",
        answer: "Yes! SewDigital is available for both iOS and Android. You can find the download links in the footer of our website.",
        category: "Mobile App"
    },
    {
        question: "How do I reset my password?",
        answer: "You can reset your password by clicking 'Forgot Password' on the login screen of the mobile app or web platform.",
        category: "My Account"
    },
    {
        question: "How accurate are the digital measurements?",
        answer: "Our system is built for precision. We recommend following our measurement guides carefully for the best results.",
        category: "Measurements"
    },
    {
        question: "Who can I contact for business inquiries?",
        answer: "For all business and partnership inquiries, please reach out to us via email at support@sewdigital.app.",
        category: "Payments"
    }
];

export default function HelpPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-black">
            <SectionWrapper>
                <div className="container mx-auto max-w-5xl px-6">
                    {/* Hero Section */}
                    <div className="mb-20 text-center flex flex-col items-center">
                        <h1
                            className="text-5xl md:text-8xl font-bold tracking-tighter uppercase mb-6 leading-[0.9]"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Help <span className="opacity-40">Center.</span>
                        </h1>
                        <p className="text-stone-400 text-xl max-w-2xl font-medium mb-12 mx-auto">
                            Explore our resources and find answers to all your questions about digital tailoring.
                        </p>

                        {/* Search Bar (Visual Only) */}
                        <div className="relative max-w-2xl w-full group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-stone-500 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search for help articles..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-white placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/30 transition-all text-lg font-medium"
                            />
                        </div>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-32">
                        {categories.map((cat, i) => (
                            <Link 
                                href={cat.link}
                                key={i}
                                className="p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all group relative overflow-hidden flex flex-col items-center text-center"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowRight className="w-5 h-5 text-white" />
                                </div>
                                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform border border-white/10">
                                    {cat.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                    {cat.title}
                                </h3>
                                <p className="text-stone-400 text-sm font-medium leading-relaxed">
                                    {cat.description}
                                </p>
                            </Link>
                        ))}
                    </div>

                    {/* Popular Articles / FAQs */}
                    <div className="space-y-16 mb-32 text-center flex flex-col items-center">
                        <div className="flex flex-col items-center justify-center gap-6 border-b border-white/10 pb-8 w-full">
                            <h2
                                className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tight"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                Popular <span className="opacity-40">Questions</span>
                            </h2>
                            <p className="text-stone-500 font-bold uppercase tracking-widest text-xs" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                Frequently Visited
                            </p>
                        </div>

                        <div className="grid gap-12 w-full">
                            {faqs.map((faq, index) => (
                                <div key={index} className="group cursor-help flex flex-col items-center text-center">
                                    <div className="flex items-start gap-4 mb-3">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white py-1 px-2 bg-white/5 border border-white/10 rounded-md" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                            {faq.category}
                                        </span>
                                    </div>
                                    <h4
                                        className="text-xl md:text-2xl font-bold text-white mb-4 uppercase tracking-tighter group-hover:text-stone-300 transition-colors"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {faq.question}
                                    </h4>
                                    <p className="text-stone-400 text-lg font-medium leading-relaxed max-w-3xl mx-auto">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Still Need Help CTA */}
                    <div className="p-12 rounded-[2.5rem] bg-gradient-to-br from-stone-900 to-black border border-white/5 relative overflow-hidden text-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grain.png')] opacity-[0.03] pointer-events-none" />
                        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase mb-4 tracking-tighter" style={{ fontFamily: 'var(--font-varela-round)' }}>
                            Still Have <span className="opacity-40">Questions?</span>
                        </h2>
                        <p className="text-stone-400 text-lg mb-10 max-w-xl mx-auto font-medium">
                            If you couldn't find what you're looking for, our support team is ready to help you with your inquiry.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                href="/support"
                                className="px-10 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-[11px] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                Contact Support
                            </Link>
                            <a
                                href="mailto:support@sewdigital.app"
                                className="px-10 py-5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/5 transition-all"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
