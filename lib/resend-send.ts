import type { CreateEmailOptions, Resend } from "resend";

type SendEmailPayload = CreateEmailOptions;

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return "***";
  const visible = local.slice(0, 2);
  return `${visible}***@${domain}`;
}

function logResendError(step: string, error: unknown) {
  if (error && typeof error === "object") {
    const err = error as Record<string, unknown>;
    console.error(`[resend] ${step} failed:`, {
      name: err.name,
      message: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  console.error(`[resend] ${step} failed:`, error);
}

/**
 * Resend returns { data, error } and does not throw on API failures.
 * Always use this helper so failed sends are logged and surfaced to the caller.
 */
export async function sendResendEmail(
  resend: Resend,
  step: string,
  payload: SendEmailPayload,
) {
  console.log(`[resend] ${step} → sending`, {
    from: payload.from,
    to: Array.isArray(payload.to)
      ? payload.to.map((address) => maskEmail(String(address)))
      : maskEmail(String(payload.to)),
    subject: payload.subject,
    replyTo: payload.replyTo ? maskEmail(String(payload.replyTo)) : undefined,
  });

  const { data, error } = await resend.emails.send(payload);

  if (error) {
    logResendError(step, error);
    throw error;
  }

  console.log(`[resend] ${step} → accepted by Resend`, {
    id: data?.id,
  });

  return data;
}
