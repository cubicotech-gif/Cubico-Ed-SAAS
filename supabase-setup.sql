-- ═══════════════════════════════════════════════════════════
-- CUBICO TECHNOLOGIES — Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor (Dashboard > SQL)
-- ═══════════════════════════════════════════════════════════

-- 1. Demo Requests Table (from the contact/demo form)
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  position TEXT DEFAULT '',
  employees TEXT DEFAULT '',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'demo_scheduled', 'converted', 'closed')),
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Newsletter Signups Table
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT DEFAULT '',
  email TEXT NOT NULL UNIQUE,
  subscribed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies — Allow anonymous inserts (public form submissions)
CREATE POLICY "Allow public demo request inserts"
  ON demo_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow public newsletter signups"
  ON newsletter_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 5. RLS Policies — Only authenticated users (admin) can read/update/delete
CREATE POLICY "Allow authenticated read on demo_requests"
  ON demo_requests
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated update on demo_requests"
  ON demo_requests
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated delete on demo_requests"
  ON demo_requests
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated read on newsletter_signups"
  ON newsletter_signups
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated delete on newsletter_signups"
  ON newsletter_signups
  FOR DELETE
  TO authenticated
  USING (true);

-- 6. Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON demo_requests(email);
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created ON demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_signups(email);

-- ═══════════════════════════════════════════════════════════
-- DONE! Your Supabase database is ready.
-- Next: Copy your Project URL and Anon Key from
-- Supabase Dashboard > Settings > API
-- and paste them into your .env.local file.
-- ═══════════════════════════════════════════════════════════
