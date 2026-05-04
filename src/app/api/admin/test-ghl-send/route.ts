import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createServiceClient } from '@/lib/supabase/service'
import { requireGHLClient } from '@/lib/ghl/client'
import { sendInstagramMessage } from '@/lib/ghl/conversations'
import { logger } from '@/lib/logger'

/**
 * Admin-only test endpoint for verifying GHL Instagram send works end-to-end
 * for a configured ig_account.
 *
 * Usage:
 *   POST /api/admin/test-ghl-send
 *   { "ig_account_id": "xxx", "contact_id": "ghl_contact_xxx", "message": "hi" }
 *
 * Will fail with a 4xx from GHL if the contact has not messaged the IG account
 * within the last 24 hours (Meta policy).
 */
export async function POST(request: NextRequest) {
  try {
    // Auth: must be authenticated admin
    const supabase = await createClient()
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 })
    }

    const body = await request.json()
    const { ig_account_id, contact_id, message } = body as {
      ig_account_id?: string
      contact_id?: string
      message?: string
    }

    if (!ig_account_id || !contact_id || !message) {
      return NextResponse.json(
        { error: 'Missing required: ig_account_id, contact_id, message' },
        { status: 400 }
      )
    }

    // Use service client for GHL credential fetch (bypasses RLS)
    const serviceSupabase = createServiceClient()
    const ghlClient = await requireGHLClient(serviceSupabase, ig_account_id)

    const result = await sendInstagramMessage(ghlClient, {
      contactId: contact_id,
      message,
    })

    return NextResponse.json({
      success: true,
      message_id: result.messageId,
      conversation_id: result.conversationId,
    })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : 'Unknown error'
    logger.error('[Test GHL Send] Failed:', error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
