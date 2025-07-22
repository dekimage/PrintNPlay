import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { emailTemplates } from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);

const subscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = subscribeSchema.parse(body);
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";

    // Send welcome email to subscriber
    await resend.emails.send({
      from: "Print & Play Games <noreply@printandplay.games>",
      to: email,
      subject: "Welcome to Print & Play Games Newsletter! 🎲",
      html: emailTemplates.newsletterWelcome({ email }),
    });

    // Send notification email to site owner
    await resend.emails.send({
      from: "Print & Play <noreply@printandplay.games>",
      to: process.env.OWNER_EMAIL || "hello@printandplay.games",
      subject: `New Newsletter Subscriber: ${email}`,
      html: emailTemplates.newsletterNotification({ email, ip }),
    });

    // Optional: Add to Resend audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
        console.log(`Added ${email} to Resend audience`);
      } catch (audienceError) {
        console.error("Failed to add to Resend audience:", audienceError);
        // Don't fail the whole request if audience creation fails
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
