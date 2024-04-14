import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@web/src/lib/utils"
import "./globals.css";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Scarpe",
  description: "Gestionale per aziuenda di scarpe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}>{children}</body>
    </html>
  );
}
