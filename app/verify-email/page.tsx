"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { SectionWrapper } from "@/components/landing/SectionWrapper";

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState("");

    useEffect(() => {
        async function verify() {
            if (!token) {
                setStatus("error");
                setMessage("Verification token is missing.");
                return;
            }

            try {
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";

                const response = await fetch(`${baseUrl}/auth/verify-email/${token}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    setStatus("success");
                    setMessage("Your email has been successfully verified.");
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    setStatus("error");
                    setMessage(errorData.message || "Failed to verify email. The link may be expired or invalid.");
                }
            } catch {
                setStatus("error");
                setMessage("An error occurred during verification. Please try again later.");
            }
        }

        verify();
    }, [token]);

    if (!token) {
        return <div className="min-h-screen bg-black" />;
    }

    return (
        <main className="min-h-[80vh] flex flex-col justify-center pt-32 pb-20 overflow-x-hidden bg-black text-white">
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6 flex justify-center">
                    <div className="max-w-xl flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
                            {status === "loading" && <Loader2 className="h-8 w-8 animate-spin text-stone-500" />}
                            {status === "success" && <CheckCircle2 className="h-8 w-8 text-[#FDDA0D]" />}
                            {status === "error" && <XCircle className="h-8 w-8 text-rose-500" />}

                            <h1
                                className="text-3xl md:text-5xl font-bold tracking-tighter uppercase border-l border-white/10 pl-6 leading-none text-left"
                                style={{ fontFamily: 'var(--font-varela-round)' }}
                            >
                                {status === "loading" && <>Verification <span className="opacity-40">In Progress.</span></>}
                                {status === "success" && <>Verification <span className="opacity-40">Successful.</span></>}
                                {status === "error" && <>Verification <span className="opacity-40">Failed.</span></>}
                            </h1>
                        </div>

                        <p className="text-xl text-stone-500 font-medium leading-relaxed">
                            {message || "We are currently processing your verification request. This usually takes just a few seconds."}
                        </p>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-black">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
