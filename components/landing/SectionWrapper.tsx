"use client";

import { useFadeUp } from "@/hooks/useFadeUp";

export function SectionWrapper({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const { ref, className: animationClass } = useFadeUp();

    return (
        <div ref={ref} className={`${animationClass} ${className}`}>
            {children}
        </div>
    );
}
