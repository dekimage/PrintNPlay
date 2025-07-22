export const emailTemplates = {
  // Contact form notification to owner
  contactNotification: (data: {
    name: string;
    email: string;
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
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff;">
        <h2 style="color: #007bff; margin-top: 0;">📧 New Contact Form Submission</h2>
        
        <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>👤 Name:</strong> ${data.name}</p>
          <p><strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>🕒 Timestamp:</strong> ${new Date().toLocaleString()}</p>
          ${data.ip ? `<p><strong>🌐 IP Address:</strong> ${data.ip}</p>` : ""}
        </div>
        
        <div style="background: #f8f9fa; padding: 15px; border-radius: 5px; border: 1px solid #dee2e6;">
          <h3 style="margin-top: 0;">💬 Message:</h3>
          <div style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 3px;">${data.message}</div>
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
          <p>This message was sent from your website contact form.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Auto-reply to contact form sender
  contactAutoReply: (data: { name: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank you for contacting us</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h2 style="color: #28a745; margin-top: 0;">✅ Message Received!</h2>
        
        <p>Hi ${data.name},</p>
        
        <p>Thank you for reaching out to us! We've received your message and will get back to you as soon as possible.</p>
        
        <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #007bff;">What happens next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>We'll review your message within 24 hours</li>
            <li>You'll receive a personalized response from our team</li>
            <li>If you have urgent questions, feel free to follow up</li>
          </ul>
        </div>
        
        <p>In the meantime, why not check out our latest games or join our community?</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL || "https://printandplay.games"}/games" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
            🎲 Browse Games
          </a>
          <a href="${process.env.SITE_URL || "https://printandplay.games"}/community" 
             style="background: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 5px;">
            👥 Join Community
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
          <p>Best regards,<br>The Print & Play Games Team</p>
          <p>This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Newsletter subscription confirmation
  newsletterWelcome: (data: { email: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Print & Play Newsletter</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px;">
        <h2 style="color: #28a745; margin-top: 0;">🎉 Welcome to Print & Play!</h2>
        
        <p>Great news! You've successfully subscribed to our newsletter.</p>
        
        <div style="background: #e7f3ff; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #007bff;">What you'll receive:</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>🎲 New game releases and updates</li>
            <li>📝 Behind-the-scenes content</li>
            <li>🎯 Exclusive patron-only content</li>
            <li>🏆 Community highlights and events</li>
          </ul>
        </div>
        
        <p>We're excited to share our latest tabletop adventures with you!</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.SITE_URL || "https://printandplay.games"}/games" 
             style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            🎲 Explore Our Games
          </a>
        </div>
        
        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
          <p>You can unsubscribe at any time by clicking the link in our emails.</p>
          <p>Best regards,<br>The Print & Play Games Team</p>
        </div>
      </div>
    </body>
    </html>
  `,

  // Newsletter subscription notification to owner
  newsletterNotification: (data: { email: string; ip?: string }) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Newsletter Subscriber</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
        <h2 style="color: #28a745; margin-top: 0;">📬 New Newsletter Subscriber</h2>
        
        <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
          <p><strong>📧 Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
          <p><strong>🕒 Timestamp:</strong> ${new Date().toLocaleString()}</p>
          ${data.ip ? `<p><strong>🌐 IP Address:</strong> ${data.ip}</p>` : ""}
        </div>
        
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #dee2e6; font-size: 12px; color: #6c757d;">
          <p>This subscriber was added to your newsletter list.</p>
        </div>
      </div>
    </body>
    </html>
  `,
};
