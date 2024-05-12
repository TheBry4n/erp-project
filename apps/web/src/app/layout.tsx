import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SideBar } from "../components";
import "./globals.css";

const inter = Inter({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Scarpe",
  description: "Gestionale per azienda di scarpe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" >
      <body className={inter.className} >
        <div className="flex" >
          <SideBar />
          <main className="ml-[300px] flex-1"> 
              {children}
          </main>
        </div>
      </body>
    </html>
  );
}
