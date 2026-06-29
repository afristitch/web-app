import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support & Contact",
  description: "Get help with SewDigital. Reach out to our support team for any questions or assistance with your tailor management platform.",
  openGraph: {
    title: "Support | SewDigital",
    description: "Reach out to our support team for any questions or assistance.",
  },
};

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
