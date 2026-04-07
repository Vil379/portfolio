// src/app/page.tsx
import Link from "next/link";
import { client } from "../sanity/lib/client";
import Button from "../components/ui/Button";
import FaizHero from "../components/FaizHero";

export const revalidate = 10;

async function getProjects() {
  const query = `*[_type == "project"][0...2] | order(_createdAt desc) {
    _id, title, "slug": slug.current, description, mainImage
  }`;
  return client.fetch(query);
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen text-foreground pt-24 md:pt-32 pb-24">
      {/* 1. Hero Section (ระบบแปลงร่าง) */}
      <FaizHero />

      {/* 2. REFINED: Tech Stack & About Section (โปร่ง โล่ง สบายตา) */}
      <section className="max-w-5xl mx-auto px-6 mb-32 md:mb-40 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">
          {/* ฝั่งซ้าย: คำโปรย */}
          <div className="md:w-1/2">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4 flex items-center gap-3">
              <span className="w-8 h-px bg-border-card block"></span>
              Tech Arsenal
            </h3>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6 tracking-tight">
              เครื่องมือที่ผมเชี่ยวชาญ
            </h2>
            <p className="text-text-muted text-base md:text-lg leading-relaxed mb-8">
              ผมเลือกใช้ Tech Stack ที่ทันสมัยและได้รับการยอมรับระดับสากล
              เพื่อให้มั่นใจว่าเว็บไซต์ของคุณจะโหลดเร็วติดจรวด ปลอดภัย
              และรองรับการขยายตัวในอนาคตได้อย่างไร้รอยต่อ
            </p>

            <Button
              href="/resume.pdf"
              target="_blank"
              variant="outline"
              className="w-full md:w-auto hover:bg-muted"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
              ดู Resume ของผม
            </Button>
          </div>

          {/* ฝั่งขวา: ป้ายชื่อเทคโนโลยีแบบ Sleek Pills */}
          <div className="md:w-1/2 pt-2 md:pt-12">
            <div className="flex flex-wrap gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Sanity CMS",
                "Vercel",
                "Cloudflare",
                "Figma",
              ].map((tech) => (
                <div
                  key={tech}
                  className="px-5 py-2.5 rounded-full border border-border-card text-text-muted text-sm font-medium hover:border-foreground/30 hover:text-foreground transition-all cursor-default bg-background/50 backdrop-blur-sm"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Selected Projects Section */}
      <section className="max-w-5xl mx-auto relative z-10 px-6">
        <div className="flex items-center justify-between mb-12 pb-4">
          <h3 className="text-3xl font-bold tracking-tight">
            Selected Projects
          </h3>
          <Link
            href="/projects"
            className="text-text-muted font-medium hover:text-foreground hidden md:block transition-colors"
          >
            ดูทั้งหมด &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20">
          {projects.map((project: any) => (
            <div
              key={project._id}
              className="group border border-border-card rounded-4xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col h-full bg-card/90 backdrop-blur-sm"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-6 block">
                — Portfolio
              </span>
              <h4 className="text-2xl font-bold mb-4 text-foreground group-hover:text-text-muted transition-colors tracking-tight">
                {project.title}
              </h4>
              <p className="text-text-muted mb-8 leading-relaxed flex-auto text-sm md:text-base">
                {project.description}
              </p>
              <Link
                href={`/projects#${project.slug}`}
                className="text-foreground font-semibold inline-flex items-center mt-auto group/link"
              >
                <span className="border-b border-transparent group-hover/link:border-foreground transition-colors pb-0.5">
                  ดูรายละเอียด
                </span>
                <span className="ml-2 transform group-hover/link:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
