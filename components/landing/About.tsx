"use client";

import { Ruler, ClipboardList, Receipt, Gift } from "lucide-react";

const features = [
    {
        icon: <ClipboardList size={24} />,
        title: "Order & Client Grouping",
        description: "Organize your clients and orders into custom groups. Track progress visually and delight clients with timely deliveries."
    },
    {
        icon: <Ruler size={24} />,
        title: "Digital Measurements",
        description: "Say goodbye to scattered notebooks. Store precise measurements with custom templates and never lose a client's fit again."
    },
    {
        icon: <Receipt size={24} />,
        title: "Professional Invoicing",
        description: "Generate and share professional invoices directly from the app to look like the pro you are."
    },
    {
        icon: <Gift size={24} />,
        title: "100% Free Core Features",
        description: "We've removed the trial restrictions so you can manage your core business operations entirely for free."
    }
];

export function About() {
    return (
        <section className="py-28 md:py-48 px-6 bg-surface-gray">
            <div className="container mx-auto max-w-7xl text-center">
                <div className="mb-20">
                    <h2
                        className="text-xs font-bold tracking-cinematic uppercase text-white/40 mb-4"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        The Platform
                    </h2>
                    <h3
                        className="text-3xl md:text-6xl font-bold tracking-tighter mx-auto max-w-3xl leading-none uppercase"
                        style={{ fontFamily: 'var(--font-varela-round)' }}
                    >
                        EVERYTHING YOU NEED TO <span className="text-stone-500">DIGITIZE YOUR WORKSHOP.</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-white/20 transition-all hover:-translate-y-2 flex flex-col items-center text-center"
                        >
                            <div className="mb-6 p-3 rounded-xl bg-white/5 inline-block group-hover:bg-white text-white group-hover:text-black transition-colors">
                                {feature.icon}
                            </div>
                            <h4
                                className="text-xl font-bold mb-4 tracking-tight uppercase"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                {feature.title}
                            </h4>
                            <p className="text-stone-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
