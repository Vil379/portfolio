// src/app/projects/[projectId]/page.tsx
import Link from "next/link";
import { client } from "../../../sanity/lib/client";

export const revalidate = 10; // อย่าลืมใส่ตัวนี้ด้วยครับ

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0] {
    title,
    challenge,
    description,
    techStack
  }`;
  return client.fetch(query, { slug });
}

// 1. เปลี่ยน Type ของ params ให้เป็น Promise (ตามกฎ Next.js ใหม่)
export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  // 2. ใช้ await เพื่อแกะค่า params ออกมาก่อนใช้งาน
  const resolvedParams = await params;
  const projectData = await getProject(resolvedParams.projectId);

  if (!projectData) {
    return (
      <main className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">ไม่พบข้อมูลโปรเจกต์</h2>
        <p className="text-gray-500">
          โปรดตรวจสอบว่าใน Sanity ได้กดปุ่ม Generate Slug แล้วหรือยัง
        </p>
        <Link href="/projects" className="text-blue-600 mt-4 inline-block">
          &larr; กลับหน้าหลัก
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/projects" className="text-blue-600 mb-8 inline-block">
        &larr; กลับหน้าผลงาน
      </Link>
      <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter text-gray-900">
          {projectData.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">{projectData.description}</p>

        {/* รายละเอียด Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t pt-12">
          <aside className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-gray-500 uppercase tracking-wider">
              เทคโนโลยีที่ใช้
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.techStack?.map((t: string) => (
                <span
                  key={t}
                  className="bg-gray-100 text-sm font-semibold px-4 py-2 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </aside>

          <div className="lg:col-span-3 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                📍 ความท้าทายของโปรเจกต์ (The Challenge)
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                {projectData.challenge}
              </p>
            </section>
            {/* โซลูชันและผลลัพธ์ สามารถเพิ่มฟิลด์ใน Schema ของ Sanity ตามมาทีหลังได้ครับ */}
          </div>
        </div>
      </div>
    </main>
  );
}
