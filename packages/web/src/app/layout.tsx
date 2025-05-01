import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HighWater Protocol",
  description: "Digital Asset Intelligence for Wealth Advisors",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link href="/insights" className="text-gray-700 hover:text-gray-900">
              Insights
            </Link>
            {/* add Portfolio / Compliance / Settings here later */}
          </nav>
        </header>

        <main className="pt-6">{children}</main>
      </body>
    </html>
  )
}
