"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api-client";
import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}

function LoginForm() {
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get("redirectUrl") || "/subscription";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await api.post("/auth/login", { email, password });
            if (res.success && res.data) {
                login(res.data, redirectUrl);
            } else {
                setError(res.message || "Failed to log in. Please check your credentials.");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.message || "Invalid credentials or network connection issue.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-32 pb-20 flex flex-col justify-center">
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
                            Tailor <span className="text-stone-500">Sign In</span>
                        </h1>
                        <p className="text-stone-400 text-sm font-medium">
                            Log in to manage your shop's subscription & billing details
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-stone-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
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
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="owner@tailorshop.com"
                                        className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3.5 pl-12 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase">
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-stone-400 hover:text-white underline transition-colors font-medium"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
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
                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In to Manage <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 text-center text-xs text-stone-500">
                        Need an account for your tailor shop?{" "}
                        <Link href="/signup" className="text-white underline font-bold">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
