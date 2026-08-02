-- ============================================================
--  Patch: add nickname to personal_info
--  Run: psql -U postgres -d reimu_portfolio -f patches/003_add_personal_info_nickname.sql
-- ============================================================

ALTER TABLE personal_info
  ADD COLUMN IF NOT EXISTS nickname TEXT;

-- Optional seed update
-- If you already have a row, you can set nickname manually:
-- UPDATE personal_info SET nickname = 'Reimu' WHERE id = 1;
