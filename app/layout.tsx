import type { Metadata } from "next";
import { DM_Sans, Inter, Plus_Jakarta_Sans, Varela_Round } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-varela-round",
});

const varelaRound = Varela_Round({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-varela-round",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sewdigital.com"),
  title: {
    default: "SewDigital | Next-generation Tailor Management Software",
    template: "%s | SewDigital",
  },
  description: "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
  keywords: ["tailor software", "tailoring management", "measurement app", "fashion tech", "SewDigital", "tailor POS"],
  authors: [{ name: "SewDigital" }],
  creator: "SewDigital",
  publisher: "SewDigital",
  icons: {
    icon: "/stitchlogo.png",
    apple: "/stitchlogo.png",
  },
  openGraph: {
    title: "SewDigital | Next-generation Tailor Management",
    description: "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
    url: "https://sewdigital.com",
    siteName: "SewDigital",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewDigital | Next-generation Tailor Management",
    description: "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
    creator: "@sewdigital",
  },
  alternates: {
    canonical: "https://sewdigital.com",
  },
};

import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${plusJakarta.variable} ${varelaRound.variable} antialiased font-inter bg-black text-white selection:bg-accent selection:text-black`}>
        <div className="grain-overlay" />
        <SmoothScroll>
          <Navbar />
          <AuthProvider>
            {children}
          </AuthProvider>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
