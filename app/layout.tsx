import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const termina = localFont({
  src: [
    {
      path: "../public/fonts/TerminaTest-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/TerminaTest-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/TerminaTest-Heavy.otf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-termina",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SewDigital",
  description: "Next-generation tailor management",
  icons: {
    icon: "/stitchlogo.png",
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${termina.variable} antialiased font-sans bg-black text-white selection:bg-accent selection:text-black`}>
        <div className="grain-overlay" />
        <Navbar />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
