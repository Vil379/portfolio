// src/app/projects/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function ProjectsPage() {
  // ข้อมูลสมมติของโปรเจกต์
  const projects = [
    {
      id: "staybase",
      title: "StayBase - Property Management",
      tag: "Web App",
      image: "/staybase.jpg",
    },
    {
      id: "ecommerce",
      title: "Azeinx E-commerce Platform",
      tag: "E-commerce",
      image: "/ecommerce.jpg",
    },
    {
      id: "booking-system",
      title: "Clinic Booking System",
      tag: "Internal Tool",
      image: "/booking.jpg",
    },
    {
      id: "portfolio-v2",
      title: "Vil.dev Portfolio V2",
      tag: "Modern Design",
      image: "/portfolio.jpg",
    },
  ];

  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 border-b-4 border-blue-600 pb-4 inline-block tracking-tighter">
        คลังผลงาน (Portfolio)
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.id}`}
            className="group block bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-2xl hover:border-gray-200 transition-all duration-300"
          >
            <div className="aspect-[16] bg-gray-100 relative overflow-hidden">
              {/* <Image src={project.image} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" /> */}
              <div className="absolute inset-0 flex items-center justify-center font-bold text-gray-400">
                ภาพจำลอง ({project.image})
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full">
                {project.tag}
              </span>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 group-hover:text-blue-700 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm">
                ดูรายละเอียด, ความท้าทาย และผลลัพธ์ที่เราทำ...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
