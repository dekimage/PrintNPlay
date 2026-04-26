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
    console.log("🔍 Newsletter subscription API called");
    console.log("📧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
    console.log("📧 OWNER_EMAIL:", process.env.OWNER_EMAIL || "NOT SET");
    console.log(
      "📧 RESEND_AUDIENCE_ID:",
      process.env.RESEND_AUDIENCE_ID || "NOT SET"
    );

    const body = await request.json();
    console.log("📝 Request body:", body);

    const { email } = subscribeSchema.parse(body);
    console.log("✅ Validation passed:", { email });

    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "Unknown";
    console.log("🌐 IP Address:", ip);

    // Send welcome email to subscriber
    console.log("📤 Sending welcome email to subscriber...");
    try {
      const welcomeResult = await resend.emails.send({
        from: "Print & Play Games <noreply@printandplay.games>",
        to: email,
        subject: "Welcome to Print & Play Games Newsletter! 🎲",
        html: emailTemplates.newsletterWelcome({ email }),
      });
      console.log("✅ Welcome email sent:", welcomeResult);
    } catch (welcomeError) {
      console.error("❌ Welcome email failed:", welcomeError);
      throw welcomeError;
    }

    // Send notification email to site owner
    console.log("📤 Sending notification email to owner...");
    try {
      const notificationResult = await resend.emails.send({
        from: "Print & Play <noreply@printandplay.games>",
        to: process.env.OWNER_EMAIL || "hello@printandplay.games",
        subject: `New Newsletter Subscriber: ${email}`,
        html: emailTemplates.newsletterNotification({ email, ip }),
      });
      console.log("✅ Owner notification sent:", notificationResult);
    } catch (notificationError) {
      console.error("❌ Owner notification failed:", notificationError);
      throw notificationError;
    }

    // Optional: Add to Resend audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      console.log("📊 Adding to Resend audience...");
      try {
        const audienceResult = await resend.contacts.create({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
        console.log("✅ Added to audience:", audienceResult);
      } catch (audienceError) {
        console.error("❌ Failed to add to audience:", audienceError);
        // Don't fail the whole request if audience creation fails
      }
    } else {
      console.log(
        "⚠️ No RESEND_AUDIENCE_ID configured, skipping audience addition"
      );
    }

    console.log("🎉 Newsletter subscription completed successfully!");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("💥 Newsletter subscription error:", error);

    if (error instanceof z.ZodError) {
      console.error("📝 Validation error:", error.errors);
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Log Resend-specific errors
    if (error && typeof error === "object" && "message" in error) {
      console.error("📧 Resend error details:", {
        message: error.message,
        statusCode: (error as any).statusCode,
        code: (error as any).code,
      });
    }

    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
