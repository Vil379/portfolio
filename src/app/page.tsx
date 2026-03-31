// src/app/page.tsx
import Link from "next/link";
import { client } from "../sanity/lib/client"; // ปรับ Path ให้ตรงกับที่อยู่ไฟล์ client ของคุณ
import { urlFor } from "../sanity/lib/image"; // ปรับ Path ให้ตรงกับที่อยู่ไฟล์ image ของคุณ

export const revalidate = 10;
// ดึงข้อมูลโปรเจกต์ 2 อันล่าสุด
async function getProjects() {
  const query = `*[_type == "project"][0...2] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    mainImage
  }`;
  return client.fetch(query);
}

export default async function Home() {
  const projects = await getProjects();

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
          {projects.map((project: any) => (
            <div
              key={project._id}
              className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 bg-white flex flex-col h-full"
            >
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                  Portfolio
                </span>
              </div>
              <h4 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed flex-auto">
                {project.description}
              </p>
              <Link
                href={`/projects/${project.slug}`}
                className="text-blue-600 font-semibold hover:text-blue-800 transition-colors inline-flex items-center mt-auto"
              >
                ดูรายละเอียด <span className="ml-2">&rarr;</span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
