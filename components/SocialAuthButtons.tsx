"use client";

import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { api } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

interface SocialAuthButtonsProps {
    onError: (error: string) => void;
    redirectUrl?: string;
}

export function SocialAuthButtons({ onError, redirectUrl = "/dashboard" }: SocialAuthButtonsProps) {
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleGoogleSuccess = async (credentialResponse: any) => {
        const idToken = credentialResponse.credential;
        if (!idToken) {
            onError("Google Sign-In failed: No ID token received");
            return;
        }

        try {
            setLoading(true);
            const res = await api.post("/auth/google", { idToken });
            
            if (res.success && res.data) {
                login(res.data, redirectUrl);
            } else {
                onError(res.message || "Failed to log in with Google.");
            }
        } catch (err: any) {
            console.error("Google login error:", err);
            onError(err.message || "Network connection issue during Google login.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full mt-6">
            <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px bg-white/10 flex-1"></div>
                <span className="text-stone-500 text-xs font-bold tracking-wider uppercase">Or continue with</span>
                <div className="h-px bg-white/10 flex-1"></div>
            </div>

            <div className="flex justify-center relative">
                {loading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-950/80 rounded-lg">
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                    </div>
                )}
                
                <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                        onError("Google Sign-In failed.");
                    }}
                    theme="filled_black"
                    size="large"
                    shape="pill"
                    text="continue_with"
                />
            </div>
        </div>
    );
}
