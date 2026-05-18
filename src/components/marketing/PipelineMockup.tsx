type Stage = {
  name: string
  count: number
  color: string
  cards: { artist: string; meta: string }[]
}

const STAGES: Stage[] = [
  {
    name: 'Contacted',
    count: 18,
    color: 'bg-neutral-100 text-neutral-700',
    cards: [
      { artist: '@valencia.music', meta: '32K · email + IG' },
      { artist: 'Marcus K.', meta: '$280K catalog' },
      { artist: '@jacobaldridge', meta: '12K · IG' },
    ],
  },
  {
    name: 'Replied',
    count: 7,
    color: 'bg-blue-50 text-blue-700 border border-blue-200',
    cards: [
      { artist: '@indiesoulcollective', meta: '42K · interested' },
      { artist: 'Stone Rose Label', meta: '3 catalogs · email' },
    ],
  },
  {
    name: 'Call booked',
    count: 4,
    color: 'bg-amber-50 text-amber-700 border border-amber-200',
    cards: [
      { artist: 'Kaleidoscope Records', meta: 'Tue 2pm · $1.2M est.' },
      { artist: '@nightcallband', meta: 'Thu 10am · $400K' },
    ],
  },
  {
    name: 'Closed',
    count: 2,
    color: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    cards: [
      { artist: 'Fern Avery', meta: '$85K · 10% commission' },
    ],
  },
]

export function PipelineMockup() {
  return (
    <div className="marketing-mock-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-black/5 bg-neutral-50/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        </div>
        <p className="text-[11px] font-medium text-neutral-500">Praecora — Pipeline</p>
        <div className="w-12" />
      </div>

      <div className="grid grid-cols-2 gap-3 p-4 md:grid-cols-4">
        {STAGES.map((stage) => (
          <div key={stage.name}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-neutral-950">{stage.name}</p>
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${stage.color}`}
              >
                {stage.count}
              </span>
            </div>
            <div className="space-y-2">
              {stage.cards.map((card, i) => (
                <div
                  key={i}
                  className="rounded-md border border-black/10 bg-white p-2.5"
                >
                  <p className="truncate text-xs font-medium text-neutral-950">
                    {card.artist}
                  </p>
                  <p className="mt-0.5 truncate text-[11px] text-neutral-500">
                    {card.meta}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
