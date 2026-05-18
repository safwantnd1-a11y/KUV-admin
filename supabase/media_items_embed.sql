-- Add embed support to media_items table
ALTER TABLE media_items ADD COLUMN IF NOT EXISTS embed_url TEXT;
ALTER TABLE media_items ADD COLUMN IF NOT EXISTS platform TEXT;

-- Update type constraint to allow 'embed'
-- Note: If using ENUM type, you may need to alter it:
-- ALTER TYPE media_type ADD VALUE IF NOT EXISTS 'embed';
-- If using TEXT column, no change needed.
