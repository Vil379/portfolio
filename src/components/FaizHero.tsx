"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

export default function FaizHero() {
  const [phase, setPhase] = useState<"idle" | "standing_by" | "complete">(
    "idle",
  );
  const keyBuffer = useRef("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. ดักจับปุ่มลบ (Backspace) เพื่อคืนร่าง
      if (phase === "complete" && e.key === "Backspace") {
        triggerDeformation();
        return;
      }

      if (phase !== "idle") return;

      if (e.key === "Enter") {
        if (keyBuffer.current.endsWith("555")) {
          triggerHenshin();
        }
        keyBuffer.current = "";
      } else if (e.key.length === 1) {
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
    const standingByAudio = new Audio("/sounds/standing_by.mp3");
    standingByAudio.volume = 0.5;
    standingByAudio.play();

    setTimeout(() => {
      setPhase("complete");
      const completeAudio = new Audio("/sounds/complete.mp3");
      completeAudio.volume = 0.5;
      completeAudio.play();
    }, 5830);
  };

  // ฟังก์ชันใหม่: คืนร่างเดิม
  const triggerDeformation = () => {
    // 1. เล่นเสียงปลดล็อก/คืนร่าง
    const deformationAudio = new Audio("/sounds/deformation.mp3");
    deformationAudio.volume = 0.5;
    deformationAudio.play();

    // 2. ปรับสถานะกลับเป็นโหมดปกติ
    setPhase("idle");
    window.dispatchEvent(new Event("faiz-revert"));
  };

  useEffect(() => {
    if (phase === "complete") {
      window.dispatchEvent(new Event("faiz-transform"));
    }
  }, [phase]);

  const isTransformed = phase === "complete";

  return (
    <section className="relative mb-24 max-w-4xl mx-auto mt-10 md:mt-20 z-10 p-6 transition-colors duration-1000">
      {/* เพิ่มคำแนะนำปุ่มลบ ให้ลูกค้าเห็นลางๆ ตอนแปลงร่างแล้ว */}
      {isTransformed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="fixed bottom-4 right-6 text-xs font-mono text-red-900/50 hover:text-red-500 transition-colors z-50 cursor-default"
        >
          [ PRESS 'BACKSPACE' TO CANCEL ]
        </motion.div>
      )}

      {phase === "idle" && (
        <div className="fixed bottom-4 right-6 text-xs font-mono text-gray-400/50 hover:text-gray-400 transition-colors z-50">
          [ SYS_READY: input_code 555 Enter &crarr; ]
        </div>
      )}

      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }} // 👈 เพิ่มการเฟดออกตอนคืนร่าง
            className="fixed inset-0 z-[-1] bg-neutral-950"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100vh" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }} // 👈 ให้เส้นแสงหายไปตอนคืนร่าง
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-0 w-1 md:w-2 -ml-0.5 md:-ml-1 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-[40%] left-0 h-1 md:h-2 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
            />
          </motion.div>
        )}
      </AnimatePresence>

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

        {/* --- ปุ่มปกติ (โชว์และซ่อนพร้อมเอฟเฟกต์) --- */}
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Button href="/projects" size="lg">
                ดูผลงานของผม
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                ติดต่องาน
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

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

        <AnimatePresence mode="wait">
          {phase === "complete" && (
            <motion.div
              key="complete-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
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
        </AnimatePresence>
      </div>
    </section>
  );
}
