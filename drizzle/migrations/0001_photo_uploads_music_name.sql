ALTER TABLE public.invitation_requests ALTER COLUMN preferred_slug SET DEFAULT gen_random_uuid()::text;
ALTER TABLE public.invitation_requests ADD COLUMN IF NOT EXISTS music_name text;
COMMENT ON COLUMN public.invitation_requests.music_url IS 'DEPRECATED: replaced by music_name';
COMMENT ON COLUMN public.invitation_requests.preferred_slug IS 'DEPRECATED: no longer collected; auto-generated';

CREATE POLICY "Anyone can upload invitation photos"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'invitation-photos');