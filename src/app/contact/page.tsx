"use client";

import { useState } from "react";
import Button from "@/src/components/ui/Button";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      service: formData.get("service"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("เกิดข้อผิดพลาดจากระบบส่งอีเมล กรุณาลองใหม่อีกครั้งครับ");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้งครับ");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-24 text-foreground">
      {/* 💡 ปรับ max-w ให้แคบลงจาก 6xl เป็น 5xl เพื่อให้หน้าเว็บดูกระชับขึ้น */}
      <div className="max-w-5xl mx-auto px-6">
        {/* --- Header --- */}
        <section className="mb-16 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            มาร่วมสร้างเว็บที่ยอดเยี่ยม
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            ไม่ว่าคุณจะมีไอเดียโปรเจกต์ใหม่ หรือต้องการอัปเกรดระบบเดิมให้ดีขึ้น
            ทักมาพูดคุยรายละเอียดเบื้องต้นกันก่อนได้เลยครับ
          </p>
        </section>

        {/* 💡 ปรับช่องว่างตรงกลาง (gap) ให้แคบลง */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* --- ฝั่งซ้าย: ข้อมูลการติดต่อ --- */}
          {/* 💡 ปรับสัดส่วนให้ฝั่งซ้ายกินพื้นที่น้อยลง (4 ส่วน) */}
          <div className="lg:col-span-4 flex flex-col justify-start pt-2">
            <div>
              <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-6 flex items-center gap-3">
                <span className="w-6 h-px bg-border-card block"></span>
                ช่องทางการติดต่อ
              </h3>

              <div className="space-y-6">
                <div>
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href="mailto:asawin22112545@gmail.com"
                    className="text-lg font-medium text-foreground hover:text-text-muted transition-colors"
                  >
                    asawin22112545@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Phone
                  </p>
                  <a
                    href="tel:0932853472"
                    className="text-lg font-medium text-foreground hover:text-text-muted transition-colors"
                  >
                    0932853472
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    LINE ID
                  </p>
                  <a
                    href="https://line.me/ti/p/~@winwin3379"
                    target="_blank"
                    rel="noreferrer"
                    className="text-lg font-medium text-foreground hover:text-[#00B900] transition-colors"
                  >
                    @winwin3379
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-xs mb-1 uppercase tracking-wider">
                    Location
                  </p>
                  <p className="text-lg font-medium text-foreground">
                    Chiang Mai, Thailand
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- ฝั่งขวา: ฟอร์มติดต่อ --- */}
          {/* 💡 ปรับสัดส่วนฝั่งขวาให้ใหญ่ขึ้นนิดนึง (8 ส่วน) แต่ใช้ padding ในกล่องน้อยลง */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-border-card rounded-3xl p-6 md:p-10 shadow-xl shadow-border-card/20">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 tracking-tight text-foreground">
                    ส่งข้อความสำเร็จ!
                  </h3>
                  <p className="text-sm text-text-muted mb-6">
                    ขอบคุณที่ให้ความสนใจครับ
                    ผมจะรีบตอบกลับให้อีเมลของคุณให้เร็วที่สุด
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    ส่งข้อความใหม่
                  </Button>
                </div>
              ) : (
                // 💡 ลดช่องว่างระหว่างบรรทัดในฟอร์ม (space-y-6)
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 💡 ในมือถือเรียงลงล่าง ในคอมแบ่ง 2 คอลัมน์ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="name"
                        className="text-xs font-semibold text-text-muted uppercase tracking-wider"
                      >
                        ชื่อของคุณ
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full bg-muted/50 border border-border-card text-foreground text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all"
                        placeholder="Vil Developer"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="text-xs font-semibold text-text-muted uppercase tracking-wider"
                      >
                        อีเมล
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-muted/50 border border-border-card text-foreground text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all"
                        placeholder="hello@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="service"
                      className="text-xs font-semibold text-text-muted uppercase tracking-wider"
                    >
                      บริการที่สนใจ
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full bg-muted/50 border border-border-card text-foreground text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all appearance-none cursor-pointer"
                    >
                      <option value="ไม่ระบุ">เลือกบริการเบื้องต้น</option>
                      <option value="Custom Website">
                        Custom Website (เว็บไซต์ทั่วไป)
                      </option>
                      <option value="Web Application">
                        Web Application (ระบบที่มีความซับซ้อน)
                      </option>
                      <option value="Performance Optimization">
                        Performance Optimization (ปรับปรุงความเร็ว)
                      </option>
                      <option value="Other">ปรึกษาเรื่องอื่นๆ</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-xs font-semibold text-text-muted uppercase tracking-wider"
                    >
                      รายละเอียดโปรเจกต์
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4} // 💡 ลดขนาดกล่องข้อความลง
                      className="w-full bg-muted/50 border border-border-card text-foreground text-sm rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-foreground focus:border-foreground transition-all resize-none"
                      placeholder="เล่าไอเดีย หรือเป้าหมายของโปรเจกต์ให้ผมฟังคร่าวๆ..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-foreground text-background font-medium text-sm rounded-lg px-8 py-3 hover:opacity-90 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? "กำลังส่งข้อความ..." : "ส่งข้อความ"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
