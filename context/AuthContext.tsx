"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export interface User {
    id?: string;
    _id?: string;
    name: string;
    email: string;
    phone?: string;
    photoUrl?: string;
}

export interface Organization {
    id?: string;
    _id?: string;
    name: string;
    logoUrl?: string;
}

export interface Membership {
    _id: string;
    organizationId: string;
    userId: string;
    role: "ORG_ADMIN" | "STAFF";
    status: string;
    organization?: Organization;
}

interface AuthContextType {
    user: User | null;
    memberships: Membership[];
    activeWorkspace: Organization | null;
    activeRole: "ORG_ADMIN" | "STAFF" | null;
    loading: boolean;
    login: (data: { user: User; accessToken: string; refreshToken: string; memberships: Membership[], organization?: Organization }, redirectUrl?: string) => void;
    logout: () => void;
    switchWorkspace: (organizationId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [activeWorkspace, setActiveWorkspace] = useState<Organization | null>(null);
    const [activeRole, setActiveRole] = useState<"ORG_ADMIN" | "STAFF" | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = localStorage.getItem("user");
            const storedMemberships = localStorage.getItem("memberships");
            const storedWorkspace = localStorage.getItem("activeWorkspace");
            const token = localStorage.getItem("accessToken");

            if (token) {
                if (storedUser && storedUser !== "undefined") {
                    try { setUser(JSON.parse(storedUser)); } catch (e) { }
                }

                if (storedMemberships && storedMemberships !== "undefined") {
                    try { setMemberships(JSON.parse(storedMemberships)); } catch (e) { }
                }

                if (storedWorkspace && storedWorkspace !== "undefined") {
                    try { 
                        const workspace = JSON.parse(storedWorkspace);
                        setActiveWorkspace(workspace);
                        // Find role for this workspace
                        const storedMems = storedMemberships ? JSON.parse(storedMemberships) : [];
                        const activeMem = storedMems.find((m: Membership) => m.organizationId === (workspace._id || workspace.id));
                        if (activeMem) setActiveRole(activeMem.role);
                    } catch (e) { }
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (data: { user: User; accessToken: string; refreshToken: string; memberships: Membership[], organization?: Organization }, redirectUrl: string = "/dashboard") => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Handle legacy or single-tenant response fallback
        const userMemberships = data.memberships || (data.organization ? [{
            _id: "legacy",
            organizationId: data.organization._id || data.organization.id || "",
            userId: data.user._id || data.user.id || "",
            role: (data.user as any).role || "ORG_ADMIN",
            status: "active",
            organization: data.organization
        }] : []);
        
        localStorage.setItem("memberships", JSON.stringify(userMemberships));
        setUser(data.user);
        setMemberships(userMemberships);

        // Auto-select first workspace
        if (userMemberships.length > 0) {
            const firstWorkspace = userMemberships[0].organization;
            if (firstWorkspace) {
                localStorage.setItem("activeWorkspace", JSON.stringify(firstWorkspace));
                setActiveWorkspace(firstWorkspace);
                setActiveRole(userMemberships[0].role);
            }
        }

        router.push(redirectUrl);
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
        setMemberships([]);
        setActiveWorkspace(null);
        setActiveRole(null);
        router.push("/login");
    };

    const switchWorkspace = (organizationId: string) => {
        const membership = memberships.find(m => m.organizationId === organizationId || m.organization?._id === organizationId);
        if (membership && membership.organization) {
            localStorage.setItem("activeWorkspace", JSON.stringify(membership.organization));
            setActiveWorkspace(membership.organization);
            setActiveRole(membership.role);
            // Optionally, we could reload the page or trigger a data refetch here
            window.location.href = "/dashboard";
        }
    };

    return (
        <AuthContext.Provider value={{ user, memberships, activeWorkspace, activeRole, loading, login, logout, switchWorkspace }}>
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
