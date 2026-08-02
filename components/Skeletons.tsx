/**
 * Skeleton loaders shown while each section streams in.
 * All use the same pastel palette as the rest of the site.
 */

import type { CSSProperties } from 'react'

function Bone({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      className={`bg-cream-dark rounded-xl animate-pulse ${className}`}
      style={style}
      aria-hidden="true"
    />
  )
}

export function HeroSkeleton() {
  return (
    <section aria-label="Loading profile..." className="relative overflow-hidden">
      <div className="w-full h-48 md:h-64 bg-cream-dark animate-pulse" />
      <div className="bg-cream pb-12 px-4">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-4 -mt-16">
          <div className="w-32 h-32 rounded-full bg-blush-dark animate-pulse border-4 border-honey" />
          <Bone className="h-8 w-48" />
          <Bone className="h-4 w-64" />
          <Bone className="h-4 w-full max-w-md" />
          <Bone className="h-4 w-3/4 max-w-sm" />
          <div className="flex gap-2 flex-wrap justify-center">
            <Bone className="h-6 w-28 rounded-full" />
            <Bone className="h-6 w-36 rounded-full" />
            <Bone className="h-6 w-24 rounded-full" />
          </div>
          <div className="flex gap-3">
            <Bone className="h-9 w-24 rounded-full" />
            <Bone className="h-9 w-24 rounded-full" />
            <Bone className="h-9 w-24 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function WorkSkeleton() {
  return (
    <section aria-label="Loading experience..." className="py-16 px-4 max-w-3xl mx-auto">
      <Bone className="h-9 w-52 mx-auto mb-10" />
      <div className="flex flex-col gap-8 pl-14">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4">
            <Bone className="w-12 h-12 shrink-0 rounded-xl" />
            <div className="flex-1 flex flex-col gap-2">
              <Bone className="h-4 w-40" />
              <Bone className="h-3 w-28" />
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function ProjectsSkeleton() {
  return (
    <section aria-label="Loading projects..." className="py-16 px-4 max-w-6xl mx-auto">
      <Bone className="h-9 w-36 mx-auto mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-cream-dark bg-white p-5 flex flex-col gap-3">
            <Bone className="w-full h-44 rounded-xl" />
            <Bone className="h-4 w-32" />
            <Bone className="h-3 w-full" />
            <Bone className="h-3 w-4/5" />
            <div className="flex gap-1.5 flex-wrap">
              <Bone className="h-5 w-16 rounded-full" />
              <Bone className="h-5 w-20 rounded-full" />
              <Bone className="h-5 w-14 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function HobbiesSkeleton() {
  return (
    <section aria-label="Loading hobbies..." className="py-16 px-4 max-w-5xl mx-auto">
      <Bone className="h-9 w-32 mx-auto mb-10" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-cream-dark bg-white p-4 flex flex-col items-center gap-3">
            <Bone className="w-20 h-20 rounded-full" />
            <Bone className="h-3 w-16" />
            <Bone className="h-3 w-24" />
          </div>
        ))}
      </div>
    </section>
  )
}

export function MusicSkeleton() {
  return (
    <section aria-label="Loading music taste..." className="py-16 px-4 max-w-6xl mx-auto">
      <Bone className="h-9 w-44 mx-auto mb-10" />
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-2xl border-2 border-cream-dark bg-white p-6 flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <Bone className="w-24 h-24 rounded-3xl shrink-0" />
            <div className="flex-1 flex flex-col gap-2">
              <Bone className="h-3 w-28" />
              <Bone className="h-5 w-40" />
              <Bone className="h-3 w-full" />
              <Bone className="h-3 w-5/6" />
            </div>
          </div>
          <Bone className="h-24 w-full rounded-3xl" />
          <div className="flex flex-wrap gap-2">
            <Bone className="h-6 w-20 rounded-full" />
            <Bone className="h-6 w-28 rounded-full" />
            <Bone className="h-6 w-24 rounded-full" />
          </div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border-2 border-cream-dark bg-white p-4 flex flex-col gap-3">
              <Bone className="h-4 w-24" />
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="flex items-center gap-3">
                  <Bone className="h-11 w-11 rounded-xl shrink-0" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Bone className="h-3 w-28" />
                    <Bone className="h-3 w-20" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CosplaysSkeleton() {
  return (
    <section aria-label="Loading cosplays..." className="py-16 px-4 max-w-6xl mx-auto">
      <Bone className="h-9 w-36 mx-auto mb-10" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-cream-dark bg-white overflow-hidden">
            <Bone className="w-full rounded-none" style={{ aspectRatio: '3/4' }} />
            <div className="p-3 flex flex-col gap-2">
              <Bone className="h-3 w-24" />
              <Bone className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function TipsSkeleton() {
  return (
    <section aria-label="Loading tips..." className="py-16 px-4 max-w-4xl mx-auto">
      <Bone className="h-9 w-44 mx-auto mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border-2 border-cream-dark bg-white p-5 flex flex-col gap-3">
            <Bone className="h-6 w-6" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
            <Bone className="h-3 w-24 mt-auto" />
          </div>
        ))}
      </div>
    </section>
  )
}
