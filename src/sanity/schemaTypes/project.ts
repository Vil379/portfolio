// sanity/schemasTypes/project.ts
import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  name: 'project',
  title: 'ผลงาน (Projects)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'ชื่อโปรเจกต์',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (เช่น staybase)',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'description',
      title: 'คำจำกัดความสั้นๆ',
      type: 'text',
    }),
    defineField({
      name: 'mainImage',
      title: 'รูปภาพหลัก',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'challenge',
      title: 'ปัญหาที่แก้ (Challenge)',
      type: 'text',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack ที่ใช้',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});