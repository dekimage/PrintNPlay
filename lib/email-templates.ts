import { HOME_HERO, LINKS, SITE } from "@/lib/config";

const S = {
  body: "font-family: Arial, sans-serif; line-height: 1.6; color: #111111; background: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px;",
  card: "background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #dddddd;",
  cardAccent: "background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #111111; border-left: 4px solid #111111;",
  heading: "color: #111111; margin-top: 0;",
  subheading: "color: #111111; margin-top: 0;",
  panel: "background: #f5f5f5; padding: 15px; border-radius: 5px; border: 1px solid #dddddd; margin: 15px 0;",
  callout: "background: #f5f5f5; padding: 15px; border-radius: 5px; border-left: 4px solid #111111; margin: 20px 0;",
  messageBox: "white-space: pre-wrap; background: #ffffff; padding: 10px; border-radius: 3px; border: 1px solid #dddddd;",
  footer:
    "margin-top: 30px; padding-top: 15px; border-top: 1px solid #dddddd; font-size: 12px; color: #666666;",
  btnPrimary:
    "background: #111111; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; font-weight: 600;",
  btnSecondary:
    "background: #ffffff; color: #111111; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px; font-weight: 600; border: 1px solid #111111;",
  link: "color: #111111;",
} as const;

const latestGameUrl = HOME_HERO.steamWishlistUrl;
const communityUrl = `${SITE.url}/community`;
const siteUrl = SITE.url;

export const emailTemplates = {
  contactNotification: (data: {
    name: string;
    email: string;
    subject: string;
    message: string;
    ip?: string;
  }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="${S.body}">
      <div style="${S.cardAccent}">
        <h2 style="${S.heading}">New Contact Form Submission</h2>
        
        <div style="${S.panel}">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="${S.link}">${data.email}</a></p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          ${data.ip ? `<p><strong>IP Address:</strong> ${data.ip}</p>` : ""}
        </div>
        
        <div style="${S.panel}">
          <h3 style="${S.subheading}">Message</h3>
          <div style="${S.messageBox}">${data.message}</div>
        </div>
        
        <div style="${S.footer}">
          <p>This message was sent from your website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  contactAutoReply: (data: { name: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
    </head>
    <body style="${S.body}">
      <div style="${S.card}">
        <h2 style="${S.heading}">Message Received</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>Thank you for reaching out to us! We've received your message and will get back to you as soon as possible.</p>
        
        <div style="${S.callout}">
          <h3 style="${S.subheading}">What happens next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>We'll review your message within 24 hours</li>
            <li>You'll receive a personalized response from our team</li>
            <li>If you have urgent questions, feel free to follow up</li>
          </ul>
        </div>
        
        <p>In the meantime, check out our latest game or join our community.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${latestGameUrl}" style="${S.btnPrimary}">
            Our latest Game
          </a>
          <a href="${communityUrl}" style="${S.btnSecondary}">
            Join Community
          </a>
        </div>
        
        <div style="${S.footer}">
          <p>Best regards,<br>The PrintN'Play Games Team</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  newsletterWelcome: (_data: { email: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to PrintN'Play Newsletter</title>
    </head>
    <body style="${S.body}">
      <div style="${S.card}">
        <h2 style="${S.heading}">Welcome to PrintN'Play</h2>
        
        <p>Great news! You've successfully subscribed to our newsletter.</p>
        
        <div style="${S.callout}">
          <h3 style="${S.subheading}">What you'll receive</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>New game releases and updates</li>
            <li>Behind-the-scenes content</li>
            <li>Exclusive patron-only content</li>
            <li>Community highlights and events</li>
          </ul>
        </div>
        
        <p>We're excited to share our latest adventures with you.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${latestGameUrl}" style="${S.btnPrimary}">
            Our latest Game
          </a>
        </div>
        
        <div style="${S.footer}">
          <p>You can unsubscribe at any time by clicking the link in our emails.</p>
          <p>Best regards,<br>The PrintN'Play Games Team</p>
        </div>
      </div>
    </body>
    </html>
  `,

  newsletterNotification: (data: { email: string; ip?: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Newsletter Subscriber</title>
    </head>
    <body style="${S.body}">
      <div style="${S.cardAccent}">
        <h2 style="${S.heading}">New Newsletter Subscriber</h2>
        
        <div style="${S.panel}">
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="${S.link}">${data.email}</a></p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          ${data.ip ? `<p><strong>IP Address:</strong> ${data.ip}</p>` : ""}
        </div>
        
        <div style="${S.footer}">
          <p>This subscriber was added to your newsletter list.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  newsletterUnsubscribe: () => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Unsubscribed from PrintN'Play</title>
    </head>
    <body style="${S.body}">
      <div style="${S.card}">
        <h2 style="${S.heading}">You've been unsubscribed</h2>
        
        <p>We're sorry to see you go! You've been successfully unsubscribed from our newsletter.</p>
        
        <div style="${S.callout}">
          <h3 style="${S.subheading}">Want to stay connected?</h3>
          <p>You can always resubscribe anytime by visiting our website and signing up again.</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${siteUrl}" style="${S.btnPrimary}">
            Visit Our Website
          </a>
          <a href="${LINKS.discord}" style="${S.btnSecondary}">
            Join Discord
          </a>
        </div>
        
        <div style="${S.footer}">
          <p>Best regards,<br>The PrintN'Play Games Team</p>
          <p>If you didn't request this unsubscribe, please contact us.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};
