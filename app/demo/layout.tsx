import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "Schedule a personalized demo of SewDigital to see how our tailor management software can revolutionize your workflow.",
  openGraph: {
    title: "Book a Demo | SewDigital",
    description: "Schedule a personalized demo to see how SewDigital can revolutionize your workflow.",
  },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
