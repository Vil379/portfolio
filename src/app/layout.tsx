// src/app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import "./globals.css";

// 👇 1. Import Vercel Analytics และ Speed Insights
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Vil.dev | Freelance Web Developer",
  description:
    "รับออกแบบและพัฒนาเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ตั้งแต่หน้าเว็บ Portfolio ไปจนถึงระบบแพลตฟอร์มที่ซับซ้อน มุ่งเน้นประสิทธิภาพและประสบการณ์ที่ดีที่สุด",
  keywords: [
    "Web Developer",
    "Freelance",
    "รับทำเว็บไซต์",
    "Next.js",
    "React",
    "สร้างเว็บพอร์ตโฟลิโอ",
    "เชียงใหม่",
  ],
  metadataBase: new URL("https://vil.azeinx.com"),
  openGraph: {
    title: "Vil.dev | Freelance Web Developer",
    description:
      "รับออกแบบและพัฒนาเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณด้วยเทคโนโลยีระดับโลก",
    url: "https://vil.azeinx.com",
    siteName: "Vil.dev Portfolio",
    locale: "th_TH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />

        {/* 👇 2. นำ Component มาวางไว้ล่างสุดของ body */}
        <Analytics />
      </body>
    </html>
  );
}
