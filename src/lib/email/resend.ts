import { Resend } from 'resend'
import { logger } from '@/lib/logger'

let cached: Resend | null = null

function getResend(): Resend | null {
  if (cached) return cached
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  cached = new Resend(key)
  return cached
}

export type AlertEmailInput = {
  subject: string
  html: string
  text?: string
  to?: string
}

/**
 * Send an internal ops alert email (signups, payment failures, etc.).
 *
 * Reads RESEND_FROM and ALERT_EMAIL_TO from env. If RESEND_API_KEY is
 * not configured we log + return — alerts never block the webhook
 * response (Stripe retries 4xx/5xx, we always ack 200 once persisted).
 */
export async function sendOpsAlert(input: AlertEmailInput): Promise<void> {
  const resend = getResend()
  if (!resend) {
    logger.warn('[Resend] Skipping alert — RESEND_API_KEY not set', {
      subject: input.subject,
    })
    return
  }

  const from = process.env.RESEND_FROM ?? 'alerts@praecora.com'
  const to = input.to ?? process.env.ALERT_EMAIL_TO ?? 'joel@xpanddigital.io'

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      subject: input.subject,
      html: input.html,
      ...(input.text ? { text: input.text } : {}),
    })
    if (error) {
      logger.error('[Resend] send returned error:', error)
    }
  } catch (err) {
    logger.error('[Resend] send threw:', err)
  }
}
