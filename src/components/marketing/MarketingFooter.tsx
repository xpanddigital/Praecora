import Link from 'next/link'

export function MarketingFooter() {
  return (
    <footer className="border-t border-black/5 bg-[#fafaf9]">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-6">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-neutral-950"
            >
              Praecora
            </Link>
            <p className="mt-2 font-[var(--font-heading)] text-base italic text-neutral-700">
              Outreach that carries weight.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600">
              The herald that delivers your message to every artist worth knowing.
              Built for music catalog financing scouts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 md:gap-20">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Product
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Field guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Get started
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/demo"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Book a demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Log in
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Legal
              </p>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="text-neutral-700 transition-colors hover:text-neutral-950"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-2 border-t border-black/5 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} Praecora. All rights reserved.
          </p>
          {/* Founder attribution — part of Joel's venture-identity
              pattern (every Xpand site footer links to his /about for
              cross-property entity-graph convergence). Small on
              purpose; not loud branding, just a present signal. */}
          <p className="text-xs text-neutral-500">
            Founded by{' '}
            <a
              href="https://joelhouse.com/about"
              rel="author"
              className="font-medium text-neutral-600 underline-offset-4 hover:text-[#0f0d08] hover:underline"
            >
              Joel House
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
