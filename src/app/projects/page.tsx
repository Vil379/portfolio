// src/app/projects/page.tsx
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export const revalidate = 10;

// 1. อัปเดต Query ให้ดึงข้อมูลมาครบทุกอย่าง (เพิ่ม challenge และ techStack)
async function getAllProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id, 
    title, 
    "slug": slug.current,
    description, 
    mainImage,
    challenge,
    techStack
  }`;
  return client.fetch(query);
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-16 border-b-4 border-blue-600 pb-4 inline-block tracking-tighter text-gray-900">
        ผลงานทั้งหมด (Projects)
      </h1>

      {/* เปลี่ยนจาก Grid 3 คอลัมน์ เป็น Stack เรียงลงมาทีละโปรเจกต์ */}
      <div className="space-y-20">
        {projects.map((project: any) => (
          <article
            key={project._id}
            id={project.slug}
            className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* ส่วนหัว: ชื่อและคำอธิบาย */}
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tighter text-gray-900">
              {project.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {project.description}
            </p>

            {/* ส่วนรูปภาพ */}
            <div className="aspect-video bg-gray-50 relative overflow-hidden rounded-2xl mb-12 border border-gray-100">
              {project.mainImage ? (
                <Image
                  src={urlFor(project.mainImage).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">
                  ไม่มีรูปภาพ
                </div>
              )}
            </div>

            {/* ส่วนรายละเอียด (เทคโนโลยีและความท้าทาย) ยกมาจากหน้า Detail */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t border-gray-100 pt-10">
              {/* คอลัมน์ซ้าย: Tech Stack */}
              <aside className="lg:col-span-1 space-y-6">
                <h3 className="font-bold text-gray-500 uppercase tracking-wider text-sm">
                  เทคโนโลยีที่ใช้
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.length > 0 ? (
                    project.techStack.map((t: string) => (
                      <span
                        key={t}
                        className="bg-blue-50 text-blue-700 border border-blue-100 text-sm font-semibold px-4 py-2 rounded-full"
                      >
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400 text-sm">
                      ไม่ได้ระบุเทคโนโลยี
                    </span>
                  )}
                </div>
              </aside>

              {/* คอลัมน์ขวา: ปัญหาที่แก้ */}
              <div className="lg:col-span-3 space-y-6">
                <section>
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">
                    📍 ความท้าทายของโปรเจกต์ (The Challenge)
                  </h2>
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {project.challenge || "กำลังอัปเดตข้อมูลในส่วนนี้..."}
                  </p>
                </section>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
