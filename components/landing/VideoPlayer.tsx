"use client";

import { useState } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";

interface VideoPlayerProps {
    youtubeId: string;
    thumbnailUrl: string;
    title: string;
    subtitle?: string;
}

export function VideoPlayer({ youtubeId, thumbnailUrl, title, subtitle }: VideoPlayerProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="relative group aspect-video rounded-[24px] md:rounded-[40px] overflow-hidden border border-white/10 bg-white/5 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover grayscale opacity-60 transition-transform duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white text-black flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110">
                        <Play fill="black" size={32} className="ml-1" />
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 text-left">
                    {subtitle && <p className="text-[10px] font-bold tracking-cinematic uppercase text-white/40 mb-2">{subtitle}</p>}
                    <h3 className="text-xl md:text-3xl font-bold uppercase tracking-tight" style={{ fontFamily: 'var(--font-termina)' }}>{title}</h3>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300">
                    <div
                        className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full border-0"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
