-- ============================================
-- Mentors & Reviews Tables for Real-Time CMS
-- ============================================

-- Mentors table
CREATE TABLE IF NOT EXISTS mentors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  experience VARCHAR(100),
  focus VARCHAR(255),
  image_url TEXT,
  tag1 VARCHAR(100),
  tag2 VARCHAR(100),
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  rating INT DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS policies (optional, adjust as needed)
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow public read for published mentors/reviews
CREATE POLICY "Public read mentors" ON mentors FOR SELECT USING (is_active = true);
CREATE POLICY "Public read reviews" ON reviews FOR SELECT USING (is_active = true);

-- Allow service role full access
CREATE POLICY "Service role full access mentors" ON mentors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access reviews" ON reviews FOR ALL USING (true) WITH CHECK (true);

-- Seed default mentors
INSERT INTO mentors (name, title, description, experience, focus, image_url, tag1, tag2, sort_order) VALUES
('Priya Sharma', 'Curriculum & Teaching Methods Specialist', 'Expert in teaching pedagogy with focus on modern curriculum design and innovative engagement techniques for educators.', '10+ Years', 'Curriculum Design', '/expert_profile_1_1776280727429.png', 'Lesson Planning', 'Engagement', 1),
('Gajesh Kumar', 'Classroom Management & Leadership Coach', 'Trained thousands of teachers in effective classroom leadership, behavioural management, and student motivation strategies.', '12+ Years', 'Classroom Leadership', '/expert_profile_2_1776280747423.png', 'Management', 'Leadership', 2),
('Ananya Iyer', 'Digital Pedagogy & EdTech Innovator', 'Pioneers digital-first teaching methods using smart tools and interactive platforms for the next generation of educators.', '5+ Years', 'Digital Pedagogy', '/expert_profile_1_1776280727429.png', 'EdTech', 'Innovation', 3),
('Sneha Rao', 'Primary Education Strategist', 'Designs student-first classroom systems and practical engagement routines for foundational years.', '12+ Years', 'Foundational Learning', '/expert_profile_2_1776280747423.png', 'Child-Centered', 'Pedagogy', 4),
('Rahul Varma', 'EdTech & Blended Learning Lead', 'Specializes in integrating digital tools, LMS workflows, and hybrid lesson delivery across grades.', '8+ Years', 'Technology Integration', '/expert_profile_1_1776280727429.png', 'EdTech Tools', 'Hybrid Learning', 5),
('Meera Nair', 'Inclusive Teaching Mentor', 'Supports educators in differentiated instruction and building inclusive, high-confidence classrooms.', '10+ Years', 'Special Education', '/expert_profile_2_1776280747423.png', 'Inclusion', 'Differentiation', 6),
('Anand Singh', 'Assessment & Feedback Coach', 'Helps teachers build outcome-driven assessments and meaningful feedback strategies for better progress.', '14+ Years', 'Assessment Systems', '/expert_profile_1_1776280727429.png', 'Formative', 'Summative', 7);

-- Seed default reviews
INSERT INTO reviews (name, role, content, rating, image_url) VALUES
('Sarah Johnson', 'Secondary Teacher', 'This program transformed my teaching approach completely! The mentors are incredibly knowledgeable and supportive.', 5, NULL),
('Vikram Desai', 'Primary Educator', 'Best investment in my teaching career. The practical techniques I learned are now part of my daily routine. Highly recommended!', 5, NULL),
('Aisha Patel', 'Aspiring Teacher', 'Even as someone just starting out, I found the course material very accessible and the community incredibly welcoming.', 5, NULL),
('David Chen', 'School Administrator', 'We enrolled our entire staff and the improvement in teaching quality across the school has been remarkable.', 4, NULL);
