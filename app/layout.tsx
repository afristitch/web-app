import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SewDigital",
  description: "Next-generation tailor management",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
