// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar"; // Import Navbar

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vil | Professional Web Developer Freelance",
  description: "ผู้เชี่ยวชาญการพัฒนา Next.js, React และ Web Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Navbar /> {/* ใส่ Navbar ตรงนี้ */}
        <div className="pt-24 min-h-screen">
          {" "}
          {/* เว้นที่ให้ Navbar fixed */}
          {children}
        </div>
      </body>
    </html>
  );
}
