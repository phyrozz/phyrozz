'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Star, Heart, Flower2, Theater, CalendarDays, MapPin, Search } from 'lucide-react'
import ImageLightbox from '@/components/ImageLightbox'

interface Cosplay {
  id: number
  character_name: string
  series: string | null
  description: string | null
  image_keys: string[]
  image_urls: (string | null)[]
  event: string | null
  event_date: string | null
  is_featured: boolean
  sort_order: number
}

interface Props {
  cosplays: Cosplay[]
}

interface LightboxState {
  images: string[]
  title: string
  index: number
}

function formatEventDate(dateStr: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
}

export default function CosplaysSection({ cosplays }: Props) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  if (cosplays.length === 0) return null

  const featured = cosplays.filter((c) => c.is_featured)
  const rest     = cosplays.filter((c) => !c.is_featured)

  function openLightbox(cosplay: Cosplay, index: number) {
    const images = cosplay.image_urls.filter(Boolean) as string[]
    if (images.length === 0) return
    setLightbox({ images, title: cosplay.character_name, index })
  }

  return (
    <section id="cosplays" className="py-16 px-4 bg-gradient-to-br from-blush/20 to-lavender/20 cursor-default">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <Flower2 size={28} className="inline-block mr-3 text-blush-dark pastel-float align-middle" aria-hidden="true" />
          <h2 className="pastel-heading text-3xl md:text-4xl inline-block">Cosplays</h2>
          <Flower2 size={28} className="inline-block ml-3 text-blush-dark pastel-float align-middle" style={{ animationDelay: '0.8s' }} aria-hidden="true" />
          <p className="text-brown-light text-sm font-semibold mt-4 flex items-center justify-center gap-1.5">
            <Star size={13} className="text-honey fill-honey" aria-hidden="true" />
            Characters I&apos;ve brought to life
            <Star size={13} className="text-honey fill-honey" aria-hidden="true" />
          </p>
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-2 gap-5 mb-8 max-w-2xl mx-auto">
            {featured.map((c) => (
              <CosplayCard key={c.id} cosplay={c} featured onOpen={openLightbox} />
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {rest.map((c) => (
              <CosplayCard key={c.id} cosplay={c} onOpen={openLightbox} />
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <ImageLightbox
          images={lightbox.images}
          title={lightbox.title}
          current={lightbox.index}
          onClose={() => setLightbox(null)}
          onPrev={() => setLightbox((lb) => lb ? { ...lb, index: Math.max(0, lb.index - 1) } : null)}
          onNext={() => setLightbox((lb) => lb ? { ...lb, index: Math.min(lb.images.length - 1, lb.index + 1) } : null)}
          onJump={(i) => setLightbox((lb) => lb ? { ...lb, index: i } : null)}
        />
      )}
    </section>
  )
}

interface CardProps {
  cosplay: Cosplay
  featured?: boolean
  onOpen: (cosplay: Cosplay, index: number) => void
}

function CosplayCard({ cosplay, featured = false, onOpen }: CardProps) {
  const validUrls  = cosplay.image_urls.filter(Boolean) as string[]
  const primaryUrl = validUrls[0] ?? null
  const extraCount = validUrls.length - 1

  return (
    <div className={`pastel-card flex flex-col overflow-hidden p-0 ${featured ? 'border-honey-dark' : ''}`}>
      <button
        className="relative w-full aspect-[3/4] bg-cream-dark group focus:outline-none focus-visible:ring-2 focus-visible:ring-honey"
        onClick={() => onOpen(cosplay, 0)}
        disabled={validUrls.length === 0}
        aria-label={`View ${cosplay.character_name} photos`}
      >
        {primaryUrl ? (
          <Image
            src={primaryUrl}
            alt={`${cosplay.character_name} cosplay`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Theater size={40} className="text-brown-light" aria-hidden="true" />
          </div>
        )}

        {validUrls.length > 0 && (
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/30 transition-colors duration-200 flex items-center justify-center">
            <Search size={28} className="text-cream opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" aria-hidden="true" />
          </div>
        )}

        <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none">
          {featured && (
            <span className="flex items-center gap-1 bg-honey/90 text-brown text-xs font-bold px-2 py-0.5 rounded-full border border-honey-dark shadow-sm">
              <Star size={10} className="fill-brown" aria-hidden="true" />
              Featured
            </span>
          )}
          {extraCount > 0 && (
            <span className="ml-auto bg-ink/70 text-cream text-xs font-bold px-2 py-0.5 rounded-full">
              +{extraCount}
            </span>
          )}
        </div>
      </button>

      {validUrls.length > 1 && (
        <div className="flex gap-1 px-2 pt-2 overflow-x-auto">
          {validUrls.slice(1).map((url, i) => (
            <button
              key={i}
              onClick={() => onOpen(cosplay, i + 1)}
              className="relative w-10 h-10 shrink-0 rounded-md overflow-hidden border border-cream-dark hover:border-honey transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-honey"
              aria-label={`View photo ${i + 2}`}
            >
              <Image
                src={url}
                alt={`${cosplay.character_name} photo ${i + 2}`}
                fill
                className="object-cover"
                sizes="40px"
              />
            </button>
          ))}
        </div>
      )}

      <div className="px-3 py-3 flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-1">
          <h3 className="font-extrabold text-ink text-sm leading-tight">{cosplay.character_name}</h3>
          <Heart size={14} className="text-blush-dark fill-blush-dark shrink-0 mt-0.5" aria-hidden="true" />
        </div>

        {cosplay.series && (
          <p className="text-brown-light text-xs font-semibold">{cosplay.series}</p>
        )}

        {cosplay.description && (
          <p className="text-ink/60 text-xs leading-relaxed line-clamp-2">{cosplay.description}</p>
        )}

        {(cosplay.event ?? cosplay.event_date) && (
          <div className="flex flex-wrap gap-1 mt-0.5">
            {cosplay.event && (
              <span className="pastel-badge text-[0.6rem] flex items-center gap-1">
                <MapPin size={9} aria-hidden="true" /> {cosplay.event}
              </span>
            )}
            {cosplay.event_date && (
              <span className="pastel-badge text-[0.6rem] flex items-center gap-1">
                <CalendarDays size={9} aria-hidden="true" /> {formatEventDate(cosplay.event_date)}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
