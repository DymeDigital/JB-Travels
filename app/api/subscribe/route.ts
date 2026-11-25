import { NextResponse } from "next/server";
import { emailLayout, escapeHtml, sendEmail, TEAM_EMAIL } from "@/lib/server/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: "Resend API key is missing from environment variables.", isConfigError: true },
        { status: 500 }
      );
    }

    const result = await sendEmail({
      from: "JB Travel Newsletter <info@jbtravel.co.za>",
      to: [TEAM_EMAIL],
      replyTo: email,
      subject: `New Newsletter Subscriber: ${email}`,
      html: emailLayout(
        "JB Travel - Newsletter Signup",
        `<p>A new visitor subscribed to "Stay Inspired" on your website:</p>
         <p style="padding: 12px 16px; background-color: #f8fafc; border-left: 4px solid #D8B15A; border-radius: 4px; font-size: 16px; color: #0B3D5B; font-weight: bold;">
           ${escapeHtml(email)}
         </p>`,
        "Sent via JB Travel Website Newsletter Signup"
      ),
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    console.error("Subscribe error:", error);
    const message = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
