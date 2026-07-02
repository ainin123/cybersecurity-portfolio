import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "aniqaayub4@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject}: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
