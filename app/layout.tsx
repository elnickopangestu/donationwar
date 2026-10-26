import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DonationProvider } from "@/lib/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donation War 2026 — Siapa Paling Dermawan?",
  description: "Kompetisi donasi antar komunitas. Pilih tim, donasi, dan menangkan perang kebaikan!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <DonationProvider>{children}</DonationProvider>
      </body>
    </html>
  );
}
