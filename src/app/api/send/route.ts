// src/app/api/send/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, service, message } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // ใช้โดเมนเทสของ Resend ไปก่อน
      to: ["hello@azeinx.com"], // 👈 ใส่อีเมลของคุณที่จะรับข้อความ
      subject: `ข้อความใหม่จาก ${name} - ${service}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
          <h2>มีผู้ติดต่อใหม่จากหน้าเว็บ Portfolio!</h2>
          <p><strong>ชื่อ:</strong> ${name}</p>
          <p><strong>อีเมล:</strong> ${email}</p>
          <p><strong>บริการที่สนใจ:</strong> ${service}</p>
          <p><strong>รายละเอียดโปรเจกต์:</strong><br/> ${message}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }
}
