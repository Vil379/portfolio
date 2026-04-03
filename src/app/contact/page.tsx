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
    <main className="min-h-screen pt-32 pb-24 text-foreground">
      <div className="max-w-6xl mx-auto px-6">
        <section className="mb-16 md:mb-24 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            มาร่วมสร้างเว็บที่
            <br />
            ยอดเยี่ยมไปด้วยกัน
          </h1>
          <p className="text-xl text-text-muted leading-relaxed">
            ไม่ว่าคุณจะมีไอเดียโปรเจกต์ใหม่
            หรือต้องการอัปเกรดระบบเดิมให้เร็วและแรงขึ้น
            ทักมาพูดคุยรายละเอียดเบื้องต้นกันก่อนได้เลยครับ
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-text-muted uppercase tracking-widest mb-6 block">
                ช่องทางการติดต่อ
              </h3>
              <div className="space-y-8 mb-16">
                <div>
                  <p className="text-text-muted text-sm mb-1">Email</p>
                  <a
                    href="mailto:asawin22112545@gmail.com"
                    className="text-2xl font-semibold text-foreground hover:text-text-muted transition-colors"
                  >
                    asawin22112545@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">Phone</p>
                  <a
                    href="tel:0932853472"
                    className="text-2xl font-semibold text-foreground hover:text-text-muted transition-colors"
                  >
                    0932853472
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">LINE ID</p>
                  <a
                    href="https://line.me/ti/p/~@winwin3379"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl font-semibold text-foreground hover:text-[#00B900] transition-colors"
                  >
                    @winwin3379
                  </a>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">Location</p>
                  <p className="text-2xl font-semibold text-foreground">
                    Chiang Mai, Thailand
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-card border border-border-card rounded-[2.5rem] p-8 md:p-12 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-8 h-8"
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
                  <h3 className="text-3xl font-bold mb-4 tracking-tight text-foreground">
                    ส่งข้อความสำเร็จ!
                  </h3>
                  <p className="text-text-muted mb-8">
                    ขอบคุณที่ให้ความสนใจครับ
                    ผมจะรีบตอบกลับให้อีเมลของคุณให้เร็วที่สุด
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    ส่งข้อความใหม่
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-semibold text-foreground"
                      >
                        ชื่อของคุณ
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full bg-muted border border-border-card text-foreground text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                        placeholder="สมชาย"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-semibold text-foreground"
                      >
                        อีเมล
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-muted border border-border-card text-foreground text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all"
                        placeholder="you@gmail.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="service"
                      className="text-sm font-semibold text-foreground"
                    >
                      บริการที่สนใจ
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full bg-muted border border-border-card text-foreground text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all appearance-none"
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

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-foreground"
                    >
                      รายละเอียดโปรเจกต์
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full bg-muted border border-border-card text-foreground text-base rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent transition-all resize-none"
                      placeholder="เล่าไอเดีย หรือเป้าหมายของโปรเจกต์ให้ผมฟังคร่าวๆ..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-foreground text-background font-medium text-lg rounded-xl px-8 py-4 hover:opacity-90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
