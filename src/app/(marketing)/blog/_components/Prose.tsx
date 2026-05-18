import { cn } from '@/lib/utils'

/**
 * Editorial prose container. Tuned for long-form articles on the
 * Praecora cream background. Uses arbitrary Tailwind selectors so
 * nested markdown-style markup looks correct without per-element
 * className noise inside each post.
 *
 * Type scale leans large — Praecora reads like a magazine, not a
 * SaaS doc site.
 */
export function Prose({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'prose-praecora',
        'mx-auto w-full max-w-[680px]',
        // Body
        '[&>p]:my-7 [&>p]:text-[17px] [&>p]:leading-[1.75] [&>p]:text-neutral-700',
        '[&>p]:md:text-[18px]',
        // Headings
        '[&>h2]:mt-20 [&>h2]:mb-6 [&>h2]:scroll-mt-24 [&>h2]:text-balance',
        '[&>h2]:text-3xl [&>h2]:md:text-4xl [&>h2]:font-bold [&>h2]:tracking-tight [&>h2]:text-[#0f0d08]',
        '[&>h2]:leading-[1.15]',
        '[&>h3]:mt-12 [&>h3]:mb-4 [&>h3]:text-xl [&>h3]:md:text-2xl',
        '[&>h3]:font-semibold [&>h3]:tracking-tight [&>h3]:text-[#0f0d08]',
        '[&>h3]:leading-[1.25]',
        '[&>h4]:mt-10 [&>h4]:mb-3 [&>h4]:text-base [&>h4]:font-semibold [&>h4]:uppercase',
        '[&>h4]:tracking-[0.12em] [&>h4]:text-neutral-600',
        // Lists
        '[&>ul]:my-7 [&>ul]:space-y-3 [&>ul]:pl-0',
        '[&>ul>li]:relative [&>ul>li]:pl-7 [&>ul>li]:text-[17px] [&>ul>li]:md:text-[18px]',
        '[&>ul>li]:leading-[1.7] [&>ul>li]:text-neutral-700',
        '[&>ul>li]:before:absolute [&>ul>li]:before:left-0 [&>ul>li]:before:top-[0.6em]',
        '[&>ul>li]:before:h-[6px] [&>ul>li]:before:w-[6px] [&>ul>li]:before:rounded-full',
        '[&>ul>li]:before:bg-[#b8531d]',
        '[&>ol]:my-7 [&>ol]:list-decimal [&>ol]:space-y-3 [&>ol]:pl-6',
        '[&>ol>li]:pl-2 [&>ol>li]:text-[17px] [&>ol>li]:md:text-[18px]',
        '[&>ol>li]:leading-[1.7] [&>ol>li]:text-neutral-700',
        '[&>ol>li]:marker:font-mono [&>ol>li]:marker:text-neutral-400',
        // Emphasis
        '[&_strong]:font-semibold [&_strong]:text-[#0f0d08]',
        '[&_em]:font-[var(--font-heading)] [&_em]:italic [&_em]:text-[#0f0d08]',
        // Links
        '[&_a]:font-medium [&_a]:text-[#b8531d] [&_a]:underline [&_a]:underline-offset-[3px]',
        '[&_a]:decoration-[#b8531d]/30 hover:[&_a]:decoration-[#b8531d]',
        '[&_a]:transition-colors',
        // Inline code
        '[&_code]:rounded [&_code]:bg-[#f4eee2] [&_code]:px-1.5 [&_code]:py-0.5',
        '[&_code]:font-mono [&_code]:text-[0.875em] [&_code]:text-[#7a2a0f]',
        // Blockquotes
        '[&>blockquote]:my-10 [&>blockquote]:border-l-2 [&>blockquote]:border-[#b8531d]',
        '[&>blockquote]:pl-6 [&>blockquote]:font-[var(--font-heading)] [&>blockquote]:italic',
        '[&>blockquote]:text-xl [&>blockquote]:md:text-2xl [&>blockquote]:leading-[1.4]',
        '[&>blockquote]:text-[#0f0d08]',
        '[&>blockquote_p]:my-2 [&>blockquote_p]:text-inherit',
        // HR — printer's ornament feel
        '[&>hr]:my-16 [&>hr]:border-0 [&>hr]:text-center',
        '[&>hr]:after:content-["✻_✻_✻"] [&>hr]:after:text-[#b8531d] [&>hr]:after:tracking-[0.4em]',
        // Tables
        '[&>table]:my-10 [&>table]:w-full [&>table]:border-collapse',
        '[&>table_th]:border-b [&>table_th]:border-[#0f0d08] [&>table_th]:px-3 [&>table_th]:py-3',
        '[&>table_th]:text-left [&>table_th]:text-xs [&>table_th]:font-semibold',
        '[&>table_th]:uppercase [&>table_th]:tracking-[0.12em] [&>table_th]:text-[#0f0d08]',
        '[&>table_td]:border-b [&>table_td]:border-black/10 [&>table_td]:px-3 [&>table_td]:py-3',
        '[&>table_td]:text-sm [&>table_td]:text-neutral-700 [&>table_td]:align-top',
        className,
      )}
    >
      {children}
    </div>
  )
}

/** Editorial pull-quote, larger than blockquote for true centerpieces. */
export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-16 border-y border-[#b8531d]/20 py-10">
      <p className="text-balance text-center font-[var(--font-heading)] text-3xl italic leading-[1.2] text-[#0f0d08] md:text-4xl">
        {children}
      </p>
    </div>
  )
}

/** Inline rust-accent callout for a single sentence of emphasis. */
export function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="my-8 text-balance text-xl leading-[1.5] text-[#0f0d08] md:text-[22px]">
      {children}
    </p>
  )
}

/**
 * Editorial callout for asides — used for "operator's note," "honest read,"
 * caveat boxes. Rust hairline, cream interior, narrow.
 */
export function Callout({
  label,
  children,
}: {
  label?: string
  children: React.ReactNode
}) {
  return (
    <aside className="my-10 rounded-lg border border-[#b8531d]/30 bg-[#fdf1ea] p-6">
      {label ? (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#7a2a0f]">
          {label}
        </p>
      ) : null}
      <div className="text-[16px] leading-[1.65] text-[#0f0d08] [&>p]:my-2 [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
        {children}
      </div>
    </aside>
  )
}
