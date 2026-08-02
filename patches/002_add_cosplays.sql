-- ============================================================
--  Patch: add cosplays table
--  Run: psql -U postgres -d reimu_portfolio -f patches/002_add_cosplays.sql
-- ============================================================

CREATE TABLE IF NOT EXISTS cosplays (
  id            SERIAL PRIMARY KEY,
  character_name TEXT        NOT NULL,          -- e.g. "Reimu Hakurei"
  series        TEXT,                           -- e.g. "Touhou Project"
  description   TEXT,                           -- notes, event worn at, etc.
  image_keys    TEXT[]       NOT NULL DEFAULT '{}', -- multiple S3 keys, one per photo
  event         TEXT,                           -- convention / event name
  event_date    DATE,
  is_featured   BOOLEAN      NOT NULL DEFAULT FALSE,
  sort_order    INT          NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- auto-update trigger
DROP TRIGGER IF EXISTS trg_cosplays_updated_at ON cosplays;
CREATE TRIGGER trg_cosplays_updated_at
  BEFORE UPDATE ON cosplays
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ── Example seed data ────────────────────────────────────────
-- Replace with your real cosplay entries.

INSERT INTO cosplays (character_name, series, description, event, event_date, is_featured, sort_order)
VALUES
  ('Reimu Hakurei', 'Touhou Project', 'Full shrine maiden outfit with yin-yang orbs.', 'AniManGaki 2024', '2024-08-10', TRUE,  1),
  ('Your Character', 'Your Series',   'Short description of the cosplay.',              NULL,              NULL,         FALSE, 2)
ON CONFLICT DO NOTHING;
