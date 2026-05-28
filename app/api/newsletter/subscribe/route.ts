import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailTemplates } from "@/lib/email-templates";
import { EMAIL } from "@/lib/email-config";
import { sendResendEmail } from "@/lib/resend-send";

const resend = new Resend(process.env.RESEND_API_KEY);

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

function getResendErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    return String((error as { message: unknown }).message);
  }
  return "Failed to subscribe";
}

export async function POST(request: NextRequest) {
  const requestId = crypto.randomUUID().slice(0, 8);

  try {
    console.log(`[newsletter:${requestId}] POST /api/newsletter/subscribe`);

    if (!process.env.RESEND_API_KEY) {
      console.error(`[newsletter:${requestId}] RESEND_API_KEY is not set`);
      return NextResponse.json(
        { error: "Email is not configured on the server" },
        { status: 503 },
      );
    }

    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);

    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message ?? "Invalid email address";
      console.warn(`[newsletter:${requestId}] validation failed:`, message);
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { email } = parsed.data;
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    console.log(`[newsletter:${requestId}] notifying owner`, {
      subscriber: email,
      ownerInbox: EMAIL.ownerInbox,
      resendDomain: EMAIL.domain,
      ip,
    });

    const notificationResult = await sendResendEmail(
      resend,
      "newsletter-owner-notification",
      {
        from: EMAIL.fromNewsletter,
        to: EMAIL.ownerInbox,
        replyTo: email,
        subject: `New Newsletter Subscriber: ${email}`,
        html: emailTemplates.newsletterNotification({ email, ip }),
      },
    );

    console.log(`[newsletter:${requestId}] completed`, {
      ownerEmailId: notificationResult?.id,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`[newsletter:${requestId}] error:`, error);

    const resendMessage = getResendErrorMessage(error);
    return NextResponse.json(
      {
        error: "Failed to subscribe",
        details:
          process.env.NODE_ENV === "development" ? resendMessage : undefined,
      },
      { status: 500 },
    );
  }
}
