"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { SectionWrapper } from "@/components/landing/SectionWrapper";

function ResetPasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setStatus("error");
            setMessage("Reset token is missing.");
            return;
        }

        if (password.length < 6) {
            setStatus("error");
            setMessage("Password must be at least 6 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setStatus("error");
            setMessage("Passwords do not match.");
            return;
        }

        setStatus("loading");
        setMessage("");

        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000/api/v1";
            const response = await fetch(`${baseUrl}/auth/reset-password/${token}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage("Your password has been reset successfully. You can now log in with your new password.");
            } else {
                setStatus("error");
                setMessage(data.message || "Failed to reset password. The link may be expired or invalid.");
            }
        } catch {
            setStatus("error");
            setMessage("An error occurred. Please try again later.");
        }
    };

    if (!token) {
        return (
            <main className="min-h-screen pt-32 pb-20 bg-black text-white">
                <SectionWrapper>
                    <div className="container mx-auto max-w-7xl px-6 text-center flex flex-col items-center">
                        <XCircle className="h-12 w-12 text-rose-500 mb-6" />
                        <h1
                            className="text-3xl md:text-6xl font-bold tracking-tighter uppercase mb-6"
                            style={{ fontFamily: 'var(--font-termina)' }}
                        >
                            Invalid <span className="opacity-40">Reset Link.</span>
                        </h1>
                        <p className="text-xl text-stone-500 font-medium mb-12 max-w-lg">
                            The password reset token is missing or invalid. Please request a new link.
                        </p>
                        <button
                            onClick={() => router.push("/")}
                            className="flex items-center gap-2 px-10 py-5 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                        >
                            Return to home <ArrowRight size={20} />
                        </button>
                    </div>
                </SectionWrapper>
            </main>
        );
    }

    if (status === "success") {
        return (
            <main className="min-h-screen pt-32 pb-20 bg-black text-white">
                <SectionWrapper>
                    <div className="container mx-auto max-w-7xl px-6">
                        <div className="max-w-xl">
                            <div className="flex items-center gap-4 mb-8">
                                <CheckCircle2 className="h-8 w-8 text-[#FDDA0D]" />
                                <h1
                                    className="text-3xl md:text-5xl font-bold tracking-tighter uppercase border-l border-white/10 pl-6 leading-none"
                                    style={{ fontFamily: 'var(--font-termina)' }}
                                >
                                    Reset <span className="opacity-40">Successful.</span>
                                </h1>
                            </div>

                            <p className="text-xl text-stone-500 font-medium leading-relaxed mb-12">
                                {message}
                            </p>

                            <button
                                onClick={() => router.push("/")}
                                className="flex items-center justify-center gap-2 w-full max-w-md bg-white text-black py-5 rounded-full font-bold hover:scale-[1.02] transition-all shadow-lg"
                            >
                                Go to login
                                <ArrowRight className="h-5 w-5" />
                            </button>

                            <div className="pt-12 border-t border-white/5 mt-24">
                                <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-bold tracking-cinematic uppercase text-stone-500">
                                    <span>© 2026 SewDigital</span>
                                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                    <a href="#" className="hover:text-white transition-colors">Support</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </SectionWrapper>
            </main>
        );
    }

    return (
        <main className="min-h-screen pt-32 pb-20 bg-black text-white">
            <SectionWrapper>
                <div className="container mx-auto max-w-7xl px-6">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-4 mb-8">
                            <Lock className="h-8 w-8 text-stone-500" />
                            <h1
                                className="text-3xl md:text-5xl font-bold tracking-tighter uppercase border-l border-white/10 pl-6 leading-none"
                                style={{ fontFamily: 'var(--font-termina)' }}
                            >
                                Reset <span className="opacity-40">Password.</span>
                            </h1>
                        </div>

                        <p className="text-xl text-stone-500 font-medium leading-relaxed mb-12">
                            Create a new secure password for your account.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
                            <div className="space-y-3">
                                <label className="text-xs font-bold tracking-cinematic uppercase text-stone-500 ml-1">New Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-stone-900/50 border border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FDDA0D]/50 focus:ring-1 focus:ring-[#FDDA0D]/20 transition-all pr-14 text-white font-medium"
                                        placeholder="Min. 6 characters"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold tracking-cinematic uppercase text-stone-500 ml-1">Confirm Password</label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full bg-stone-900/50 border border-white/5 px-6 py-4 rounded-2xl focus:outline-none focus:border-[#FDDA0D]/50 focus:ring-1 focus:ring-[#FDDA0D]/20 transition-all text-white font-medium"
                                    placeholder="Repeat new password"
                                    required
                                />
                            </div>

                            {status === "error" && (
                                <div className="flex items-start gap-3 p-5 rounded-2xl bg-rose-500/10 text-rose-500 text-sm font-bold border border-rose-500/20">
                                    <XCircle className="h-5 w-5 shrink-0" />
                                    <span>{message}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="flex items-center justify-center gap-2 w-full bg-white text-black py-5 rounded-full font-bold hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </form>

                        <div className="pt-12 border-t border-white/5 mt-24">
                            <div className="flex flex-wrap gap-x-8 gap-y-4 text-[13px] font-bold tracking-cinematic uppercase text-stone-500">
                                <span>© 2026 SewDigital</span>
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-white transition-colors">Support</a>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-black">
                <Loader2 className="h-10 w-10 animate-spin text-white" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
