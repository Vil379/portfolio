// sanity/schemasTypes/project.ts
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "ผลงาน (Projects)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "ชื่อโปรเจกต์",
      type: "string",
      validation: (Rule) => Rule.required().error("กรุณาใส่ชื่อโปรเจกต์"),
    }),
    defineField({
      name: "clientName",
      title: "ชื่อลูกค้า / แบรนด์",
      type: "string",
      description: "ชื่อบริษัทหรือลูกค้าที่จ้างทำโปรเจกต์นี้ (ถ้ามี)",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "กดปุ่ม Generate เพื่อสร้าง URL จากชื่อโปรเจกต์อัตโนมัติ",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "ลิงก์เว็บไซต์จริง (Live URL)",
      type: "url",
      description: "ใส่ URL ของเว็บลูกค้า (เช่น https://example.com)",
    }),
    defineField({
      name: "description",
      title: "คำจำกัดความสั้นๆ",
      type: "text",
      rows: 3, // ย่อกล่องข้อความให้ไม่ลึกเกินไป
    }),
    defineField({
      name: "mainImage",
      title: "รูปภาพหลัก (Thumbnail)",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "challenge",
      title: "ความท้าทาย / ปัญหาที่แก้ (Challenge)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack ที่ใช้",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags", // 💡 เปลี่ยนเป็นแบบ Tag พิมพ์แล้วกด Enter ได้เลย
      },
      description:
        "พิมพ์ชื่อเทคโนโลยีแล้วกด Enter (เช่น Next.js, Tailwind CSS)",
    }),
  ],

  // 💡 ปรับแต่งการแสดงผลในหน้า List ของ Sanity Studio ให้อ่านง่ายขึ้น
  preview: {
    select: {
      title: "title",
      subtitle: "clientName",
      media: "mainImage",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: title,
        subtitle: subtitle ? `Client: ${subtitle}` : "Personal Project",
        media: media,
      };
    },
  },
});
