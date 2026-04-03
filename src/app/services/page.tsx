import Button from "@/src/components/ui/Button";

export default function ServicesPage() {
  const services = [
    {
      title: "Custom Website Development",
      subtitle: "เว็บไซต์องค์กร / แบรนด์ / พอร์ตโฟลิโอ",
      description:
        "ออกแบบและพัฒนาเว็บไซต์ด้วยการเขียนโค้ดใหม่ทั้งหมด (100% Custom Code) ไม่ใช้เทมเพลตสำเร็จรูป เพื่อให้ได้เว็บไซต์ที่ตรงกับเอกลักษณ์ของแบรนด์ โหลดเร็ว โครงสร้าง SEO แข็งแรง",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
    },
    {
      title: "Web Application",
      subtitle: "ระบบเว็บแอปพลิเคชัน / แพลตฟอร์ม",
      description:
        "รับพัฒนาระบบที่มีความซับซ้อน เช่น ระบบจัดการอสังหาริมทรัพย์, ระบบจองที่พัก เน้นสถาปัตยกรรมที่รองรับผู้ใช้งานจำนวนมาก (Scalable) และปลอดภัย",
      tags: ["TypeScript", "React", "API Integration"],
    },
    {
      title: "Headless CMS Integration",
      subtitle: "ระบบจัดการเนื้อหา (หลังบ้าน)",
      description:
        "เชื่อมต่อเว็บไซต์ของคุณเข้ากับ Headless CMS สมัยใหม่ (เช่น Sanity.io) เพื่อให้คุณและทีมงานอัปเดตบทความ รูปภาพ หรือสินค้าได้ง่ายๆ ด้วยตัวเอง",
      tags: ["Sanity.io", "CMS", "Real-time"],
    },
    {
      title: "Performance Optimization",
      subtitle: "ปรับปรุงความเร็วและประสิทธิภาพ",
      description:
        "บริการอัปเกรดเว็บไซต์เดิม หรือย้ายฐานข้อมูลมายัง Tech Stack ยุคใหม่ เพื่อทำคะแนน Google PageSpeed ให้ทะลุจอ ช่วยลดอัตราการกดออกและเพิ่มยอดขาย",
      tags: ["Vercel", "Cloudflare", "PageSpeed"],
    },
  ];

  const workflows = [
    {
      step: "01",
      name: "Discovery",
      desc: "พูดคุยทำความเข้าใจธุรกิจ เป้าหมาย พร้อมประเมินราคาและระยะเวลา",
    },
    {
      step: "02",
      name: "Development",
      desc: "ลงมือเขียนโค้ดและพัฒนาระบบ ติดตามความคืบหน้าผ่านลิงก์ทดสอบ",
    },
    {
      step: "03",
      name: "Launch",
      desc: "ตรวจสอบความสมบูรณ์ทุกหน้าจอ และนำเว็บไซต์ขึ้นระบบจริง (Production)",
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-16 text-foreground">
      <div className="max-w-5xl mx-auto px-6">
        <section className="mb-12 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
            บริการของผม
          </h1>
          <p className="text-lg text-text-muted leading-relaxed">
            รับจบทุกขั้นตอนการสร้างเว็บไซต์ ตั้งแต่หน้าบ้านที่สวยงาม
            ไปจนถึงระบบหลังบ้านที่ทรงพลัง
          </p>
        </section>

        <div className="bg-card border border-border-card rounded-4xl shadow-xl shadow-border-card/40 p-6 md:p-12 mb-12 transition-colors">
          <div className="flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                className={`py-8 flex flex-col md:flex-row gap-4 md:gap-12 group ${index !== 0 ? "border-t border-border-card" : "pt-0"}`}
              >
                <div className="md:w-1/3 shrink-0">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest block mb-2">
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="md:w-2/3 flex flex-col justify-center">
                  <p className="text-text-muted leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted border border-border-card text-text-muted text-xs font-semibold px-3 py-1.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-10 border-t border-border-card">
            <h2 className="text-2xl font-bold mb-8 tracking-tight text-foreground">
              ขั้นตอนการทำงาน
            </h2>
            <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x hide-scrollbar">
              {workflows.map((flow, index) => (
                <div
                  key={index}
                  className="min-w-65 md:min-w-0 bg-muted/50 border border-border-card rounded-2xl p-6 snap-start"
                >
                  <span className="text-4xl font-extrabold text-border-card block mb-4 tracking-tighter">
                    {flow.step}
                  </span>
                  <h4 className="text-lg font-bold mb-2 text-foreground">
                    {flow.name}
                  </h4>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {flow.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section ยังคงเป็นสีดำแดง เพื่อดึงดูดสายตาไม่ว่าจะอยู่โหมดไหน */}
        <section className="bg-neutral-950 text-white rounded-4xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] pointer-events-none"></div>
          <div className="relative z-10 text-center md:text-left">
            <h2 className="text-3xl font-extrabold mb-2 tracking-tight">
              พร้อมเริ่มโปรเจกต์ใหม่หรือยัง?
            </h2>
            <p className="text-neutral-400 text-sm md:text-base">
              เล่าไอเดียของคุณให้ผมฟัง เพื่อประเมินราคาและระยะเวลาได้ฟรี
            </p>
          </div>
          <div className="relative z-10 shrink-0 w-full md:w-auto">
            <Button
              href="/contact"
              size="md"
              className="w-full md:w-auto bg-red-900 text-white hover:bg-red-800 border-none"
            >
              คุยรายละเอียดโปรเจกต์
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
