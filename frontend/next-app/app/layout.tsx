import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InsightPilot AI — Enterprise Decision Intelligence",
  description:
    "Grounded decision-intelligence platform connecting anomaly detection, root cause diagnosis, verified evidence, prescriptive levers, and what-if simulation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-on-surface antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
