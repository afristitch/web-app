import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Explore our flexible pricing plans designed for tailors of all sizes. Find the right fit for your tailoring business.",
  openGraph: {
    title: "Pricing | SewDigital",
    description: "Flexible pricing for solo artisans to high-volume workshops.",
  },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
