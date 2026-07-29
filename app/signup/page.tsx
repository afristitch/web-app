"use client";

import { useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { SectionWrapper } from "@/components/landing/SectionWrapper";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { ArrowRight, Lock, Mail, User, Building2, Phone, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
            </div>
        }>
            <SignUpForm />
        </Suspense>
    );
}

function SignUpForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [userName, setUserName] = useState("");
    const [orgName, setOrgName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [registeredSuccess, setRegisteredSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const payload = {
                organization: {
                    name: orgName.trim(),
                    email: email.trim(),
                    phone: phone.trim(),
                    address: "",
                },
                user: {
                    name: userName.trim(),
                    email: email.trim(),
                    password,
                },
            };

            const res = await api.post("/auth/register", payload);
            
            if (res.success || res.data) {
                // Check if tokens were returned directly for auto-login
                if (res.data?.accessToken) {
                    login(res.data, "/dashboard");
                } else {
                    setRegisteredSuccess(true);
                }
            } else {
                setError(res.message || "Failed to create account. Please check your details.");
            }
        } catch (err: any) {
            console.error("Registration error:", err);
            const msg = err.message || "";
            if (msg.toLowerCase().includes("email")) {
                setError("This email address is already registered. Please sign in instead.");
            } else {
                setError(msg || "Could not register account. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-28 pb-20 flex flex-col justify-center text-white">
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
                            Get Started <span className="text-stone-500">Free</span>
                        </h1>
                        <p className="text-stone-400 text-sm font-medium">
                            Create your tailor shop account in seconds
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-stone-950/80 border border-white/10 backdrop-blur-xl shadow-2xl">
                        {registeredSuccess ? (
                            <div className="text-center space-y-4 py-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 mx-auto">
                                    <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight text-white" style={{ fontFamily: 'var(--font-varela-round)' }}>
                                    Account Created!
                                </h3>
                                <p className="text-xs text-stone-300 font-medium leading-relaxed">
                                    Your tailor studio <strong className="text-white">{orgName}</strong> has been registered. Please check your email (<strong className="text-white">{email}</strong>) to verify your account or proceed to login.
                                </p>
                                <div className="pt-4">
                                    <Link
                                        href="/login"
                                        className="inline-flex w-full items-center justify-center gap-2 py-3.5 bg-white text-black font-bold uppercase text-xs rounded-full hover:bg-stone-200 transition-all cursor-pointer"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        Proceed to Sign In <ArrowRight className="w-4 h-4 text-black" />
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

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-1.5">
                                            Your Full Name
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                            <input
                                                type="text"
                                                required
                                                value={userName}
                                                onChange={(e) => setUserName(e.target.value)}
                                                placeholder="e.g. Kwame Mensah"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-1.5">
                                            Studio / Business Name
                                        </label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                            <input
                                                type="text"
                                                required
                                                value={orgName}
                                                onChange={(e) => setOrgName(e.target.value)}
                                                placeholder="e.g. Master Fit Tailors"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-1.5">
                                            Phone Number
                                        </label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                            <input
                                                type="tel"
                                                required
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="e.g. +233 24 123 4567"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-1.5">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="owner@tailorshop.com"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold tracking-wider text-stone-400 uppercase mb-1.5">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                                            <input
                                                type="password"
                                                required
                                                minLength={6}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                placeholder="At least 6 characters"
                                                className="w-full bg-stone-900/90 border border-white/10 rounded-full py-3 pl-11 pr-5 text-sm text-white placeholder:text-stone-600 focus:outline-none focus:border-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-white text-black font-bold tracking-widest uppercase text-xs rounded-full hover:bg-stone-200 transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none mt-6 cursor-pointer"
                                        style={{ fontFamily: 'var(--font-varela-round)' }}
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Free Account <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </button>
                                </form>

                                <SocialAuthButtons onError={(msg) => setError(msg)} redirectUrl="/dashboard" />
                            </>
                        )}
                    </div>

                    <div className="mt-8 text-center text-xs text-stone-500">
                        Already have an account?{" "}
                        <Link href="/login" className="text-white underline font-bold">
                            Sign In
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    );
}
