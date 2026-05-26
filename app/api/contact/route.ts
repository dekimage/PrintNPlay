import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailTemplates } from "@/lib/email-templates";
import { EMAIL } from "@/lib/email-config";
import { sendResendEmail } from "@/lib/resend-send";

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

function getResendErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Failed to send message";
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID().slice(0, 8);

  try {
    console.log(`[contact:${requestId}] POST /api/contact`);

    if (!process.env.RESEND_API_KEY) {
      console.error(`[contact:${requestId}] RESEND_API_KEY is not set`);
      return NextResponse.json(
        { error: "Email is not configured on the server" },
        { status: 503 },
      );
    }

    const ownerInbox = EMAIL.ownerInbox;
    console.log(`[contact:${requestId}] config`, {
      ownerInboxConfigured: Boolean(process.env.OWNER_EMAIL),
      ownerInbox,
      resendDomain: EMAIL.domain,
      fromOwner: EMAIL.fromContact,
      fromAutoReply: EMAIL.fromBrand,
    });

    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid form data";
      console.warn(`[contact:${requestId}] validation failed:`, {
        issues: parsed.error.errors.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      });
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { name, email, subject, message } = parsed.data;

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    console.log(`[contact:${requestId}] validated`, {
      name,
      email,
      subject,
      messageLength: message.length,
      ip,
    });

    const ownerResult = await sendResendEmail(resend, "owner-notification", {
      from: EMAIL.fromContact,
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

    const autoReplyResult = await sendResendEmail(resend, "visitor-auto-reply", {
      from: EMAIL.fromBrand,
      to: email,
      subject: "Thank you for contacting PrintN'Play Games",
      html: emailTemplates.contactAutoReply({ name }),
    });

    console.log(`[contact:${requestId}] completed`, {
      ownerEmailId: ownerResult?.id,
      autoReplyEmailId: autoReplyResult?.id,
    });

    return NextResponse.json({
      success: true,
      ownerEmailId: ownerResult?.id,
      autoReplyEmailId: autoReplyResult?.id,
    });
  } catch (error) {
    console.error(`[contact:${requestId}] unexpected error:`, error);

    const resendMessage = getResendErrorMessage(error);
    console.error(`[contact:${requestId}] resend message:`, resendMessage);

    return NextResponse.json(
      {
        error: "Failed to send message",
        details:
          process.env.NODE_ENV === "development" ? resendMessage : undefined,
      },
      { status: 500 },
    );
  }
}
