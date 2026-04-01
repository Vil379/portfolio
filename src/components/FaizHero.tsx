"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

export default function FaizHero() {
  const [phase, setPhase] = useState<"idle" | "standing_by" | "complete">(
    "idle",
  );
  const keyBuffer = useRef(""); // ใช้เก็บประวัติการพิมพ์โดยไม่ทำให้เว็บกระตุก

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ถ้าแปลงร่างไปแล้ว หรือกำลังแปลงร่าง ไม่ต้องดักจับคีย์บอร์ดอีก
      if (phase !== "idle") return;

      if (e.key === "Enter") {
        // เช็คว่าก่อนกด Enter มีการพิมพ์ 555 ติดกันหรือไม่
        if (keyBuffer.current.endsWith("555")) {
          triggerHenshin();
        }
        keyBuffer.current = ""; // เคลียร์ค่าทิ้งเมื่อกด Enter
      } else if (e.key.length === 1) {
        // เก็บประวัติการพิมพ์ไว้ (จำกัดแค่ 10 ตัวอักษรล่าสุด)
        keyBuffer.current += e.key;
        if (keyBuffer.current.length > 10) {
          keyBuffer.current = keyBuffer.current.slice(-10);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  const triggerHenshin = () => {
    setPhase("standing_by");

    // 1. เล่นเสียง Standing By (ผ่านเงื่อนไขเพราะเกิดจากการกดคีย์บอร์ด)
    const standingByAudio = new Audio("/sounds/standing_by.mp3");
    standingByAudio.volume = 0.5;
    standingByAudio.play();

    // 2. หน่วงเวลา 2.5 วินาที แล้วเข้าสู่โหมด Complete
    setTimeout(() => {
      setPhase("complete");
      const completeAudio = new Audio("/sounds/complete.mp3");
      completeAudio.volume = 0.5;
      completeAudio.play();
    }, 5810);
  };

  const isTransformed = phase === "complete";

  return (
    <section className="relative mb-24 max-w-4xl mx-auto mt-10 md:mt-20 z-10 p-6 transition-colors duration-1000">
      {/* --- ส่วนคำแนะนำมุมขวาล่าง (Easter Egg Hint) --- */}
      {phase === "idle" && (
        <div className="fixed bottom-4 right-6 text-xs font-mono text-gray-400/50 hover:text-gray-400 transition-colors z-50">
          [ SYS_READY: input_code &crarr; ]
        </div>
      )}

      {/* --- ส่วน Background สีมืด และ เส้นแสง Photon Blood --- */}
      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[-1] bg-neutral-950"
          >
            {/* เส้นแสงหลัก (วิ่งจากบนลงล่าง) */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100vh" }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-0 w-1 md:w-2 -ml-[2px] md:-ml-1 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
            />
            {/* เส้นแสงรอง (แตกแขนงแนวนอน) */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[40%] left-0 h-1 md:h-2 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- ส่วนเนื้อหา Hero --- */}
      <div
        className={`transition-colors duration-1000 relative z-10 ${isTransformed ? "text-white" : "text-gray-900"}`}
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          สวัสดีครับ ผม Vil 👋
        </h1>
        <h2
          className={`text-2xl md:text-4xl font-semibold tracking-tight mb-8 transition-colors duration-1000 ${isTransformed ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "text-blue-600"}`}
        >
          Freelance Web Developer
        </h2>
        <p
          className={`text-lg md:text-xl max-w-2xl leading-relaxed mb-10 transition-colors duration-1000 ${isTransformed ? "text-gray-300" : "text-gray-600"}`}
        >
          ผมรับออกแบบและพัฒนาเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ตั้งแต่หน้าเว็บ
          Portfolio ไปจนถึงระบบแพลตฟอร์มที่ซับซ้อน มุ่งเน้นประสิทธิภาพ
          ความรวดเร็ว และมอบประสบการณ์ที่ดีที่สุดให้กับผู้ใช้งาน
        </p>

        {/* --- ปุ่มปกติ (ซ่อนตอนกำลังโหลดเสียง) --- */}
        {phase === "idle" && (
          <div className="flex flex-wrap gap-4 mt-8">
            <Button href="/projects" size="lg">
              ดูผลงานของผม
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              ติดต่องาน
            </Button>
          </div>
        )}

        {/* --- โชว์สถานะตอนกดรหัสถูก --- */}
        {phase === "standing_by" && (
          <div className="mt-12 h-14 flex items-center">
            <motion.p
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-2xl font-mono font-bold text-red-600 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            >
              [ Standing By... ]
            </motion.p>
          </div>
        )}

        {/* --- ปุ่มลัด (โผล่มาหลังแปลงร่างเสร็จ) --- */}
        {phase === "complete" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <Button
              href="/projects"
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border-none"
            >
              ดูผลงานทั้งหมด (System Overrided)
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
