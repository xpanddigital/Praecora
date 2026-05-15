export const metadata = {
  title: 'Terms of Service — CrateHQ',
}

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 md:px-6 md:py-24">
      <h1 className="font-[var(--font-heading)] text-4xl italic md:text-5xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Last updated:{' '}
        {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className="prose prose-invert mt-10 max-w-none space-y-8 text-foreground/90">
        <section>
          <h2 className="text-xl font-semibold text-foreground">The service</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            CrateHQ provides done-for-you Instagram outreach for music catalog scouts,
            including platform access, AI-drafted outreach, account management, and a
            unified reply inbox. Specific deliverables vary by tier as described on the
            pricing page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Billing</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Onboarding fees are billed at signup and are non-refundable. Monthly
            subscriptions begin on the day your outreach goes live (typically ~4 weeks
            after onboarding) and are charged monthly thereafter. Annual subscriptions
            are billed yearly with a 2-month discount.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            You may cancel your subscription at any time. Cancellations take effect at
            the end of your current billing period.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Acceptable use</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            CrateHQ is built for legitimate music catalog scouts engaging with artists
            in good faith. Misuse — including spam, harassment, fraudulent claims, or
            attempts to circumvent platform safety measures — will result in account
            termination without refund.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Account safety disclosures</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Instagram outreach involves inherent platform risk. While we invest
            significantly in account longevity, we cannot guarantee any specific
            account will not be banned, restricted, or otherwise affected by Instagram's
            policies. Replacement accounts in the event of bans are included in your
            subscription, subject to fair use.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Results</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We provide volume estimates based on industry typical performance. We do not
            guarantee specific deal counts, reply rates, or commission outcomes — those
            depend on your qualification, follow-up, and offer quality.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Data ownership</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            You own your data. We will export and hand off your AI voice
            configuration, contact database, conversation history, and pipeline data
            on cancellation request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Liability</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            CrateHQ is provided "as is." Our total liability under any claim is limited
            to fees paid in the prior 12 months. We are not liable for consequential or
            indirect damages including lost commissions, lost accounts, or business
            disruption.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Changes</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            We may update these terms. Material changes will be announced via email to
            active customers at least 30 days in advance.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Questions:{' '}
            <a href="mailto:legal@cratehq.io" className="text-primary hover:underline">
              legal@cratehq.io
            </a>
          </p>
        </section>
      </div>
    </div>
  )
}
