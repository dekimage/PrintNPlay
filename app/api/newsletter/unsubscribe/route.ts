import { type NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

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
    await resend.emails.send({
      from: "Print & Play Games <noreply@printandplay.games>",
      to: email,
      subject: "You've been unsubscribed from Print & Play Games",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Unsubscribed from Print & Play</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
            <h2 style="color: #dc3545; margin-top: 0;">👋 You've been unsubscribed</h2>
            
            <p>We're sorry to see you go! You've been successfully unsubscribed from our newsletter.</p>
            
            <div style="background: #fff3cd; padding: 15px; border-radius: 5px; border-left: 4px solid #ffc107; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #856404;">Want to stay connected?</h3>
              <p>You can always resubscribe anytime by visiting our website and signing up again.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.SITE_URL || "https://printandplay.games"}" 
                 style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                🎲 Visit Our Website
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
              <p>Best regards,<br>The Print & Play Games Team</p>
              <p>If you didn't request this unsubscribe, please contact us.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to unsubscribe" },
      { status: 500 }
    );
  }
}
