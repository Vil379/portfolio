// src/app/page.tsx
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 px-6 py-12 md:py-24">
      {/* ส่วนที่ 1: แนะนำตัว (Hero Section) */}
      <section className="mb-24 max-w-4xl mx-auto mt-10 md:mt-20">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-gray-900">
          สวัสดีครับ ผม Vil 👋
        </h1>
        <h2 className="text-2xl md:text-4xl text-blue-600 mb-8 font-semibold tracking-tight">
          Freelance Web Developer
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
          ผมรับออกแบบและพัฒนาเว็บไซต์ที่ตอบโจทย์ธุรกิจของคุณ ตั้งแต่หน้าเว็บ
          Portfolio ไปจนถึงระบบแพลตฟอร์มที่ซับซ้อน มุ่งเน้นประสิทธิภาพ
          ความรวดเร็ว และมอบประสบการณ์ที่ดีที่สุดให้กับผู้ใช้งาน
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="bg-blue-600 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            ดูผลงานของผม
          </Link>
          <Link
            href="/contact"
            className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-3.5 rounded-full text-base font-semibold hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            ติดต่องาน
          </Link>
        </div>
      </section>

      {/* ส่วนที่ 2: ผลงาน (Projects Section) */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <h3 className="text-3xl font-bold text-gray-900">
            Selected Projects
          </h3>
          <Link
            href="/projects"
            className="text-blue-600 font-medium hover:text-blue-800 hidden md:block"
          >
            ดูทั้งหมด &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* การ์ดผลงานที่ 1: StayBase */}
          <div className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 bg-white flex flex-col h-full">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                Booking Platform
              </span>
            </div>
            <h4 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
              StayBase (azeinx.com)
            </h4>
            <p className="text-gray-600 mb-6 leading-relaxed flex">
              แพลตฟอร์มสร้างเว็บไซต์จองที่พัก (Booking Website Builder)
              ออกแบบมาเพื่อช่วยจัดการข้อมูลที่พักและยอดขายได้อย่างมีประสิทธิภาพ
              พัฒนาด้วย Next.js และ Tailwind CSS
            </p>
            <Link
              href="/projects/staybase"
              className="text-blue-600 font-semibold hover:text-blue-800 transition-colors inline-flex items-center mt-auto"
            >
              อ่าน Case Study <span className="ml-2">&rarr;</span>
            </Link>
          </div>

          {/* การ์ดผลงานที่ 2: เคียงผา Hillside */}
          <div className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 bg-white flex flex-col h-full">
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">
                Resort Website
              </span>
            </div>
            <h4 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors">
              เคียงผา Hillside
            </h4>
            <p className="text-gray-600 mb-6 leading-relaxed flex">
              เว็บไซต์นำเสนอข้อมูลที่พักและรีสอร์ทโซนดอยอินทนนท์
              เน้นการนำเสนอภาพลักษณ์ที่สวยงาม ดึงดูดนักท่องเที่ยว
              และรองรับการแสดงผลทุกขนาดหน้าจอ (Responsive Design)
            </p>
            <Link
              href="/projects/kiangpha"
              className="text-gray-500 font-semibold hover:text-gray-800 transition-colors inline-flex items-center mt-auto"
            >
              ดูรายละเอียด <span className="ml-2">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* ปุ่มดูทั้งหมดสำหรับ Mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/projects"
            className="text-blue-600 font-semibold inline-flex items-center"
          >
            ดูผลงานทั้งหมด <span className="ml-2">&rarr;</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
