-- ============================================================
--  Reimu Portfolio – PostgreSQL Schema
--  Run this file on your PostgreSQL database to set up all tables.
--  After running, seed your data using INSERT statements.
-- ============================================================

-- ---------------------------------------------------------
-- personal_info
-- One-row table that stores your profile details.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS personal_info (
  id            SERIAL PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  nickname      TEXT,                          -- preferred / casual name
  tagline       TEXT,                          -- short headline / role
  bio           TEXT,                          -- longer "about me" paragraph
  email         TEXT,
  mobile        TEXT,
  city          TEXT,
  country       TEXT,
  birthdate     DATE,
  avatar_key    TEXT,                          -- S3 object key for profile photo
  banner_key    TEXT,                          -- S3 object key for banner / hero image
  resume_key    TEXT,                          -- S3 object key for downloadable résumé PDF
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- socials
-- One row per social link (GitHub, LinkedIn, Twitter, etc.)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS socials (
  id         SERIAL PRIMARY KEY,
  platform   TEXT        NOT NULL,   -- e.g. "GitHub", "LinkedIn", "Twitter"
  url        TEXT        NOT NULL,
  icon_key   TEXT,                   -- optional S3 key for a custom platform icon
  sort_order INT         NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- projects
-- Portfolio projects, optionally linked to GitHub.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
  id            SERIAL PRIMARY KEY,
  title         TEXT        NOT NULL,
  description   TEXT,
  tech_stack    TEXT[],               -- e.g. ARRAY['Next.js','TypeScript','PostgreSQL']
  github_url    TEXT,
  live_url      TEXT,
  image_key     TEXT,                 -- S3 object key for project screenshot / thumbnail
  is_featured   BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order    INT         NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- hobbies
-- Things you do for fun outside of work.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS hobbies (
  id          SERIAL PRIMARY KEY,
  name        TEXT        NOT NULL,
  description TEXT,
  image_key   TEXT,                   -- S3 object key for hobby illustration
  sort_order  INT         NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- work_experiences
-- Employment history, newest first by sort_order.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS work_experiences (
  id           SERIAL PRIMARY KEY,
  company      TEXT        NOT NULL,
  role         TEXT        NOT NULL,
  description  TEXT,
  start_date   DATE        NOT NULL,
  end_date     DATE,                  -- NULL means "present"
  logo_key     TEXT,                  -- S3 object key for company logo
  company_url  TEXT,
  sort_order   INT         NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- tips_mantras
-- Personal tips, quotes, or mantras you want to share.
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS tips_mantras (
  id         SERIAL PRIMARY KEY,
  content    TEXT        NOT NULL,   -- the tip / mantra text
  category   TEXT,                   -- e.g. "Life", "Engineering", "Mindset"
  author     TEXT,                   -- leave NULL if it's your own original
  sort_order INT         NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  Helpful trigger: auto-update updated_at on every UPDATE
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$
DECLARE
  t TEXT;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'personal_info',
    'socials',
    'projects',
    'hobbies',
    'work_experiences',
    'tips_mantras'
  ] LOOP
    EXECUTE format(
      'DROP TRIGGER IF EXISTS trg_%I_updated_at ON %I;
       CREATE TRIGGER trg_%I_updated_at
       BEFORE UPDATE ON %I
       FOR EACH ROW EXECUTE FUNCTION set_updated_at();',
      t, t, t, t
    );
  END LOOP;
END;
$$;

-- ============================================================
--  Example seed data  –  replace with your own details
-- ============================================================

-- Personal info
INSERT INTO personal_info (full_name, tagline, bio, email, mobile, city, country, birthdate)
VALUES (
  'Your Name',
  'Software Engineer · Full-Stack Developer',
  'A passionate developer who loves building things for the web.',
  'you@example.com',
  '+63 9XX XXX XXXX',
  'Manila',
  'Philippines',
  '2000-01-01'
) ON CONFLICT DO NOTHING;

-- Socials
INSERT INTO socials (platform, url, sort_order) VALUES
  ('GitHub',   'https://github.com/yourusername',             1),
  ('LinkedIn', 'https://linkedin.com/in/yourusername',        2),
  ('Twitter',  'https://twitter.com/yourusername',            3)
ON CONFLICT DO NOTHING;

-- Projects  (fill in real details)
INSERT INTO projects (title, description, tech_stack, github_url, is_featured, sort_order) VALUES
  ('Reimu Portfolio',
   'My personal portfolio built with Next.js, PostgreSQL, and AWS S3.',
   ARRAY['Next.js','TypeScript','PostgreSQL','Tailwind CSS','AWS S3'],
   'https://github.com/yourusername/reimu-portfolio',
   TRUE, 1)
ON CONFLICT DO NOTHING;

-- Hobbies
INSERT INTO hobbies (name, description, sort_order) VALUES
  ('Reading',  'Mostly sci-fi and engineering books.', 1),
  ('Gaming',   'RPGs and strategy games.',             2),
  ('Cooking',  'Experimenting with new recipes.',      3)
ON CONFLICT DO NOTHING;

-- Work experiences
INSERT INTO work_experiences (company, role, description, start_date, end_date, sort_order) VALUES
  ('Awesome Company',
   'Software Engineer',
   'Worked on full-stack features using React and Node.js.',
   '2022-06-01', NULL, 1)
ON CONFLICT DO NOTHING;

-- Tips & mantras
INSERT INTO tips_mantras (content, category, sort_order) VALUES
  ('Ship it, then iterate.',                        'Engineering', 1),
  ('Read the docs before asking Stack Overflow.',   'Engineering', 2),
  ('Rest is part of the process.',                  'Life',        3)
ON CONFLICT DO NOTHING;
