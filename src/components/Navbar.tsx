// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 👈 1. Import usePathname เข้ามา
import Button from "./ui/Button";

const Navbar = () => {
  const [isFaizMode, setIsFaizMode] = useState(false);
  const pathname = usePathname(); // 👈 2. ดึงค่า URL หน้าปัจจุบันมาเก็บไว้

  // 3. เพิ่ม useEffect ตัวนี้ เพื่อรีเซ็ตสี Navbar ทุกครั้งที่เปลี่ยนหน้า
  useEffect(() => {
    setIsFaizMode(false);
  }, [pathname]);

  // (ส่วนฟังเสียงตะโกนจากหน้า Hero ยังคงเหมือนเดิม)
  useEffect(() => {
    const handleTransform = () => setIsFaizMode(true);
    const handleRevert = () => setIsFaizMode(false);

    window.addEventListener("faiz-transform", handleTransform);
    window.addEventListener("faiz-revert", handleRevert);

    return () => {
      window.removeEventListener("faiz-transform", handleTransform);
      window.removeEventListener("faiz-revert", handleRevert);
    };
  }, []);

  const navLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "ผลงาน", href: "/projects" },
    { name: "บริการ", href: "/services" },
    { name: "ติดต่อ", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full backdrop-blur-md z-50 border-b transition-colors duration-1000 ${
        isFaizMode
          ? "bg-neutral-950/80 border-red-900/50 shadow-[0_0_15px_rgba(255,0,0,0.1)]"
          : "bg-white/80 border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-bold tracking-tighter hover:opacity-80 transition-colors duration-1000 ${
            isFaizMode ? "text-white" : "text-gray-900"
          }`}
        >
          Vil.dev
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-500 ${
                isFaizMode
                  ? "text-gray-300 hover:text-red-500"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button
            href="/contact"
            size="sm"
            className={`transition-all duration-1000 ${isFaizMode ? "bg-red-600 hover:bg-red-700 text-white shadow-[0_0_10px_rgba(239,68,68,0.5)] border-none" : ""}`}
          >
            คุยงาน
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
