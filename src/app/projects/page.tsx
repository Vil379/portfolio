import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";
import Button from "@/src/components/ui/Button";

export const revalidate = 10;

async function getAllProjects() {
  // 👇 1. เพิ่ม clientName และ liveUrl ใน Query
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id, title, "slug": slug.current, description, mainImage, challenge, techStack, clientName, liveUrl
  }`;
  return client.fetch(query);
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="max-w-6xl mx-auto px-6 py-24">
      <div className="mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-foreground">
          ผลงานของผม
        </h1>
        <p className="text-xl text-text-muted max-w-2xl">
          รวมผลงานการพัฒนาแพลตฟอร์มและเว็บไซต์ที่ผมภาคภูมิใจ
        </p>
      </div>

      <section className="mb-32">
        <div className="flex items-center gap-4 mb-8">
          <span className="h-px bg-border-card flex-1"></span>
          <span className="text-sm font-bold tracking-widest text-text-muted uppercase">
            Flagship Platform
          </span>
          <span className="h-px bg-border-card flex-1"></span>
        </div>

        {/* Flagship คงความดำหรูหราไว้เสมอ */}
        <article className="bg-neutral-950 text-white rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <div className="order-2 lg:order-1">
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 tracking-widest uppercase">
                Own Product
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Azeinx (StayBase)
              </h2>
              <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
                แพลตฟอร์มสร้างเว็บไซต์จองที่พักและจัดการอสังหาริมทรัพย์แบบครบวงจร
                ออกแบบมาเพื่อช่วยให้เจ้าของที่พักสามารถบริหารจัดการธุรกิจได้อย่างมีประสิทธิภาพ
              </p>
              <div className="mb-10">
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-4">
                  Core Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "Sanity",
                    "Vercel",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="bg-neutral-900 border border-neutral-800 text-neutral-300 text-sm font-medium px-4 py-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button
                  href="https://azeinx.com"
                  target="_blank"
                  className="bg-teal-600 text-white hover:bg-teal-500 border-none"
                >
                  เยี่ยมชมเว็บไซต์ &rarr;
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2 relative aspect-video lg:aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl group-hover:scale-[1.02] transition-transform duration-700">
              <Image
                src="/images/staybase-mockupx.png"
                alt="Azeinx StayBase"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </article>
      </section>

      <section>
        <div className="flex items-center gap-4 mb-12">
          <h3 className="text-2xl font-bold text-foreground tracking-tight">
            Client Showcase
          </h3>
          <span className="h-px bg-border-card flex-1"></span>
        </div>

        <div className="space-y-16">
          {projects.length > 0 ? (
            projects.map((project: any) => (
              <article
                key={project._id}
                id={project.slug}
                className="bg-card border border-border-card rounded-4xl p-8 md:p-12 hover:shadow-xl transition-all duration-500 scroll-mt-28 flex flex-col"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1">
                  <div className="lg:col-span-5 relative aspect-video md:aspect-square lg:aspect-4/3 bg-muted rounded-2xl overflow-hidden border border-border-card">
                    {project.mainImage ? (
                      <Image
                        src={urlFor(project.mainImage).url()}
                        alt={project.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center font-medium text-text-muted">
                        ไม่มีรูปภาพ
                      </div>
                    )}
                  </div>
                  <div className="lg:col-span-7 flex flex-col justify-center">
                    {/* 👇 2. เพิ่มป้ายชื่อ Client Name ถ้ามีข้อมูล */}
                    {project.clientName && (
                      <span className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-3 block">
                        {project.clientName}
                      </span>
                    )}

                    <h2 className="text-3xl font-extrabold mb-4 tracking-tight text-foreground">
                      {project.title}
                    </h2>
                    <p className="text-lg text-text-muted mb-8 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border-card pt-8 flex-1">
                      <div>
                        <h3 className="font-bold text-text-muted uppercase tracking-wider text-xs mb-4">
                          เทคโนโลยี
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack?.length > 0 ? (
                            project.techStack.map((t: string) => (
                              <span
                                key={t}
                                className="bg-muted text-text-muted border border-border-card text-xs font-semibold px-3 py-1.5 rounded-md"
                              >
                                {t}
                              </span>
                            ))
                          ) : (
                            <span className="text-text-muted text-sm">
                              ไม่ได้ระบุ
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-muted uppercase tracking-wider text-xs mb-4">
                          ความท้าทาย
                        </h3>
                        <p className="text-text-muted text-sm leading-relaxed line-clamp-4">
                          {project.challenge || "กำลังอัปเดตข้อมูล..."}
                        </p>
                      </div>
                    </div>

                    {/* 👇 3. เพิ่มปุ่มลิงก์ไปเว็บจริง ถ้ามีการกรอก Live URL เอาไว้ */}
                    {project.liveUrl && (
                      <div className="mt-8 pt-6 border-t border-border-card/50">
                        <Button
                          href={project.liveUrl}
                          target="_blank"
                          variant="outline"
                          size="sm"
                        >
                          เยี่ยมชมเว็บไซต์จริง &rarr;
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-20 text-text-muted border border-dashed border-border-card rounded-2rem">
              ยังไม่มีผลงานลูกค้านะครับ สามารถเพิ่มได้จากระบบหลังบ้านเลย
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
