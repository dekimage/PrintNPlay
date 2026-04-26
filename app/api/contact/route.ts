import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailTemplates } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject too long"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long"),
});

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json(
        { error: "Email is not configured on the server" },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { name, email, subject, message } = contactSchema.parse(body);

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    const ownerInbox = process.env.OWNER_EMAIL || "hello@printandplay.games";

    await resend.emails.send({
      from: "Print & Play Contact <noreply@printandplay.games>",
      to: ownerInbox,
      replyTo: email,
      subject: `Contact: ${subject} — ${name}`,
      html: emailTemplates.contactNotification({
        name,
        email,
        subject,
        message,
        ip,
      }),
    });

    await resend.emails.send({
      from: "Print & Play Games <noreply@printandplay.games>",
      to: email,
      subject: "Thank you for contacting Print & Play Games",
      html: emailTemplates.contactAutoReply({ name }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
