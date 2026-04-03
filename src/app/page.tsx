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
    <main className="min-h-screen text-foreground px-6 py-12 md:py-24">
      <FaizHero />

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
