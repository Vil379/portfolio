// src/components/ReadMoreText.tsx
"use client";

import { useState } from "react";

export default function ReadMoreText({ text }: { text: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) {
    return (
      <p className="text-text-muted text-sm leading-relaxed">
        กำลังอัปเดตข้อมูล...
      </p>
    );
  }

  // เช็คว่าข้อความยาวพอที่จะต้องมีปุ่มย่อ/ขยายหรือไม่ (เกิน 120 ตัวอักษร)
  const isLongText = text.length > 120;

  return (
    <div>
      <p
        className={`text-text-muted text-sm leading-relaxed transition-all duration-300 ${
          isExpanded ? "" : "line-clamp-4"
        }`}
      >
        {text}
      </p>

      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs font-bold text-foreground border-b border-foreground/30 hover:border-foreground pb-0.5 transition-colors"
        >
          {isExpanded ? "ย่อเนื้อหา" : "อ่านเพิ่มเติม..."}
        </button>
      )}
    </div>
  );
}
