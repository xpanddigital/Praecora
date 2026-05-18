import { Instagram, Mail, Sparkles, ChevronRight } from 'lucide-react'

type InboxItem = {
  channel: 'instagram' | 'email'
  sender: string
  preview: string
  time: string
  status?: 'interested' | 'needs_response' | 'spam'
  unread?: boolean
}

const ITEMS: InboxItem[] = [
  {
    channel: 'instagram',
    sender: '@indiesoulcollective',
    preview: 'Yeah we\'d be open to a chat about that. What\'s the structure look like?',
    time: '2m ago',
    status: 'interested',
    unread: true,
  },
  {
    channel: 'email',
    sender: 'manager@stoneroselabel.com',
    preview: 'Interesting — can you send the deck? We have 3 catalogs we\'re considering selling.',
    time: '14m ago',
    status: 'interested',
    unread: true,
  },
  {
    channel: 'instagram',
    sender: '@retrowave_official',
    preview: 'Tell me more, never heard of this kind of deal before',
    time: '1h ago',
    status: 'needs_response',
  },
  {
    channel: 'email',
    sender: 'booking@kaleidoscoperecords.io',
    preview: 'Yes, that timing works. How does Tuesday at 2pm sound?',
    time: '3h ago',
    status: 'interested',
  },
  {
    channel: 'instagram',
    sender: '@nightowlmusic',
    preview: 'Not interested but thanks for reaching out',
    time: '5h ago',
    status: 'spam',
  },
]

const STATUS_LABELS = {
  interested: { label: 'Interested', className: 'bg-emerald-50 text-emerald-700 border border-emerald-200' },
  needs_response: { label: 'Needs reply', className: 'bg-amber-50 text-amber-700 border border-amber-200' },
  spam: { label: 'Pass', className: 'bg-neutral-100 text-neutral-500 border border-neutral-200' },
}

export function UnifiedInboxMockup() {
  return (
    <div className="marketing-mock-panel overflow-hidden">
      {/* Mock window chrome */}
      <div className="flex items-center justify-between border-b border-black/5 bg-neutral-50/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        </div>
        <p className="text-[11px] font-medium text-neutral-500">Praecora — Inbox</p>
        <div className="w-12" />
      </div>

      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-black/5 px-5 py-3.5">
        <div>
          <p className="text-base font-semibold text-neutral-950">Inbox</p>
          <p className="mt-0.5 text-xs text-neutral-500">5 conversations · 2 need reply</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-black/10 bg-white px-2.5 py-1 text-xs">
          <Sparkles className="h-3 w-3 text-[#9d8b00]" />
          <span className="font-medium text-neutral-700">AI classified</span>
        </div>
      </div>

      {/* Inbox items */}
      <div className="divide-y divide-black/[0.04]">
        {ITEMS.map((item, i) => {
          const status = item.status ? STATUS_LABELS[item.status] : null
          return (
            <div
              key={i}
              className={`flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-neutral-50/50 ${
                item.unread ? 'bg-[#fffceb]/30' : ''
              }`}
            >
              {/* Channel icon */}
              <div
                className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                  item.channel === 'instagram'
                    ? 'bg-gradient-to-tr from-pink-100 via-orange-50 to-yellow-50 text-pink-600'
                    : 'bg-blue-50 text-blue-600'
                }`}
              >
                {item.channel === 'instagram' ? (
                  <Instagram className="h-4 w-4" />
                ) : (
                  <Mail className="h-4 w-4" />
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate text-sm font-semibold text-neutral-950">
                    {item.sender}
                  </p>
                  <p className="shrink-0 text-[11px] text-neutral-400">{item.time}</p>
                </div>
                <p className="mt-0.5 line-clamp-1 text-sm text-neutral-600">
                  {item.preview}
                </p>
                {status && (
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </div>
                )}
              </div>

              <ChevronRight className="mt-2 h-4 w-4 shrink-0 text-neutral-300" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
