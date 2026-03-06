"use client";

import { Suspense, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

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
            <div className="flex min-h-screen flex-col items-center pt-24 px-6 bg-white text-center">
                <XCircle className="h-12 w-12 text-rose-500 mb-4" />
                <h1 className="text-2xl font-bold text-slate-900 mb-2">Invalid Reset Link</h1>
                <p className="text-slate-600 mb-8">The password reset token is missing or invalid.</p>
                <button
                    onClick={() => router.push("/")}
                    className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                    Return to home
                </button>
            </div>
        );
    }

    if (status === "success") {
        return (
            <div className="flex min-h-screen flex-col items-center pt-24 px-6 bg-white">
                <div className="w-full max-w-lg text-left">
                    <div className="mb-12">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">SewDigital</h1>
                        <p className="text-slate-500 font-medium text-sm">Sewing the new way</p>
                    </div>

                    <div className="flex items-center gap-4 mb-8">
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                        <h2 className="text-xl font-bold tracking-tight text-slate-900 border-l border-slate-200 pl-4">
                            Reset successful
                        </h2>
                    </div>

                    <p className="text-slate-600 leading-relaxed max-w-md mb-12">
                        {message}
                    </p>

                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center justify-center gap-2 w-full max-w-md bg-slate-900 text-white py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all shadow-sm"
                    >
                        Go to login
                        <ArrowRight className="h-4 w-4" />
                    </button>

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

    return (
        <div className="flex min-h-screen flex-col items-center pt-24 px-6 bg-white">
            <div className="w-full max-w-lg text-left">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">SewDigital</h1>
                    <p className="text-slate-500 font-medium text-sm">Sewing the new way</p>
                </div>

                <div className="flex items-center gap-4 mb-8">
                    <Lock className="h-6 w-6 text-slate-400" />
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 border-l border-slate-200 pl-4">
                        Reset password
                    </h2>
                </div>

                <p className="text-slate-600 leading-relaxed max-w-md mb-8">
                    Create a new secure password for your account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">New Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all pr-12 font-medium"
                                placeholder="Min. 6 characters"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Confirm Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-100 px-4 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                            placeholder="Repeat new password"
                            required
                        />
                    </div>

                    {status === "error" && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-rose-50 text-rose-600 text-sm font-medium border border-rose-100">
                            <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
                            <span>{message}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={status === "loading"}
                        className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3.5 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        {status === "loading" ? (
                            <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                            "Reset password"
                        )}
                    </button>
                </form>

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

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="flex min-h-screen items-center justify-center bg-white">
                <Loader2 className="h-10 w-10 animate-spin text-slate-900" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
