"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api-client";
import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { ArrowRight, Mail, AlertCircle, Loader2, CheckCircle2, ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        }>
            <ForgotPasswordForm />
        </Suspense>
    );
}

function ForgotPasswordForm() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);

        try {
            const res = await api.post("/auth/request-password-reset", { email: email.trim() });
            if (res.success || res.message) {
                setSuccess(true);
            } else {
                setError(res.message || "Failed to request password reset.");
            }
        } catch (err: any) {
            console.error("Password reset request error:", err);
            // Show friendly message regardless of whether email exists for security
            setSuccess(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 flex flex-col justify-center text-white">
            <SectionWrapper>
                <div className="container mx-auto max-w-md px-6">
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 mb-6">
                            <Image
                                src="/stitch-logo-white.png"
                                alt="SewDigital Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                                unoptimized
                            />
                        </Link>
                        <h1
                            className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase mb-3"
                            style={{ fontFamily: 'var(--font-varela-round)' }}
                        >
                            Forgot <span className="text-stone-500">Password?</span>
                        </h1>
                        <p className="text-stone-400 text-sm font-medium">
                            Enter your email address to receive a password reset link
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-stone-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
                        {success ? (
                            <div className="text-center space-y-4 py-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mx-auto">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                    Check Your Email
                                </h3>
                                <p className="text-xs text-stone-300 font-medium leading-relaxed">
                                    If an account exists with <strong className="text-white">{email}</strong>, we have sent a password reset link to your inbox.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/login"
                                        className="inline-flex w-full items-center justify-center gap-2 py-3.5 bg-white text-black font-bold uppercase text-xs rounded-full hover:bg-stone-200 transition-all cursor-pointer"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        <ArrowLeft className="w-4 h-4 text-black" /> Back to Sign In
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <>
                                {error && (
                                    <div className="mb-6 p-4 rounded-2xl bg-red-950/50 border border-red-500/20 text-red-300 text-xs flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                                        <span>{error}</span>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                    setError(null);
                                                }}
                                                placeholder="owner@tailorshop.com"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3.5 pl-12 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full hover:bg-stone-200 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none mt-4 cursor-pointer"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Sending Link...
                                            </>
                                        ) : (
                                            <>
                                                Send Reset Link <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>

                    <div className="mt-8 text-center text-xs text-stone-500">
                        Remembered your password?{" "}
                        <Link href="/login" className="text-white underline font-bold">
                            Sign In
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
