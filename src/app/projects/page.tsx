// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";
import { client } from "../../sanity/lib/client";
import { urlFor } from "../../sanity/lib/image";

export const revalidate = 10;

async function getAllProjects() {
  const query = `*[_type == "project"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    mainImage
  }`;
  return client.fetch(query);
}

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 border-b-4 border-blue-600 pb-4 inline-block tracking-tighter">
        คลังผลงาน (Portfolio)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project: any) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="group block bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300"
          >
            <div className="aspect-auto bg-gray-100 relative overflow-hidden">
              {project.mainImage ? (
                <Image
                  src={urlFor(project.mainImage).url()}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">
                  ไม่มีรูปภาพ
                </div>
              )}
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}