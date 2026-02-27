"use client";

import { Ruler, ClipboardList, BarChart3, Shield } from "lucide-react";

const features = [
    {
        icon: <ClipboardList size={24} />,
        title: "Order Management",
        description: "Track every stitch from request to delivery. Visual progress bars and automated status updates."
    },
    {
        icon: <Ruler size={24} />,
        title: "Client Measurements",
        description: "Store precise measurements with custom templates. Never lose a client's fit again."
    },
    {
        icon: <BarChart3 size={24} />,
        title: "Business Analytics",
        description: "Understand your revenue, popular styles, and busy periods with beautiful insights."
    },
    {
        icon: <Shield size={24} />,
        title: "Premium Security",
        description: "Your data is isolated and protected. Access your workshop from anywhere, securely."
    }
];

export function About() {
    return (
        <section className="py-28 md:py-48 px-6 bg-surface-gray">
            <div className="container mx-auto max-w-7xl">
                <div className="mb-20">
                    <h2
                        className="text-xs font-bold tracking-cinematic uppercase text-white/40 mb-4"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        The Platform
                    </h2>
                    <h3
                        className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl leading-none uppercase"
                        style={{ fontFamily: 'var(--font-termina)' }}
                    >
                        EVERYTHING YOU NEED TO <span className="text-stone-500">DIGITIZE YOUR WORKSHOP.</span>
                    </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="group p-8 rounded-2xl border border-white/5 bg-black/40 hover:border-white/20 transition-all hover:-translate-y-2"
                        >
                            <div className="mb-6 p-3 rounded-xl bg-white/5 inline-block group-hover:bg-white text-white group-hover:text-black transition-colors">
                                {feature.icon}
                            </div>
                            <h4
                                className="text-xl font-bold mb-4 tracking-tight uppercase"
                                style={{ fontFamily: 'var(--font-termina)' }}
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
