-- Stripe billing schema
--
-- Run manually in Supabase SQL editor. Migrations are not auto-applied
-- in this repo (per project convention).
--
-- Why a separate `scouts` table instead of extending `profiles`:
--   `profiles.id` REFERENCES auth.users(id), so a row can't exist until an
--   auth user does. A paying customer arrives at the Stripe webhook BEFORE
--   we've created their login — Joel invites them later via the existing
--   POST /api/scouts endpoint. The `scouts` table is the canonical billing
--   record; `profile_id` is linked once an auth user is provisioned.
--
-- Naming note: existing columns like `assigned_scout_id` continue to point
-- at `profiles.id` (the in-app scout user). Those are unchanged.

CREATE TABLE IF NOT EXISTS public.partners (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,            -- referral code, e.g. "diego"
    name TEXT NOT NULL,
    email TEXT,
    commission_rate NUMERIC(5,4) NOT NULL DEFAULT 0.30,
    is_active BOOLEAN NOT NULL DEFAULT true,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_partners_slug ON public.partners(slug);

-- Seed Diego
INSERT INTO public.partners (slug, name, email, commission_rate, notes)
VALUES (
    'diego',
    'Diego (RUN Music)',
    NULL,
    0.30,
    'Lifetime 30% on onboarding + recurring revenue from referred scouts. Flat, no decay.'
)
ON CONFLICT (slug) DO NOTHING;


CREATE TABLE IF NOT EXISTS public.scouts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Customer identity (known at signup, before any auth user exists)
    email TEXT NOT NULL,
    full_name TEXT,

    -- Linked auth/profile (set when Joel later invites them via /api/scouts)
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,

    -- Stripe
    stripe_customer_id TEXT UNIQUE,
    stripe_subscription_id TEXT UNIQUE,

    -- Plan
    subscription_tier TEXT NOT NULL CHECK (subscription_tier IN ('starter','growth','pro','whale')),
    billing_cycle TEXT NOT NULL CHECK (billing_cycle IN ('monthly','annual')),

    -- Lifecycle
    status TEXT NOT NULL DEFAULT 'onboarding'
        CHECK (status IN ('onboarding','live','cancelled','refunded')),
    onboarding_paid_at TIMESTAMPTZ,           -- one-time fee captured
    subscription_started_at TIMESTAMPTZ,      -- recurring subscription created (go-live)
    cancelled_at TIMESTAMPTZ,

    -- Attribution
    commission_partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
    referral_code TEXT,                       -- raw ?ref= value as captured

    -- Audit
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scouts_email ON public.scouts(email);
CREATE INDEX IF NOT EXISTS idx_scouts_status ON public.scouts(status);
CREATE INDEX IF NOT EXISTS idx_scouts_stripe_customer ON public.scouts(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_scouts_partner ON public.scouts(commission_partner_id);
CREATE INDEX IF NOT EXISTS idx_scouts_profile ON public.scouts(profile_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_scouts_updated_at ON public.scouts;
CREATE TRIGGER trg_scouts_updated_at
    BEFORE UPDATE ON public.scouts
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_partners_updated_at ON public.partners;
CREATE TRIGGER trg_partners_updated_at
    BEFORE UPDATE ON public.partners
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();


-- Webhook audit trail / idempotency
CREATE TABLE IF NOT EXISTS public.stripe_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id TEXT NOT NULL UNIQUE,            -- Stripe event.id, idempotency key
    type TEXT NOT NULL,
    livemode BOOLEAN NOT NULL DEFAULT false,
    payload JSONB NOT NULL,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    error TEXT,
    related_scout_id UUID REFERENCES public.scouts(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_stripe_events_type ON public.stripe_events(type);
CREATE INDEX IF NOT EXISTS idx_stripe_events_scout ON public.stripe_events(related_scout_id);


-- Money ledger: every charge attributable to a scout, for commission calc
-- Populated from invoice.payment_succeeded + checkout.session.completed webhooks.
-- Keeps Diego's accrual computable without re-querying Stripe.
CREATE TABLE IF NOT EXISTS public.scout_charges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scout_id UUID NOT NULL REFERENCES public.scouts(id) ON DELETE CASCADE,
    stripe_event_id TEXT NOT NULL UNIQUE,     -- source webhook event_id
    stripe_invoice_id TEXT,                   -- for recurring
    stripe_payment_intent_id TEXT,            -- for one-time onboarding
    kind TEXT NOT NULL CHECK (kind IN ('onboarding','subscription','refund')),
    amount_cents INTEGER NOT NULL,            -- positive for charges, negative for refunds
    currency TEXT NOT NULL DEFAULT 'usd',
    occurred_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    commission_partner_id UUID REFERENCES public.partners(id) ON DELETE SET NULL,
    commission_rate NUMERIC(5,4),             -- snapshot of partner rate at time of charge
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scout_charges_scout ON public.scout_charges(scout_id);
CREATE INDEX IF NOT EXISTS idx_scout_charges_partner ON public.scout_charges(commission_partner_id);
CREATE INDEX IF NOT EXISTS idx_scout_charges_occurred ON public.scout_charges(occurred_at);


-- RLS
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stripe_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scout_charges ENABLE ROW LEVEL SECURITY;

-- Admins can read/write everything; scouts can see their own billing row.
-- Webhooks + go-live use service role and bypass RLS.

CREATE POLICY "admins manage partners" ON public.partners
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "admins manage scouts" ON public.scouts
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "scout sees own billing" ON public.scouts
    FOR SELECT USING (profile_id = auth.uid());

CREATE POLICY "admins read stripe events" ON public.stripe_events
    FOR SELECT USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );

CREATE POLICY "admins manage charges" ON public.scout_charges
    FOR ALL USING (
        EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
    );
