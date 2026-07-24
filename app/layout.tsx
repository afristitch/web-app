import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Varela_Round } from "next/font/google";
import "./globals.css";
import { ClientLayoutWrapper } from "@/components/ClientLayoutWrapper";

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
  metadataBase: new URL("https://www.sewdigital.app"),
  title: {
    default: "SewDigital | Next-generation Tailor Management Software",
    template: "%s | SewDigital",
  },
  description:
    "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
  keywords: [
    "tailor software",
    "tailoring management",
    "measurement app",
    "fashion tech",
    "SewDigital",
    "tailor POS",
  ],
  authors: [{ name: "SewDigital" }],
  creator: "SewDigital",
  publisher: "SewDigital",
  icons: {
    icon: "/stitchlogo.png",
    apple: "/stitchlogo.png",
  },
  openGraph: {
    title: "SewDigital | Next-generation Tailor Management Software",
    description: "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
    url: "https://www.sewdigital.app",
    siteName: "SewDigital",
    images: [
      {
        url: "/home-screen.png",
        width: 1200,
        height: 630,
        alt: "SewDigital - Tailor Management Software",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SewDigital | Next-generation Tailor Management Software",
    description: "Stop running your tailoring business from a chaotic notebook. SewDigital keeps your clients, measurements, and orders perfectly organized in one place.",
    images: ["/home-screen.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-black text-white">
      <body
        className={`${inter.variable} ${plusJakarta.variable} ${varelaRound.variable} antialiased font-inter bg-black text-white selection:bg-white selection:text-black`}
      >
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
