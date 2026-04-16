-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_signed_in TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Admins can read all users
CREATE POLICY "Admins can read all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Enrollments table
CREATE TABLE IF NOT EXISTS public.enrollments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(320) NOT NULL,
  mobile_no VARCHAR(20),
  gender VARCHAR(20),
  date_of_birth VARCHAR(20),
  city VARCHAR(120),
  state VARCHAR(120),
  district VARCHAR(120),
  place VARCHAR(120),
  current_status VARCHAR(120),
  profile_data JSONB,
  batch VARCHAR(100) NOT NULL,
  batch_start_date VARCHAR(20) NOT NULL,
  batch_end_date VARCHAR(20) NOT NULL,
  price INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'not_reachable')),
  email_sent INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS mobile_no VARCHAR(20);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS date_of_birth VARCHAR(20);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS city VARCHAR(120);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS state VARCHAR(120);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS district VARCHAR(120);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS place VARCHAR(120);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS current_status VARCHAR(120);
ALTER TABLE public.enrollments ADD COLUMN IF NOT EXISTS profile_data JSONB;

ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert enrollments" ON public.enrollments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage enrollments" ON public.enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE public.enrollments;
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Email subscriptions table
CREATE TABLE IF NOT EXISTS public.email_subscriptions (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) UNIQUE NOT NULL,
  enrollment_updates INTEGER DEFAULT 1,
  course_updates INTEGER DEFAULT 1,
  promotional_emails INTEGER DEFAULT 0,
  weekly_newsletter INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.email_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can manage subscriptions" ON public.email_subscriptions
  FOR ALL WITH CHECK (true);

-- CMS Content table
CREATE TABLE IF NOT EXISTS public.cms_content (
  id SERIAL PRIMARY KEY,
  content_type VARCHAR(50) NOT NULL,
  content_key VARCHAR(255) NOT NULL,
  title TEXT,
  description TEXT,
  content TEXT,
  image_url TEXT,
  metadata JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published content" ON public.cms_content
  FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage content" ON public.cms_content
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Analytics Events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_name VARCHAR(255) NOT NULL,
  user_id UUID REFERENCES public.users(id),
  session_id VARCHAR(255) NOT NULL,
  page_url TEXT,
  referrer TEXT,
  metadata JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert analytics" ON public.analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can read analytics" ON public.analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Calendar Events table
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id SERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location VARCHAR(255),
  instructor_id INTEGER,
  max_capacity INTEGER,
  current_enrollment INTEGER DEFAULT 0,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  metadata JSONB,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read calendar events" ON public.calendar_events
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage calendar events" ON public.calendar_events
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- CRM Leads table
CREATE TABLE IF NOT EXISTS public.crm_leads (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100),
  email VARCHAR(320) NOT NULL,
  phone VARCHAR(20),
  source VARCHAR(100) NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'interested', 'qualified', 'enrolled', 'rejected')),
  lead_score INTEGER DEFAULT 0,
  notes TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.crm_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert leads" ON public.crm_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage leads" ON public.crm_leads
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Lead Interactions table
CREATE TABLE IF NOT EXISTS public.lead_interactions (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER REFERENCES public.crm_leads(id) ON DELETE CASCADE,
  interaction_type VARCHAR(50) NOT NULL,
  subject VARCHAR(255),
  message TEXT,
  status VARCHAR(50) NOT NULL,
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.lead_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage interactions" ON public.lead_interactions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_enrollments_status ON public.enrollments(status);
CREATE INDEX IF NOT EXISTS idx_cms_content_type ON public.cms_content(content_type, status);
CREATE INDEX IF NOT EXISTS idx_analytics_event_type ON public.analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_calendar_dates ON public.calendar_events(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status ON public.crm_leads(status);
CREATE INDEX IF NOT EXISTS idx_lead_interactions_lead_id ON public.lead_interactions(lead_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at BEFORE UPDATE ON public.enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_email_subscriptions_updated_at BEFORE UPDATE ON public.email_subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON public.cms_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_calendar_events_updated_at BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_crm_leads_updated_at BEFORE UPDATE ON public.crm_leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
