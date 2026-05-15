import { Sparkles, Send } from 'lucide-react'

export function AiDrafterMockup() {
  return (
    <div className="marketing-mock-panel overflow-hidden">
      {/* Mock window chrome */}
      <div className="flex items-center justify-between border-b border-black/5 bg-neutral-50/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-300" />
        </div>
        <p className="text-[11px] font-medium text-neutral-500">Cold opener — @indiesoulcollective</p>
        <div className="w-12" />
      </div>

      {/* Artist context panel */}
      <div className="border-b border-black/5 bg-neutral-50/40 px-5 py-4">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
          Artist context (auto-pulled)
        </p>
        <div className="mt-2 space-y-1 text-xs text-neutral-700">
          <p>
            <span className="text-neutral-500">Followers:</span>{' '}
            <span className="font-medium text-neutral-950">42.3K</span>
          </p>
          <p>
            <span className="text-neutral-500">Recent post:</span> Released "Saturn Returns" 4 days ago — 18K plays in week 1
          </p>
          <p>
            <span className="text-neutral-500">Bio mentions:</span> Self-released, NYC-based, working on next EP
          </p>
        </div>
      </div>

      {/* Generated DM */}
      <div className="px-5 py-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#9d8b00]" />
          <p className="text-xs font-semibold text-neutral-700">AI-drafted opener</p>
          <span className="ml-auto text-[10px] text-neutral-500">Generated in 1.2s</span>
        </div>

        <div className="mt-3 rounded-lg border border-black/10 bg-white p-4">
          <p className="text-sm leading-relaxed text-neutral-800">
            Hey — Saturn Returns has been on repeat over here. The way you held that
            arpeggio under the second verse is sick. I work with indie artists on
            catalog financing — most don't realize their masters can be worth real
            money even at your scale. Open to a 15-min chat?
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex gap-2">
            <button className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
              Regenerate
            </button>
            <button className="rounded-md border border-black/10 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50">
              Edit
            </button>
          </div>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-neutral-950 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-neutral-800">
            <Send className="h-3 w-3" />
            Approve & queue
          </button>
        </div>
      </div>
    </div>
  )
}
