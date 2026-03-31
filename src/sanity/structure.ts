import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio Content') // เปลี่ยนชื่อ Title หลักให้ดูเป็นเว็บเรามากขึ้น
    .items([
      // 👇 เพิ่มเมนูผลงานให้อยู่ด้านบนสุด
      S.documentTypeListItem('project').title('ผลงาน (Projects)'),
      S.divider(),
      
      // เมนูของ Blog เดิม
      S.documentTypeListItem('post').title('Posts'),
      S.documentTypeListItem('category').title('Categories'),
      S.documentTypeListItem('author').title('Authors'),
      S.divider(),
      
      ...S.documentTypeListItems().filter(
        (item) => item.getId() && !['post', 'category', 'author', 'project'].includes(item.getId()!), // อย่าลืมเพิ่ม 'project' ตรงนี้เพื่อไม่ให้เมนูซ้ำ
      ),
    ])