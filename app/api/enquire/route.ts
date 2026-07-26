import { NextResponse } from "next/server";
import https from "https";

// Use raw https instead of Resend SDK to bypass Next.js's patched fetch,
// which blocks outbound requests from route handlers in this Next.js version.
function sendViaResend(apiKey: string, payload: object): Promise<any> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: "api.resend.com",
      path: "/emails",
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, packageName, country, message } = body;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Resend API key is missing from environment variables.", isConfigError: true },
        { status: 500 }
      );
    }

    const emailSubject = packageName
      ? `New Package Enquiry: ${packageName} - ${name || "Client"}`
      : `New General Enquiry - ${name || "Client"}`;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0;">
        <div style="background-color: #0B3D5B; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
          <h2 style="color: #D8B15A; margin: 0; font-size: 24px;">JB Travel - Package Enquiry</h2>
        </div>
        <div style="padding: 24px; background-color: #ffffff;">
          <p style="font-size: 16px; color: #1e293b;">You have received a new luxury travel package enquiry from your website:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
           <tr>
  <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B; width: 140px;">Enquiry Type:</td>
  <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155; font-weight: bold;">${packageName ? `${packageName}${country ? ` (${country})` : ""}` : "General Enquiry"}</td>
</tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B;">Client Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${name || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B;">Client Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;"><a href="mailto:${email}" style="color: #27C7D9;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-weight: bold; color: #0B3D5B;">Phone Number:</td>
              <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; color: #334155;">${phone || "Not provided"}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background-color: #f8fafc; border-left: 4px solid #D8B15A; border-radius: 4px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; color: #0B3D5B;">Message / Travel Preferences:</p>
            <p style="margin: 0; color: #475569; white-space: pre-wrap; font-size: 14px;">${message || "No additional message."}</p>
          </div>
          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}" style="background-color: #0B3D5B; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
              Reply Directly to Client (${email})
            </a>
          </div>
        </div>
        <div style="padding: 16px; text-align: center; background-color: #f1f5f9; border-radius: 0 0 8px 8px; font-size: 12px; color: #64748b;">
          Sent via JB Travel Website Enquiry System
        </div>
      </div>
    `;

    const result = await sendViaResend(apiKey, {
      from: "JB Travel Enquiries <info@jbtravel.co.za>",
      to: ["brandon@jbtravel.co.za"],
      reply_to: email,
      subject: emailSubject,
      html: htmlContent,
    });

    console.log("Resend response:", result.status, result.body);

    if (result.status !== 200) {
      return NextResponse.json(
        { error: result.body?.message || result.body?.name || "Failed to send email." },
        { status: result.status || 500 }
      );
    }

    return NextResponse.json({ success: true, id: result.body?.id });
  } catch (error: any) {
    console.error("Resend API Error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
