import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Stories",
  description: "Read how tailors and fashion businesses are transforming their operations and growing their revenue with SewDigital.",
  openGraph: {
    title: "Customer Stories | SewDigital",
    description: "Read how tailors are transforming their operations with SewDigital.",
  },
};

export default function StoriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
