/**
 * Async wrapper components — each fetches its own data independently.
 * Wrapped in Suspense on the page, so each streams in as it resolves.
 * Each section is also wrapped in SectionReveal for scroll transitions.
 */
import db from '@/lib/db'
import { getPresignedUrl, getPresignedUrls } from '@/lib/s3'
import HeroSection from '@/components/HeroSection'
import WorkExperienceSection from '@/components/WorkExperienceSection'
import ProjectsSection from '@/components/ProjectsSection'
import HobbiesSection from '@/components/HobbiesSection'
import CosplaysSection from '@/components/CosplaysSection'
import TipsMantrasSection from '@/components/TipsMantrasSection'
import SectionReveal from '@/components/SectionReveal'

// ── Hero ──────────────────────────────────────────────────────────────────────

export async function HeroLoader() {
  try {
    const [infoResult, socialsResult] = await Promise.allSettled([
      db.query('SELECT * FROM personal_info LIMIT 1'),
      db.query('SELECT * FROM socials ORDER BY sort_order ASC'),
    ])

    const infoRow    = infoResult.status    === 'fulfilled' ? (infoResult.value.rows[0] ?? null) : null
    const socialRows = socialsResult.status === 'fulfilled' ? socialsResult.value.rows            : []

    const info = infoRow
      ? await (async () => {
          const [avatarUrl, bannerUrl, resumeUrl] = await getPresignedUrls([
            infoRow.avatar_key,
            infoRow.banner_key,
            infoRow.resume_key,
          ])
          return { ...infoRow, avatar_url: avatarUrl, banner_url: bannerUrl, resume_url: resumeUrl }
        })()
      : null

    const socials = await Promise.all(
      socialRows.map(async (r) => ({ ...r, icon_url: await getPresignedUrl(r.icon_key) })),
    )

    // Hero fades in — no translate so the banner doesn't jump
    return (
      <SectionReveal variant="fade">
        <HeroSection info={info} socials={socials} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade">
        <HeroSection info={null} socials={[]} />
      </SectionReveal>
    )
  }
}

// ── Work Experience ───────────────────────────────────────────────────────────

export async function WorkLoader() {
  try {
    const result = await db.query(
      'SELECT * FROM work_experiences ORDER BY sort_order ASC, start_date DESC',
    )
    const experiences = await Promise.all(
      result.rows.map(async (r) => ({ ...r, logo_url: await getPresignedUrl(r.logo_key) })),
    )
    return (
      <SectionReveal variant="fade-up">
        <WorkExperienceSection experiences={experiences} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade-up">
        <WorkExperienceSection experiences={[]} />
      </SectionReveal>
    )
  }
}

// ── Projects ──────────────────────────────────────────────────────────────────

export async function ProjectsLoader() {
  try {
    const result = await db.query(
      'SELECT * FROM projects ORDER BY is_featured DESC, sort_order ASC',
    )
    const projects = await Promise.all(
      result.rows.map(async (r) => ({ ...r, image_url: await getPresignedUrl(r.image_key) })),
    )
    return (
      <SectionReveal variant="fade-up">
        <ProjectsSection projects={projects} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade-up">
        <ProjectsSection projects={[]} />
      </SectionReveal>
    )
  }
}

// ── Hobbies ───────────────────────────────────────────────────────────────────

export async function HobbiesLoader() {
  try {
    const result = await db.query('SELECT * FROM hobbies ORDER BY sort_order ASC')
    const hobbies = await Promise.all(
      result.rows.map(async (r) => ({ ...r, image_url: await getPresignedUrl(r.image_key) })),
    )
    return (
      <SectionReveal variant="fade-left">
        <HobbiesSection hobbies={hobbies} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade-left">
        <HobbiesSection hobbies={[]} />
      </SectionReveal>
    )
  }
}

// ── Cosplays ──────────────────────────────────────────────────────────────────

export async function CosplaysLoader() {
  try {
    const result = await db.query(
      'SELECT * FROM cosplays ORDER BY is_featured DESC, sort_order ASC',
    )
    const cosplays = await Promise.all(
      result.rows.map(async (r) => ({
        ...r,
        image_urls: await getPresignedUrls(r.image_keys ?? []),
      })),
    )
    return (
      <SectionReveal variant="fade-right">
        <CosplaysSection cosplays={cosplays} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade-right">
        <CosplaysSection cosplays={[]} />
      </SectionReveal>
    )
  }
}

// ── Tips & Mantras ────────────────────────────────────────────────────────────

export async function TipsLoader() {
  try {
    const result = await db.query('SELECT * FROM tips_mantras ORDER BY sort_order ASC')
    return (
      <SectionReveal variant="fade-up">
        <TipsMantrasSection items={result.rows} />
      </SectionReveal>
    )
  } catch {
    return (
      <SectionReveal variant="fade-up">
        <TipsMantrasSection items={[]} />
      </SectionReveal>
    )
  }
}
