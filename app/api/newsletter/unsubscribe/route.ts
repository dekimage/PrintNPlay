import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { EMAIL } from "@/lib/email-config";
import { emailTemplates } from "@/lib/email-templates";
import { sendResendEmail } from "@/lib/resend-send";

const resend = new Resend(process.env.RESEND_API_KEY);

const unsubscribeSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = unsubscribeSchema.parse(body);

    // Remove from Resend audience if configured
    if (process.env.RESEND_AUDIENCE_ID) {
      try {
        await resend.contacts.remove({
          email,
          audienceId: process.env.RESEND_AUDIENCE_ID,
        });
        console.log(`Removed ${email} from Resend audience`);
      } catch (audienceError) {
        console.error("Failed to remove from Resend audience:", audienceError);
        // Don't fail the whole request if audience removal fails
      }
    }

    // Send confirmation email to user
    await sendResendEmail(resend, "newsletter-unsubscribe", {
      from: EMAIL.fromBrand,
      to: email,
      subject: "You've been unsubscribed from PrintN'Play Games",
      html: emailTemplates.newsletterUnsubscribe(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 },
    );
  }
}
