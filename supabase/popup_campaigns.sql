-- Popup Campaigns Table
-- Drop everything first for clean slate
DROP TABLE IF EXISTS popup_campaigns CASCADE;
DROP TYPE IF EXISTS campaign_type CASCADE;
DROP TYPE IF EXISTS display_mode CASCADE;

CREATE TYPE campaign_type AS ENUM ('notice', 'offer', 'campaign', 'alert');
CREATE TYPE display_mode AS ENUM ('popup', 'banner-top', 'banner-bottom');

CREATE TABLE popup_campaigns (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  image_url TEXT,
  cta_text TEXT,
  cta_link TEXT,
  is_active BOOLEAN NOT NULL DEFAULT false,
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  type campaign_type NOT NULL DEFAULT 'notice',
  display_mode display_mode NOT NULL DEFAULT 'popup',
  priority INTEGER NOT NULL DEFAULT 0,
  dismissible BOOLEAN NOT NULL DEFAULT true,
  delay_seconds INTEGER NOT NULL DEFAULT 0,
  show_once BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE popup_campaigns ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Popup campaigns are publicly readable"
  ON popup_campaigns
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Authenticated users can insert campaigns"
  ON popup_campaigns
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Authenticated users can update campaigns"
  ON popup_campaigns
  FOR UPDATE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Authenticated users can delete campaigns"
  ON popup_campaigns
  FOR DELETE
  TO authenticated
  USING (auth.role() = 'authenticated');

-- Index
CREATE INDEX IF NOT EXISTS idx_popup_campaigns_active ON popup_campaigns(is_active, priority DESC, created_at DESC) WHERE is_active = true;
