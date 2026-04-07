// src/components/Footer.tsx
"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border-card bg-background transition-colors duration-1000 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* ฝั่งซ้าย: โลโก้ และ ลิขสิทธิ์ */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-xl font-bold tracking-tighter text-foreground">
            Vil.dev
          </span>
          <p className="text-sm text-text-muted">
            © {currentYear} Vil. All rights reserved.
          </p>
        </div>

        {/* ฝั่งขวา: ลิงก์ Social และปุ่มกลับขึ้นบน */}
        <div className="flex items-center gap-6">
          {/* 💡 อย่าลืมเปลี่ยนลิงก์ "#" เป็นลิงก์ GitHub และ LinkedIn ของคุณนะครับ */}
          <a
            href="https://github.com/Vil379"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-foreground transition-colors text-sm font-medium"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/vil-atsawin-475867401/?isSelfProfile=true"
            target="_blank"
            rel="noreferrer"
            className="text-text-muted hover:text-foreground transition-colors text-sm font-medium"
          >
            LinkedIn
          </a>

          {/* เส้นคั่นบางๆ ก่อนปุ่ม Back to top */}
          <div className="h-4 w-px bg-border-card hidden md:block"></div>

          <button
            onClick={scrollToTop}
            className="text-text-muted hover:text-foreground transition-colors text-sm font-medium group flex items-center gap-2"
          >
            Back to top
            <span className="group-hover:-translate-y-1 transition-transform">
              &uarr;
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
