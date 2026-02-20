"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

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
                // The user said "makes a get request to everything apart from the main domain"
                // Interpretation: Make a GET request to the backend URL with the same path and query
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";

                // Constructing the backend endpoint based on the requested logic
                // Path + Search is /verify-email?token=...
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
            } catch (err) {
                setStatus("error");
                setMessage("An error occurred during verification. Please try again later.");
            }
        }

        verify();
    }, [token]);

    if (!token) {
        return <div className="bg-white min-h-screen whitespace-pre" />;
    }

    return (
        <div className="flex min-h-screen flex-col items-center pt-24 px-6 bg-white">
            <div className="w-full max-w-lg text-left">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">SewDigital</h1>
                    <p className="text-slate-500 font-medium text-sm">Sewing the new way</p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    {status === "loading" && <Loader2 className="h-6 w-6 animate-spin text-slate-400" />}
                    {status === "success" && <CheckCircle2 className="h-6 w-6 text-emerald-500" />}
                    {status === "error" && <XCircle className="h-6 w-6 text-rose-500" />}

                    <h2 className="text-xl font-bold tracking-tight text-slate-900 border-l border-slate-200 pl-4">
                        {status === "loading" && "Verification in progress..."}
                        {status === "success" && "Verification successful"}
                        {status === "error" && "Verification failed"}
                    </h2>
                </div>

                <p className="text-slate-600 leading-relaxed max-w-md">
                    {message || "We are currently processing your verification request. This usually takes just a few seconds."}
                </p>

                <div className="pt-12 border-t border-slate-100 mt-24">
                    <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-medium text-slate-400">
                        <span>© 2026 SewDigital</span>
                        <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
