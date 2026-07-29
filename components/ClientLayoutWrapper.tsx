"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

import { GoogleOAuthProvider } from "@react-oauth/google";

const DASHBOARD_ROUTES = [
  "/dashboard",
  "/clients",
  "/orders",
  "/measurements",
  "/finances",
  "/business",
  "/settings",
  "/notifications",
  "/team",
  "/subscription",
];

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = DASHBOARD_ROUTES.some(
    (route) => pathname === route || pathname?.startsWith(`${route}/`) || pathname?.startsWith(route)
  );

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <AuthProvider>
        {!isDashboardRoute && <Navbar />}
        {children}
        {!isDashboardRoute && <Footer />}
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}
