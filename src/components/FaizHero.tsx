"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./ui/Button";
import Image from "next/image";

const playSound = (soundPath: string, volume: number = 0.4) => {
  const audio = new Audio(soundPath);
  audio.volume = volume;
  audio.play().catch((err) => console.log("Audio play blocked:", err));
};

export default function FaizHero() {
  const [phase, setPhase] = useState<"idle" | "standing_by" | "complete">(
    "idle",
  );
  const [displayCode, setDisplayCode] = useState("");
  const [isKeypadOpen, setIsKeypadOpen] = useState(false);

  const toggleKeypad = () => {
    playSound("/sounds/open.mp3", 0.5);
    setIsKeypadOpen(!isKeypadOpen);
  };

  const handleVirtualKey = (key: string) => {
    if (phase === "complete" && (key === "Backspace" || key === "Cancel")) {
      triggerDeformation();
      return;
    }
    if (phase !== "idle") return;
    if (/^[0-9]$/.test(key)) {
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
    // 👇 คำใบ้ลับสำหรับ Developer ที่ชอบเปิด Console ดู
    console.log(
      "%c[SMART BRAIN OS]%c Awaiting Input... Try code: 5-5-5 🏍️",
      "color: red; font-weight: bold; font-size: 14px;",
      "color: gray; font-size: 12px;",
    );
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
    playSound("/sounds/standing_by.mp3", 0.6);
    setTimeout(() => {
      setPhase("complete");
      playSound("/sounds/complete.mp3", 0.6);
    }, 3000);
  };

  const triggerDeformation = () => {
    playSound("/sounds/deformation.mp3", 0.6);
    setPhase("idle");
    setDisplayCode("");
    window.dispatchEvent(new Event("faiz-revert"));
    // 👇 ปิดโหมด Faiz Theme ทั้งเว็บ
    document.body.classList.remove("faiz-mode");
  };

  useEffect(() => {
    if (phase === "complete") {
      window.dispatchEvent(new Event("faiz-transform"));
      // 👇 เปิดโหมด Faiz Theme ทั้งเว็บ
      document.body.classList.add("faiz-mode");
    }
  }, [phase]);

  // 👇 เพิ่ม useEffect ตัวนี้เพื่อความปลอดภัย (เคลียร์สีทิ้งเผื่อลูกค้ากดเปลี่ยนหน้า)
  useEffect(() => {
    return () => {
      document.body.classList.remove("faiz-mode");
    };
  }, []);

  const isTransformed = phase === "complete";

  return (
    <section className="relative min-h-[70vh] flex items-center max-w-5xl mx-auto pb-32 md:pb-40 px-6 transition-colors duration-1000 z-10">
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
              className="absolute left-6 md:left-1/2 top-0 w-1 md:w-1.5 -ml-0.5 md:-ml-0.75 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)]"
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100vw" }}
              exit={{ opacity: 0, transition: { duration: 0.5 } }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              className="absolute top-16 left-0 h-1 md:h-1.5 bg-red-500 shadow-[0_0_20px_8px_rgba(255,0,0,0.8)] z-0"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`transition-colors duration-1000 w-full relative z-10 ${isTransformed ? "text-white" : "text-foreground"}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
          <div className="flex flex-col justify-center order-2 md:order-1 pl-10 md:pl-0 pr-0 md:pr-12 lg:pr-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 tracking-tight">
              สวัสดีครับ ผม Vil
            </h1>
            <h2
              className={`text-xl md:text-2xl lg:text-3xl font-medium tracking-tight mb-6 md:mb-8 transition-colors duration-1000 ${isTransformed ? "text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" : "text-text-muted"}`}
            >
              Freelance Web Developer
            </h2>
            <p
              className={`text-base md:text-lg max-w-lg leading-relaxed mb-8 md:mb-10 transition-colors duration-1000 ${isTransformed ? "text-gray-300" : "text-text-muted"}`}
            >
              ผมรับออกแบบและพัฒนาเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ตั้งแต่หน้าเว็บ
              Portfolio ไปจนถึงระบบแพลตฟอร์มที่ซับซ้อน มุ่งเน้นประสิทธิภาพ
              ความรวดเร็ว และมอบประสบการณ์ที่ดีที่สุดให้กับผู้ใช้งาน
            </p>
            <div className="min-h-20">
              <AnimatePresence mode="wait">
                {phase === "idle" && (
                  <motion.div
                    key="idle-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Button href="/projects" size="md">
                      ดูผลงานของผม
                    </Button>
                    <Button href="/contact" variant="outline" size="md">
                      ติดต่องาน
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
              {phase === "standing_by" && (
                <div className="h-full flex items-center">
                  <motion.p
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="text-xl md:text-2xl font-mono font-bold text-red-600 tracking-widest uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
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
                    className="flex flex-col gap-4"
                  >
                    <div className="flex flex-wrap gap-4">
                      <Button
                        href="/projects"
                        size="md"
                        className="bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] border-none"
                      >
                        ดูผลงานทั้งหมด (System Overrided)
                      </Button>
                    </div>
                    <button
                      onClick={() => handleVirtualKey("Cancel")}
                      className="w-fit text-xs md:text-sm font-mono text-red-500 hover:text-white border border-red-900/50 hover:bg-red-600/20 px-4 py-2 rounded-lg transition-colors"
                    >
                      [ DISCONNECT ]
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* ฝั่งขวา: รูปภาพ Premium พร้อมแอนิเมชันเรืองแสงและสลับร่างตามลำดับขั้น */}
          <div className="relative order-1 md:order-2 w-2/3 max-w-60 md:max-w-md mx-auto md:w-full md:pl-12 lg:pl-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`relative aspect-4/5 rounded-4xl overflow-hidden transition-all duration-1000 ${
                isTransformed
                  ? "border border-red-900/50 shadow-[0_0_40px_rgba(255,0,0,0.15)]"
                  : "bg-card border border-border-card shadow-2xl"
              }`}
            >
              {/* ใช้ AnimatePresence เพื่อทำแอนิเมชันตอนสลับรูปภาพ */}
              <AnimatePresence mode="wait">
                {/* ขั้นตอนที่ 1: แสดงรูป Profile (โหมดปกติ หรือ กำลัง Standing By) */}
                {phase !== "complete" && (
                  <motion.div
                    key="profile-image"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // เฟดออกตอนสลับเป็นอวาตาร์
                    transition={{ duration: 0.5 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/images/profile.png"
                      alt="Vil - Web Developer"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* เอฟเฟกต์แสงสีแดงอาบตัว (โชว์เฉพาะตอน Standing By เท่านั้น) */}
                    <AnimatePresence>
                      {phase === "standing_by" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 0.4, 0] }} // กระพริบช้าๆ เป็นจังหวะหัวใจ
                          exit={{ opacity: 0 }}
                          // 👇 ดีเลย์ 0.8 วินาที เพื่อให้เริ่มเรืองแสงพร้อมๆ กับที่เส้นแสงแนวตั้งวิ่งลงมาถึงตัว
                          transition={{
                            delay: 0.8,
                            duration: 1.5,
                            repeat: Infinity,
                            repeatDelay: 0.5,
                          }}
                          className="absolute inset-0 bg-red-600 mix-blend-multiply"
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* ขั้นตอนที่ 2: แสดงรูป Avatar (เมื่อแปลงร่างเสร็จสมบูรณ์) */}
                {phase === "complete" && (
                  <motion.div
                    key="avatar-image"
                    initial={{ opacity: 0 }} // เฟดเข้ามาหลังจากรูปโปรไฟล์หายไป
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} // เฟดออกตอน Cancel Transform
                    transition={{ duration: 0.8 }} // ค่อยๆ เฟดเข้าอย่างนุ่มนวล
                    className="relative w-full h-full"
                  >
                    <Image
                      src="/images/avatar.png"
                      alt="Vil - Smart Brain OS Integrated Avatar"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {phase === "idle" && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
        >
          <AnimatePresence>
            {isKeypadOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="mb-4 bg-card/95 backdrop-blur-md border border-border-card p-4 rounded-3xl shadow-2xl w-65 md:w-70"
              >
                <div className="flex justify-between items-center mb-3 px-1">
                  <p className="text-xs font-bold text-text-muted uppercase tracking-widest">
                    Smart Brain OS 555 Enter
                  </p>
                  <button
                    onClick={toggleKeypad}
                    className="text-text-muted hover:text-red-500 font-bold w-6 h-6 flex items-center justify-center rounded-full bg-muted hover:bg-red-50 transition-colors"
                  >
                    ✕
                  </button>
                </div>
                <div className="bg-neutral-900 rounded-xl p-3 mb-4 h-14 flex items-center justify-center overflow-hidden shadow-inner">
                  <span className="text-red-500 font-mono text-2xl tracking-[0.3em] font-bold">
                    {displayCode ? (
                      displayCode
                    ) : (
                      <span className="text-neutral-700">_ _ _</span>
                    )}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleVirtualKey(num.toString())}
                      className="bg-muted hover:bg-border-card active:brightness-90 text-foreground text-lg font-bold py-2.5 rounded-xl transition-colors shadow-sm"
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
                    className="bg-muted hover:bg-border-card active:brightness-90 text-foreground text-lg font-bold py-2.5 rounded-xl transition-colors shadow-sm"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleVirtualKey("Enter")}
                    className="bg-foreground hover:opacity-80 active:scale-95 text-background text-sm font-bold py-2.5 rounded-xl transition-transform shadow-sm"
                  >
                    ENT
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {/* ปุ่มเปิด/ปิด แบบมีไฟสถานะ (Subtle Hint) */}
          <button
            onClick={toggleKeypad}
            className={`group flex items-center gap-2 text-xs font-mono font-semibold transition-all duration-300 px-4 py-2 rounded-full border ${
              isKeypadOpen
                ? "text-red-500 border-red-900/30 bg-red-500/10" // สไตล์ตอนเปิดแป้นพิมพ์
                : "text-text-muted border-border-card/50 hover:border-foreground/20 bg-card/50 hover:bg-card shadow-sm" // สไตล์ตอนปิด (สว่างขึ้นกว่าเดิมนิดหน่อย)
            }`}
          >
            {/* ไฟสถานะสีแดงกระพริบ (จะโชว์เฉพาะตอนปิดแป้นอยู่) */}
            {!isKeypadOpen && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
            )}

            <span
              className={
                isKeypadOpen
                  ? ""
                  : "group-hover:text-foreground transition-colors"
              }
            >
              {isKeypadOpen ? "CLOSE_SYS" : "SYS_READY [ _ _ _ ]"}
            </span>
          </button>
        </motion.div>
      )}
    </section>
  );
}
