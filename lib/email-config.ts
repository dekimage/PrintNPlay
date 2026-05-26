/** Verified Resend sending domain (override with RESEND_FROM_DOMAIN in env). */
const fromDomain = process.env.RESEND_FROM_DOMAIN || "printnplaygames.com";
const noreplyAddress = `noreply@${fromDomain}`;

export const EMAIL = {
  domain: fromDomain,
  noreply: noreplyAddress,
  /** Public-facing contact address shown on the site */
  hello: process.env.CONTACT_EMAIL || `hello@${fromDomain}`,
  /** Inbox for contact + newsletter notifications */
  ownerInbox: process.env.OWNER_EMAIL || `hello@${fromDomain}`,
  fromContact: `PrintN'Play Contact <${noreplyAddress}>`,
  fromBrand: `PrintN'Play Games <${noreplyAddress}>`,
  fromNewsletter: `PrintN'Play <${noreplyAddress}>`,
} as const;
