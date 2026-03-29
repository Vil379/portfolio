// src/app/projects/[projectId]/page.tsx

import Link from "next/link";

export default function ProjectDetailsPage({
  params,
}: {
  params: { projectId: string };
}) {
  // ข้อมูลจำลองสำหรับ Case Study (ควรทำ data file แยกในอนาคต)
  const caseStudies: Record<string, any> = {
    staybase: {
      title: "StayBase - Property Management Solution",
      client: "Azeinx Co., Ltd.",
      tech: ["Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
      challenge:
        "Client ต้องการระบบที่รวดเร็วเพื่อจัดการข้อมูลที่พักและยอดขาย แทนระบบเดิมที่เป็น Excel",
      solution:
        "เราออกแบบและพัฒนาระบบ Web App ที่มีการดึงข้อมูลแบบ Real-time พร้อมแดชบอร์ดสรุปยอดขายสำหรับผู้บริหาร",
      outcome:
        "ลดเวลาการทำงานของเจ้าหน้าที่ลง 40% และเพิ่มความแม่นยำของข้อมูลยอดขาย",
    },
    // เพิ่มข้อมูลโปรเจกต์อื่นตรงนี้...
  };

  const projectData = caseStudies[params.projectId];

  if (!projectData)
    return <main className="text-center py-20">ไม่พบข้อมูลโปรเจกต์</main>;

  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <Link href="/projects" className="text-blue-600 mb-8 inline-block">
        &larr; กลับหน้าผลงาน
      </Link>
      <div className="bg-white border border-gray-100 p-8 md:p-12 rounded-3xl shadow-sm mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tighter text-gray-900">
          {projectData.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Client: {projectData.client}
        </p>

        {/* รายละเอียด Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 border-t pt-12">
          <aside className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-gray-500 uppercase tracking-wider">
              เทคโนโลยีที่ใช้
            </h3>
            <div className="flex flex-wrap gap-2">
              {projectData.tech.map((t: string) => (
                <span
                  key={t}
                  className="bg-gray-100 text-sm font-semibold px-4 py-2 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href="#"
              className="bg-blue-600 text-white w-full text-center px-6 py-3 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm inline-block"
            >
              ดูเว็บจริง
            </a>
          </aside>
          <div className="lg:col-span-3 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                📍 ความท้าทายของโปรเจกต์ (The Challenge)
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {projectData.challenge}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                💡 โซลูชันที่เรานำเสนอ (The Solution)
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {projectData.solution}
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold mb-4">
                🏆 ผลลัพธ์ที่ได้ (The Outcome)
              </h2>
              <p className="text-blue-800 font-medium bg-blue-50 border border-blue-100 p-6 rounded-2xl text-lg leading-relaxed">
                {projectData.outcome}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
