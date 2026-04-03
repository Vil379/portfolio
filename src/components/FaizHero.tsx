"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";

// ฟังก์ชันตัวช่วยสำหรับเล่นเสียง (เอาไว้ข้างนอก Component เพื่อไม่ให้โหลดใหม่ซ้ำๆ)
const playSound = (soundPath: string, volume: number = 0.4) => {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  // ใช้ catch เพื่อป้องกัน Error ในเบราว์เซอร์บางตัวที่บล็อกเสียง
  audio.play().catch((err) => console.log("Audio play blocked:", err));
};

export default function FaizHero() {
  const [phase, setPhase] = useState<"idle" | "standing_by" | "complete">(
    "idle",
  );
  const [displayCode, setDisplayCode] = useState("");
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);

  // ฟังก์ชันเปิด/ปิดแป้นพิมพ์ พร้อมเสียง
  const toggleKeypad = () => {
    playSound("/sounds/open.mp3", 0.5); // 👈 เล่นเสียงเปิดจอ
    setIsKeypadOpen(!isKeypadOpen);
  };

  const handleVirtualKey = (key: string) => {
    if (phase === "complete" && (key === "Backspace" || key === "Cancel")) {
      triggerDeformation();
      return;
    }

    if (phase !== "idle") return;

    // 👈 เล่นเสียงปิ๊บ ทุกครั้งที่มีการกดปุ่ม (ยกเว้นกดรหัสถูกแล้วเดี๋ยวเสียงมันจะตีกับ Standing By)
    if (key !== "Enter" || !displayCode.endsWith("555")) {
      playSound("/sounds/beep.mp3", 0.3);
    }

    if (key === "Enter") {
      if (displayCode.endsWith("555")) {
        triggerHenshin();
        setIsKeypadOpen(false);
      } else {
        setDisplayCode("");
      }
    } else if (key === "Backspace") {
      setDisplayCode((prev) => prev.slice(0, -1));
    } else if (/^[0-9]$/.test(key)) {
      setDisplayCode((prev) => (prev + key).slice(-10));
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      handleVirtualKey(e.key);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, displayCode]);

  const triggerHenshin = () => {
    setPhase("standing_by");
    playSound("/sounds/standing_by.mp3", 0.6); // 👈 ปรับการเรียกใช้เสียง

    setTimeout(() => {
      setPhase("complete");
      playSound("/sounds/complete.mp3", 0.6); // 👈 ปรับการเรียกใช้เสียง
    }, 3200);
  };

  const triggerDeformation = () => {
    playSound("/sounds/deformation.mp3", 0.6); // 👈 ปรับการเรียกใช้เสียง

    setPhase("idle");
    setDisplayCode("");
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
      {/* --- ส่วน Background สีมืด และ เส้นแสง Photon Blood --- */}
      <AnimatePresence>
        {isTransformed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="fixed inset-0 z-[-1] bg-neutral-950"
          >
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100vh" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute left-1/2 top-0 w-1 md:w-2 -0.5 md:-ml-1 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
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

      {/* --- ส่วนเนื้อหาหลัก --- */}
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

        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div
              key="idle-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-wrap gap-4 mt-8">
                <Button href="/projects" size="lg">
                  ดูผลงานของผม
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  ติดต่องาน
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === "standing_by" && (
          <div className="mt-12 h-14 flex items-center">
            <motion.p
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-2xl md:text-3xl font-mono font-bold text-red-600 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
            >
              [ Standing By... ]
            </motion.p>
          </div>
        )}

        <AnimatePresence mode="wait">
          {phase === "complete" && (
            <motion.div
              key="complete-ui"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-col gap-6 mt-12"
            >
              <div className="flex flex-wrap gap-4">
                <Button
                  href="/projects"
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border-none"
                >
                  ดูผลงานทั้งหมด (System Overrided)
                </Button>
              </div>
              <button
                onClick={() => handleVirtualKey("Cancel")}
                className="w-fit text-sm font-mono text-red-500 hover:text-white border border-red-900/50 hover:bg-red-600/20 px-4 py-2 rounded-lg transition-colors"
              >
                [ DISCONNECT ]
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ---------------- แป้นพิมพ์ลอยตัว (Floating Keypad) มุมขวาล่าง ---------------- */}
      {phase === "idle" && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
          <AnimatePresence>
            {isKeypadOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 bg-white/95 backdrop-blur-md border border-gray-200 p-4 rounded-3xl shadow-2xl w-65 md:w-70"
              >
                <div className="flex justify-between items-center mb-3 px-1">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Smart Brain Faiz 555
                  </p>
                  <button
                    onClick={toggleKeypad} // 👈 ใช้ฟังก์ชัน toggleKeypad แทน
                    className="text-gray-400 hover:text-red-500 font-bold w-6 h-6 flex items-center justify-center rounded-full bg-gray-100 hover:bg-red-50 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-gray-900 rounded-xl p-3 mb-4 h-14 flex items-center justify-center overflow-hidden shadow-inner">
                  <span className="text-red-500 font-mono text-2xl tracking-[0.3em] font-bold">
                    {displayCode ? (
                      displayCode
                    ) : (
                      <span className="text-gray-700">_ _ _</span>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleVirtualKey(num.toString())}
                      className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 text-lg font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    onClick={() => handleVirtualKey("Backspace")}
                    className="bg-red-50 hover:bg-red-100 active:bg-red-200 text-red-600 text-sm font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    DEL
                  </button>
                  <button
                    onClick={() => handleVirtualKey("0")}
                    className="bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-gray-800 text-lg font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleVirtualKey("Enter")}
                    className="bg-gray-900 hover:bg-black active:scale-95 text-white text-sm font-bold py-2.5 rounded-xl transition-transform shadow-sm"
                  >
                    ENT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ปุ่มเปิด/ปิด แบบข้อความลับๆ */}
          <button
            onClick={toggleKeypad} // 👈 ใช้ฟังก์ชัน toggleKeypad แทน
            className={`text-xs font-mono font-semibold transition-colors px-3 py-1.5 rounded-full border border-transparent hover:border-gray-200 hover:bg-white/50 ${
              isKeypadOpen
                ? "text-red-500"
                : "text-gray-400/60 hover:text-gray-600"
            }`}
          >
            {isKeypadOpen ? "[ CLOSE_SYS ]" : "[ SYS_READY 555 ENTER]"}
          </button>
        </div>
      )}
    </section>
  );
}
