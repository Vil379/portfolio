// src/components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  const navLinks = [
    { name: "หน้าแรก", href: "/" },
    { name: "ผลงาน", href: "/projects" },
    { name: "บริการ", href: "/services" },
    { name: "เกี่ยวกับผม", href: "/about" },
    { name: "ติดต่อ", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-gray-900 tracking-tighter hover:opacity-80"
        >
          Vil.dev
        </Link>
        <div className="flex items-center gap-2 md:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            คุยงาน
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
