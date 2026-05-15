import Link from 'next/link'

export function MarketingFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-primary"
            >
              CrateHQ
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Done-for-you Instagram outreach for music catalog financing scouts.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 md:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Product
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Get started
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/demo"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Book a demo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Log in
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Legal
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/legal/privacy"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/terms"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-6">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CrateHQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
