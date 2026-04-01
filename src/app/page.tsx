// src/app/page.tsx
import Link from "next/link";
import { client } from "../sanity/lib/client";
import Button from "../components/ui/Button"; // <-- นำเข้า Button
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
    <main className="min-h-screen text-gray-900 px-6 py-12 md:py-24">
      {/* Hero Section */}
      <FaizHero />

      {/* Projects Section */}
      <section className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <h3 className="text-3xl font-bold">Selected Projects</h3>
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
              className="group border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col h-full"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full w-fit mb-4">
                Portfolio
              </span>
              <h4 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                {project.title}
              </h4>
              <p className="text-gray-600 mb-6 leading-relaxed flex-auto">
                {project.description}
              </p>
              <Link
                href={`/projects#${project.slug}`} // เติมเครื่องหมาย # เข้าไป
                className="text-blue-600 font-semibold hover:text-blue-800 inline-flex items-center mt-auto"
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
