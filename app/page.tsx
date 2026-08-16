/**
 * app/page.tsx
 *
 * Each section is wrapped in its own Suspense boundary so they stream
 * in independently. Slow sections show a skeleton while they load;
 * fast sections appear immediately without waiting for slow ones.
 */
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TableOfContents from '@/components/TableOfContents'
import {
  HeroLoader,
  WorkLoader,
  ProjectsLoader,
  HobbiesLoader,
  MusicLoader,
  CosplaysLoader,
} from '@/components/SectionLoaders'
import {
  HeroSkeleton,
  WorkSkeleton,
  ProjectsSkeleton,
  HobbiesSkeleton,
  MusicSkeleton,
  CosplaysSkeleton,
} from '@/components/Skeletons'

// The navbar needs the preferred display name on its left side. Fetch it
// separately so it doesn't block the rest of the page - it streams in with the hero.
import db from '@/lib/db'

async function fetchDisplayName(): Promise<string | null> {
  try {
    const result = await db.query('SELECT full_name, nickname FROM personal_info LIMIT 1')
    const row = result.rows[0]
    return row?.nickname ?? row?.full_name ?? null
  } catch {
    return null
  }
}

export default async function HomePage() {
  const name = await fetchDisplayName()

  return (
    <>
      <Navbar name={name} />
      <TableOfContents />

      <main className="flex-1">

        {/* -- Hero ------------------------------------------------------- */}
        <Suspense fallback={<HeroSkeleton />}>
          <HeroLoader />
        </Suspense>

        <hr className="pastel-divider" />

        {/* -- Work Experience ------------------------------------------- */}
        <Suspense fallback={<WorkSkeleton />}>
          <WorkLoader />
        </Suspense>

        <hr className="pastel-divider" />

        {/* -- Projects -------------------------------------------------- */}
        <Suspense fallback={<ProjectsSkeleton />}>
          <ProjectsLoader />
        </Suspense>

        <hr className="pastel-divider" />

        {/* -- Music Taste ------------------------------------------------ */}
        <Suspense fallback={<MusicSkeleton />}>
          <MusicLoader />
        </Suspense>

        <hr className="pastel-divider" />

        {/* -- Cosplays -------------------------------------------------- */}
        <Suspense fallback={<CosplaysSkeleton />}>
          <CosplaysLoader />
        </Suspense>

        {/* <hr className="pastel-divider" /> */}

        {/* -- Hobbies --------------------------------------------------- */}
        {/* <Suspense fallback={<HobbiesSkeleton />}>
          <HobbiesLoader />
        </Suspense> */}

        {/* -- Tips & Mantras ------------------------------------------- */}
        {/* <Suspense fallback={<TipsSkeleton />}>
          <TipsLoader />
        </Suspense> */}

      </main>

      <Footer />
    </>
  )
}
