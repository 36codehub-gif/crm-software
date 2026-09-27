import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "36CodeHub CRM",
  description: "Professional SaaS CRM by 36CodeHub"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
