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
    <main className="min-h-screen pt-24 pb-24 text-foreground">
      <div className="max-w-5xl mx-auto px-6">
        {/* --- Header --- */}
        <section className="mb-16 md:mb-24 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            บริการของผม
          </h1>
          <p className="text-lg md:text-xl text-text-muted leading-relaxed">
            รับจบทุกขั้นตอนการสร้างเว็บไซต์ ตั้งแต่หน้าบ้านที่สวยงาม
            ไปจนถึงระบบหลังบ้านที่ทรงพลัง
          </p>
        </section>

        {/* --- Services Section (โปร่ง โล่ง สบายตา) --- */}
        <section className="mb-24 md:mb-32">
          <div className="flex flex-col">
            {services.map((service, index) => (
              <div
                key={index}
                className={`py-12 flex flex-col md:flex-row gap-6 md:gap-12 group ${
                  index !== 0 ? "border-t border-border-card" : "pt-0"
                }`}
              >
                {/* ฝั่งซ้าย: หัวข้อ */}
                <div className="md:w-1/3 shrink-0">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest mb-3 flex items-center gap-3">
                    <span className="w-6 h-px bg-border-card block"></span>
                    {service.subtitle}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-text-muted transition-colors">
                    {service.title}
                  </h3>
                </div>

                {/* ฝั่งขวา: รายละเอียด และ Tags */}
                <div className="md:w-2/3 flex flex-col justify-center">
                  <p className="text-text-muted text-lg leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full border border-border-card text-text-muted text-xs font-medium bg-background/50 cursor-default hover:border-foreground/30 hover:text-foreground transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Workflow Section (แยกเป็นกล่องเดี่ยวๆ ดูเป็นสัดส่วน) --- */}
        <section className="mb-24 md:mb-32">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 tracking-tight text-foreground flex items-center gap-4">
            ขั้นตอนการทำงาน
            <span className="h-px bg-border-card flex-1 hidden sm:block"></span>
          </h2>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 pb-6 md:pb-0 snap-x hide-scrollbar">
            {workflows.map((flow, index) => (
              <div
                key={index}
                className="min-w-70 md:min-w-0 bg-card border border-border-card rounded-4xl p-8 snap-start hover:border-foreground/30 transition-colors duration-300"
              >
                <span className="text-5xl font-extrabold text-border-card block mb-6 tracking-tighter">
                  {flow.step}
                </span>
                <h4 className="text-xl font-bold mb-3 text-foreground">
                  {flow.name}
                </h4>
                <p className="text-text-muted leading-relaxed">{flow.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="bg-neutral-950 text-white rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/20 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="relative z-10 text-center md:text-left max-w-xl">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              พร้อมเริ่มโปรเจกต์ใหม่หรือยัง?
            </h2>
            <p className="text-neutral-400 text-base md:text-lg">
              เล่าไอเดียของคุณให้ผมฟัง เพื่อประเมินราคาและระยะเวลาได้ฟรี
            </p>
          </div>

          <div className="relative z-10 shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <Button
              href="/contact"
              size="lg"
              className="w-full md:w-auto bg-red-900 text-white hover:bg-red-800 border-none shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              คุยรายละเอียดโปรเจกต์
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
