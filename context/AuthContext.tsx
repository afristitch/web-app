"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    role: "ORG_ADMIN" | "STAFF";
    photoUrl?: string;
}

interface Organization {
    id?: string;
    _id?: string;
    name: string;
    logoUrl?: string;
}

interface AuthContextType {
    user: User | null;
    organization: Organization | null;
    loading: boolean;
    login: (data: { user: User; accessToken: string; refreshToken: string; organization: Organization }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = localStorage.getItem("user");
            const storedOrg = localStorage.getItem("organization");
            const token = localStorage.getItem("accessToken");

            console.log("[Auth] Initializing. Token found:", !!token);

            if (token) {
                if (storedUser && storedUser !== "undefined") {
                    try {
                        const parsedUser = JSON.parse(storedUser);
                        setUser(parsedUser);
                        console.log("[Auth] User restored:", parsedUser.email);
                    } catch (e) {
                        console.error("Failed to parse stored user data", e);
                    }
                }

                if (storedOrg && storedOrg !== "undefined") {
                    try {
                        const parsedOrg = JSON.parse(storedOrg);
                        setOrganization(parsedOrg);
                        console.log("[Auth] Organization restored:", parsedOrg.name);
                    } catch (e) {
                        console.error("Failed to parse stored organization data", e);
                    }
                }
            } else {
                console.warn("[Auth] No token found in localStorage");
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (data: { user: User; accessToken: string; refreshToken: string; organization: Organization }) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("organization", JSON.stringify(data.organization));
        setUser(data.user);
        setOrganization(data.organization);
        router.push("/dashboard");
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setOrganization(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, organization, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
