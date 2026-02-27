"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function Waitlist() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubmitted(true);
            // Logic for waitlist would go here
        }
    };

    return (
        <section id="waitlist" className="py-28 md:py-48 px-6 bg-stone text-black">
            <div className="container mx-auto max-w-4xl text-center">
                <div className="mb-12">
                    <h2
                        className="text-sm font-bold tracking-cinematic uppercase text-stone-500 mb-6"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        Join the Era
                    </h2>
                    <h3
                        className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-8 uppercase"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        READY TO <span className="opacity-40">SEW DIGITAL?</span>
                    </h3>
                    <p className="text-stone-500 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        Be the first to experience the future of tailoring management. Get early access and exclusive founding member pricing.
                    </p>
                </div>

                {submitted ? (
                    <div className="p-12 rounded-3xl bg-black text-white fade-up inline-block border border-white/10">
                        <h4 className="text-2xl font-bold mb-2 text-white tracking-tight uppercase" style={{ fontFamily: 'var(--font-termina)' }}>You&apos;re on the list!</h4>
                        <p className="text-stone-500 font-medium">We&apos;ll reach out as soon as we&apos;re ready for you.</p>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto"
                    >
                        <input
                            type="email"
                            required
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-grow px-8 py-5 rounded-full bg-white border border-stone-200 text-black font-medium focus:outline-none focus:border-black transition-all"
                        />
                        <button
                            type="submit"
                            className="px-8 py-5 bg-black text-white font-bold rounded-full flex items-center justify-center gap-2 hover:bg-black/90 active:scale-95 transition-all shadow-xl shadow-black/10"
                        >
                            Join Waitlist <Send size={18} />
                        </button>
                    </form>
                )}

                <p className="mt-8 text-stone-400 text-sm font-medium">
                    No credit card required. Private beta starting soon.
                </p>
            </div>
        </section>
    );
}
