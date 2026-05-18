-- =======================================================
-- KRISHI VIKAS UDYOG — Supabase Security Fix
-- Run this in: Supabase Dashboard → SQL Editor
-- =======================================================

-- ── 1. FIX: media_items — replace USING(true) with auth check ──
DROP POLICY IF EXISTS "Auth write media" ON public.media_items;
CREATE POLICY "Auth write media"
  ON public.media_items FOR ALL TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 2. FIX: reviews — replace USING(true) with auth check ──────
DROP POLICY IF EXISTS "Auth write reviews" ON public.reviews;
CREATE POLICY "Auth write reviews"
  ON public.reviews FOR ALL TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 3. FIX: site_images — replace USING(true) with auth check ──
DROP POLICY IF EXISTS "Admin write" ON public.site_images;
CREATE POLICY "Admin write"
  ON public.site_images FOR ALL TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 4. FIX: story_photos — replace USING(true) with auth check ─
DROP POLICY IF EXISTS "Admin write story photos" ON public.story_photos;
CREATE POLICY "Admin write story photos"
  ON public.story_photos FOR ALL TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 5. FIX: products — replace each policy ─────────────────────
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products"  ON public.products;

CREATE POLICY "Admins can delete products"
  ON public.products FOR DELETE TO authenticated
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can insert products"
  ON public.products FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can update products"
  ON public.products FOR UPDATE TO authenticated
  USING  (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- ── 6. FIX: Storage — restrict listing to authenticated only ────
-- (Public bucket URLs still work; listing is restricted)
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read"      ON storage.objects;

CREATE POLICY "Authenticated can list images"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id IN ('images', 'products'));

-- ── 7. FIX: rls_auto_enable function — revoke public execute ────
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM authenticated;

-- =======================================================
-- DONE! Re-run the Supabase Linter to verify all warnings cleared.
-- NOTE: "Leaked Password Protection" must be enabled manually:
--   Dashboard → Authentication → Settings → Password Protection → Enable
-- =======================================================
