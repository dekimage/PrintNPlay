import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailTemplates } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  email: z.string().email("Invalid email address"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message too long"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = contactSchema.parse(body);
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    // Send notification email to owner
    await resend.emails.send({
      from: "Print & Play Contact <noreply@printandplay.games>",
      to: process.env.OWNER_EMAIL || "hello@printandplay.games",
      replyTo: email,
      subject: `Contact Form: Message from ${name}`,
      html: emailTemplates.contactNotification({ name, email, message, ip }),
    });

    // Send auto-reply to the sender
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
