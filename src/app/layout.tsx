import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";
import Providers from "@/components/Providers";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IoT PUT MONS EUNICE PROJECT",
  description: "IoT project for PUT & MONS inside the EUNICE alliance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="min-h-lvh">
      <body className={cn(inter.className, "min-h-lvh flex flex-col")}>
        <Nav />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
