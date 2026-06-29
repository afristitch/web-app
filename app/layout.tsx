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
  description: "Empower your tailoring business with SewDigital. Manage measurements, orders, and clients seamlessly in one professional platform.",
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
    description: "Empower your tailoring business with SewDigital. Manage measurements, orders, and clients seamlessly in one professional platform.",
    url: "https://sewdigital.com",
    siteName: "SewDigital",
    images: [
      {
        url: "/tour.png", // Hero image
        width: 1200,
        height: 630,
        alt: "SewDigital Dashboard Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewDigital | Next-generation Tailor Management",
    description: "Empower your tailoring business with SewDigital. Manage measurements, orders, and clients seamlessly in one professional platform.",
    images: ["/tour.png"], // Hero image
    creator: "@sewdigital", // Assuming a handle, safe placeholder
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
