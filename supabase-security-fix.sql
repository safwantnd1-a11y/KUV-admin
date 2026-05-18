-- ============================================================
-- Supabase Security Fix Script
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- Fix 1: RLS Policies - Replace permissive (true) with proper conditions
-- ============================================================

-- media_items - only allow owner to modify
DROP POLICY IF EXISTS "Auth write media" ON public.media_items;
CREATE POLICY "Auth can manage own media" ON public.media_items
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- products - only allow authenticated users
DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Authenticated can manage products" ON public.products
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- reviews - only allow owner
DROP POLICY IF EXISTS "Auth write reviews" ON public.reviews;
CREATE POLICY "Auth can manage own reviews" ON public.reviews
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- site_images - only authenticated users
DROP POLICY IF EXISTS "Admin write" ON public.site_images;
CREATE POLICY "Authenticated can manage site_images" ON public.site_images
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- story_photos - only authenticated users
DROP POLICY IF EXISTS "Admin write story photos" ON public.story_photos;
CREATE POLICY "Authenticated can manage story_photos" ON public.story_photos
  FOR ALL USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');


-- ============================================================
-- Fix 2: Remove file listing from public buckets
-- (Public URLs still work, but users can't list all files)
-- ============================================================

-- Images bucket - remove listing policy
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;

-- Products bucket - remove listing policy
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;


-- ============================================================
-- Fix 3: Secure rls_auto_enable function
-- Only service_role (backend) can call it
-- ============================================================

REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM anon;
REVOKE ALL ON FUNCTION public.rls_auto_enable() FROM authenticated;
GRANT EXECUTE ON FUNCTION public.rls_auto_enable() TO service_role;


-- ============================================================
-- Verify RLS is enabled on all tables
-- ============================================================

ALTER TABLE public.media_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.story_photos ENABLE ROW LEVEL SECURITY;


-- ============================================================
-- Done!
-- ============================================================

-- Manual step required:
-- Go to Supabase Dashboard → Authentication → Providers → Email
-- Enable "Password protect against leaked passwords"