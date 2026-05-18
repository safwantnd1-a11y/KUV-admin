-- Hero Gallery Table
-- Supports multiple images, videos (MP4, WebM), and GIFs for the hero background slideshow

CREATE TABLE IF NOT EXISTS hero_gallery (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  url TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('image', 'video', 'gif')),
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE hero_gallery ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Hero gallery is publicly readable"
  ON hero_gallery
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert hero media"
  ON hero_gallery
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete hero media"
  ON hero_gallery
  FOR DELETE
  TO authenticated
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update hero media"
  ON hero_gallery
  FOR UPDATE
  TO authenticated
  USING (true);

-- Index for ordering
CREATE INDEX IF NOT EXISTS idx_hero_gallery_display_order ON hero_gallery(display_order);
