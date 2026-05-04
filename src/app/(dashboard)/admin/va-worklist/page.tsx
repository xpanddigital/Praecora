'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Loader2,
  Copy,
  CheckCircle2,
  AlertTriangle,
  Inbox,
  ExternalLink,
  RefreshCw,
} from 'lucide-react'

interface WorklistMessage {
  id: string
  ig_account_id: string
  target_username: string
  message_text: string
  scheduled_for: string
  artist_id: string | null
  artists: { name: string; instagram_handle: string | null } | null
}

interface IGAccount {
  id: string
  ig_username: string
  daily_cold_dm_limit?: number | null
}

interface AccountStats {
  total: number
  sent_today: number
  remaining_today: number
  next_scheduled: string | null
}

const DEFAULT_DAILY_LIMIT = 20

export default function VAWorklistPage() {
  const [messages, setMessages] = useState<WorklistMessage[]>([])
  const [igAccounts, setIgAccounts] = useState<IGAccount[]>([])
  const [accountStats, setAccountStats] = useState<Record<string, AccountStats>>({})
  const [selectedAccountId, setSelectedAccountId] = useState<string>('all')
  const [loading, setLoading] = useState(true)
  const [markingSentIds, setMarkingSentIds] = useState<Set<string>>(new Set())
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const { toast } = useToast()
  const supabase = createClient()

  const fetchData = async () => {
    setLoading(true)
    try {
      // 1. Fetch active IG accounts
      const { data: accountsData, error: accountsError } = await supabase
        .from('ig_accounts')
        .select('id, ig_username, daily_cold_dm_limit')
        .eq('is_active', true)
        .order('ig_username', { ascending: true })

      if (accountsError) throw accountsError
      setIgAccounts(accountsData || [])

      // 2. Fetch approved + pending cold DMs (the VA's queue)
      const { data: messagesData, error: messagesError } = await supabase
        .from('pending_outbound_messages')
        .select(`
          id,
          ig_account_id,
          target_username,
          message_text,
          scheduled_for,
          artist_id,
          artists ( name, instagram_handle )
        `)
        .eq('outreach_type', 'cold')
        .eq('is_approved', true)
        .eq('status', 'pending')
        .lte('scheduled_for', new Date().toISOString()) // only show messages whose time has come
        .order('scheduled_for', { ascending: true })

      if (messagesError) throw messagesError

      const formatted = (messagesData || []).map((m: any) => ({
        ...m,
        artists: Array.isArray(m.artists) ? m.artists[0] : m.artists,
      }))
      setMessages(formatted)

      // 3. Compute per-account stats (sent today + remaining)
      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      const { data: sentToday, error: sentError } = await supabase
        .from('pending_outbound_messages')
        .select('ig_account_id')
        .eq('outreach_type', 'cold')
        .eq('status', 'sent')
        .gte('sent_at', todayStart.toISOString())

      if (sentError) throw sentError

      const sentCounts: Record<string, number> = {}
      ;(sentToday || []).forEach((row: any) => {
        sentCounts[row.ig_account_id] = (sentCounts[row.ig_account_id] || 0) + 1
      })

      const stats: Record<string, AccountStats> = {}
      ;(accountsData || []).forEach((acct: IGAccount) => {
        const sentTodayCount = sentCounts[acct.id] || 0
        const limit = acct.daily_cold_dm_limit ?? DEFAULT_DAILY_LIMIT
        const queueForAccount = formatted.filter(m => m.ig_account_id === acct.id)
        const nextScheduled = queueForAccount[0]?.scheduled_for || null
        stats[acct.id] = {
          total: queueForAccount.length,
          sent_today: sentTodayCount,
          remaining_today: Math.max(0, limit - sentTodayCount),
          next_scheduled: nextScheduled,
        }
      })
      setAccountStats(stats)
    } catch (error: any) {
      console.error('VA Worklist fetch error:', error)
      toast({
        title: 'Error loading worklist',
        description: error.message || 'Unknown error',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredMessages = useMemo(() => {
    if (selectedAccountId === 'all') return messages
    return messages.filter(m => m.ig_account_id === selectedAccountId)
  }, [messages, selectedAccountId])

  const accountUsernameMap = useMemo(() => {
    const m: Record<string, string> = {}
    igAccounts.forEach(a => {
      m[a.id] = a.ig_username
    })
    return m
  }, [igAccounts])

  const handleCopy = async (msg: WorklistMessage) => {
    try {
      await navigator.clipboard.writeText(msg.message_text)
      setCopiedId(msg.id)
      setTimeout(() => setCopiedId(prev => (prev === msg.id ? null : prev)), 1500)
    } catch (e) {
      toast({
        title: 'Copy failed',
        description: 'Browser blocked clipboard access',
        variant: 'destructive',
      })
    }
  }

  const handleMarkSent = async (msg: WorklistMessage) => {
    setMarkingSentIds(prev => new Set(prev).add(msg.id))
    try {
      const { error } = await supabase
        .from('pending_outbound_messages')
        .update({
          status: 'sent',
          sent_at: new Date().toISOString(),
        })
        .eq('id', msg.id)

      if (error) throw error

      // Optimistically remove from local list + bump sent_today stat
      setMessages(prev => prev.filter(m => m.id !== msg.id))
      setAccountStats(prev => {
        const next = { ...prev }
        const acct = next[msg.ig_account_id]
        if (acct) {
          next[msg.ig_account_id] = {
            ...acct,
            total: Math.max(0, acct.total - 1),
            sent_today: acct.sent_today + 1,
            remaining_today: Math.max(0, acct.remaining_today - 1),
          }
        }
        return next
      })

      toast({
        title: 'Marked sent',
        description: `DM to @${msg.target_username} recorded.`,
      })
    } catch (error: any) {
      toast({
        title: 'Failed to mark sent',
        description: error.message || 'Unknown error',
        variant: 'destructive',
      })
    } finally {
      setMarkingSentIds(prev => {
        const next = new Set(prev)
        next.delete(msg.id)
        return next
      })
    }
  }

  const handleCopyAndMarkSent = async (msg: WorklistMessage) => {
    await handleCopy(msg)
    await handleMarkSent(msg)
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-[var(--font-heading)]">VA Worklist</h1>
          <p className="text-muted-foreground mt-1">
            Today&apos;s queued cold DMs ready to send. Copy each message, send manually on the cloud phone, then mark as sent.
          </p>
        </div>
        <Button onClick={fetchData} variant="outline" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Per-account stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {igAccounts.map(acct => {
          const stats = accountStats[acct.id]
          if (!stats) return null
          const limit = acct.daily_cold_dm_limit ?? DEFAULT_DAILY_LIMIT
          const atLimit = stats.remaining_today === 0
          return (
            <Card
              key={acct.id}
              className={`cursor-pointer transition-colors ${
                selectedAccountId === acct.id ? 'border-primary' : ''
              }`}
              onClick={() => setSelectedAccountId(prev => (prev === acct.id ? 'all' : acct.id))}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium truncate">@{acct.ig_username}</div>
                  {atLimit && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Limit hit
                    </Badge>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Queue</div>
                    <div className="font-bold text-base">{stats.total}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Sent today</div>
                    <div className="font-bold text-base">{stats.sent_today}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Cap left</div>
                    <div className={`font-bold text-base ${atLimit ? 'text-destructive' : ''}`}>
                      {stats.remaining_today}/{limit}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div>
              <CardTitle>Send Queue</CardTitle>
              <CardDescription>
                {filteredMessages.length} ready to send
                {selectedAccountId !== 'all' && ` from @${accountUsernameMap[selectedAccountId] || ''}`}
              </CardDescription>
            </div>
            <Select value={selectedAccountId} onValueChange={setSelectedAccountId}>
              <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by IG account" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All accounts</SelectItem>
                {igAccounts.map(acct => (
                  <SelectItem key={acct.id} value={acct.id}>
                    @{acct.ig_username}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Inbox className="h-8 w-8 mx-auto text-muted-foreground mb-3 opacity-50" />
              <h3 className="font-medium text-lg">All clear</h3>
              <p className="text-muted-foreground text-sm mt-1">
                No DMs queued
                {selectedAccountId !== 'all' && ' for this account'}
                . Approved messages will appear here when ready to send.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[170px]">From IG</TableHead>
                    <TableHead className="w-[200px]">Target</TableHead>
                    <TableHead className="min-w-[400px]">Message</TableHead>
                    <TableHead className="w-[260px] text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map(msg => {
                    const sending = markingSentIds.has(msg.id)
                    return (
                      <TableRow key={msg.id}>
                        <TableCell className="font-medium text-sm">
                          @{accountUsernameMap[msg.ig_account_id] || 'Unknown'}
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-sm">
                            {msg.artists?.name || msg.target_username}
                          </div>
                          <a
                            href={`https://instagram.com/${msg.target_username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary inline-flex items-center gap-1"
                          >
                            @{msg.target_username}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm whitespace-pre-wrap leading-relaxed">
                            {msg.message_text}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCopy(msg)}
                              disabled={sending}
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <CheckCircle2 className="h-4 w-4 mr-1.5 text-green-500" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-4 w-4 mr-1.5" />
                                  Copy
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleCopyAndMarkSent(msg)}
                              disabled={sending}
                            >
                              {sending ? (
                                <Loader2 className="h-4 w-4 mr-1.5 animate-spin" />
                              ) : (
                                <CheckCircle2 className="h-4 w-4 mr-1.5" />
                              )}
                              Copy &amp; Mark Sent
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
