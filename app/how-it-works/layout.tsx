import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works",
  description: "Discover how SewDigital simplifies your tailoring workflow. From measurements to final delivery, we streamline every step of your process.",
  openGraph: {
    title: "How It Works | SewDigital",
    description: "Discover how SewDigital simplifies your tailoring workflow.",
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
