/**
 * GHL Conversations API — Instagram DM send + contact lookup.
 *
 * Auth uses Private Integration Tokens (PITs) per sub-account, fetched via
 * `getGHLClient(supabase, igAccountId)` from `./client`.
 *
 * Limitations enforced by Meta (not GHL): you can only send IG messages to
 * contacts who have messaged your connected IG Business account within the
 * last 24 hours. Out-of-window sends will return a 4xx and must be routed to
 * the VA worklist for manual delivery.
 *
 * Verified against GHL docs 2026-05-03:
 *   POST /conversations/messages  with body { type: "IG", contactId, message }
 */

import { logger } from '@/lib/logger'
import type { GHLClient } from './client'

export type SendIgMessageInput = {
  contactId: string
  message: string
  attachments?: string[]
}

export type SendIgMessageResult = {
  messageId: string
  conversationId: string
}

/**
 * Sends an Instagram DM via GHL Conversations API on behalf of the
 * sub-account associated with the provided client.
 *
 * Throws on non-2xx responses with the GHL error body in the message.
 */
export async function sendInstagramMessage(
  client: GHLClient,
  input: SendIgMessageInput
): Promise<SendIgMessageResult> {
  const url = `${client.baseUrl}/conversations/messages`

  const body: Record<string, unknown> = {
    type: 'IG',
    contactId: input.contactId,
    message: input.message,
  }
  if (input.attachments && input.attachments.length > 0) {
    body.attachments = input.attachments
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: client.authHeader,
      Version: client.versionHeader,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => '')
    logger.error('[GHL/Conversations] sendInstagramMessage failed', {
      status: response.status,
      contactId: input.contactId,
      bodyPreview: errorText.slice(0, 500),
    })
    throw new Error(
      `GHL IG send failed (${response.status}): ${errorText.slice(0, 200) || response.statusText}`
    )
  }

  const data = (await response.json()) as {
    messageId?: string
    id?: string
    conversationId?: string
    conversation?: { id?: string }
  }

  return {
    messageId: data.messageId ?? data.id ?? '',
    conversationId: data.conversationId ?? data.conversation?.id ?? '',
  }
}

export type GHLContact = {
  id: string
  firstName?: string | null
  lastName?: string | null
  fullName?: string | null
  email?: string | null
  phone?: string | null
  instagramHandle?: string | null
  raw: Record<string, unknown>
}

/**
 * Fetches a GHL contact by ID and best-effort extracts the Instagram handle.
 *
 * GHL's IG integration stores the IG handle in different places depending on
 * how the contact was created. This function checks (in priority order):
 *   1. customField with key `instagram_handle` or `ig_handle`
 *   2. customField with name matching /instagram/i
 *   3. companyName (legacy GHL pattern for IG contacts)
 *   4. attributionSource if it contains an @-prefixed handle
 *
 * Callers should verify a non-null instagramHandle before relying on it for
 * artist matching.
 */
export async function getContact(
  client: GHLClient,
  contactId: string
): Promise<GHLContact | null> {
  const url = `${client.baseUrl}/contacts/${encodeURIComponent(contactId)}`

  const response = await fetch(url, {
    headers: {
      Authorization: client.authHeader,
      Version: client.versionHeader,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    if (response.status === 404) return null
    const errorText = await response.text().catch(() => '')
    logger.error('[GHL/Conversations] getContact failed', {
      status: response.status,
      contactId,
      bodyPreview: errorText.slice(0, 300),
    })
    return null
  }

  const data = (await response.json()) as { contact?: Record<string, unknown> }
  const c = (data.contact ?? data) as Record<string, unknown>

  return {
    id: String(c.id ?? contactId),
    firstName: (c.firstName as string | undefined) ?? null,
    lastName: (c.lastName as string | undefined) ?? null,
    fullName: (c.contactName as string | undefined) ?? (c.fullNameLowerCase as string | undefined) ?? null,
    email: (c.email as string | undefined) ?? null,
    phone: (c.phone as string | undefined) ?? null,
    instagramHandle: extractInstagramHandle(c),
    raw: c,
  }
}

function extractInstagramHandle(contact: Record<string, unknown>): string | null {
  const customFields = (contact.customField ?? contact.customFields) as
    | Array<{ key?: string; name?: string; value?: unknown }>
    | undefined

  if (Array.isArray(customFields)) {
    // Priority 1: explicit key match
    const byKey = customFields.find(
      f => f.key === 'instagram_handle' || f.key === 'ig_handle'
    )
    if (byKey?.value) return normalizeHandle(String(byKey.value))

    // Priority 2: name contains "instagram"
    const byName = customFields.find(f => /instagram/i.test(f.name ?? ''))
    if (byName?.value) return normalizeHandle(String(byName.value))
  }

  // Priority 3: companyName (legacy)
  const companyName = contact.companyName as string | undefined
  if (companyName?.startsWith('@')) return normalizeHandle(companyName)

  // Priority 4: attributionSource with @handle
  const attribution = contact.attributionSource as string | undefined
  if (attribution) {
    const match = attribution.match(/@([a-zA-Z0-9._]+)/)
    if (match) return normalizeHandle(match[0])
  }

  return null
}

function normalizeHandle(raw: string): string {
  return raw.trim().replace(/^@/, '').toLowerCase()
}
