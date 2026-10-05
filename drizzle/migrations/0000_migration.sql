CREATE TABLE public.invitation_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  design_id text NOT NULL,
  design_name text NOT NULL,
  preferred_slug text NOT NULL UNIQUE,
  groom jsonb NOT NULL DEFAULT '{}'::jsonb,
  bride jsonb NOT NULL DEFAULT '{}'::jsonb,
  wedding_date date,
  start_time time,
  end_time time,
  invitation_start date,
  invitation_end date,
  no_religious_opening boolean NOT NULL DEFAULT false,
  opening_text text,
  inviter text,
  venue_name text,
  venue_address text,
  city text,
  maps_url text,
  events jsonb NOT NULL DEFAULT '[]'::jsonb,
  music_url text,
  music_enabled boolean NOT NULL DEFAULT false,
  photo_urls jsonb NOT NULL DEFAULT '[]'::jsonb,
  whatsapp_number text NOT NULL,
  email text,
  display_contacts jsonb NOT NULL DEFAULT '[]'::jsonb,
  CONSTRAINT slug_format CHECK (preferred_slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' AND length(preferred_slug) BETWEEN 3 AND 80),
  CONSTRAINT whatsapp_format CHECK (whatsapp_number ~ '^\+[1-9][0-9]{6,14}$')
);
GRANT INSERT ON public.invitation_requests TO anon, authenticated;
GRANT ALL ON public.invitation_requests TO service_role;
ALTER TABLE public.invitation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a request" ON public.invitation_requests FOR INSERT TO anon, authenticated WITH CHECK (true);