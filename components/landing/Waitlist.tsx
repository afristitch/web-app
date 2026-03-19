"use client";

import { Send } from "lucide-react";

export function Waitlist() {

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

                <div className="flex justify-center">
                    <a
                        href="https://forms.cloud.microsoft/pages/responsepage.aspx?id=TY8KsmoNLk-Dohgclo-Iglc37NZ_n5FBjVuVuC_TfvBUNjhHS1AxN1c4Wkk4T05GWFJCUk1EWkxTWi4u&route=shorturl"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-12 py-6 bg-black text-white font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-black/20 text-xl"
                    >
                        Join the Waitlist <Send size={24} />
                    </a>
                </div>

                <p className="mt-8 text-stone-400 text-sm font-medium">
                    No credit card required. Launching soon. 21 days free trial included.
                </p>
            </div>
        </section>
    );
}
