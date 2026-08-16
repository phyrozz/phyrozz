import { Smile, Palette, Heart } from '@/components/XPIcon'

import CuteImage from '@/components/CuteImage'

interface Hobby {
  id: number
  name: string
  description: string | null
  image_url: string | null
  sort_order: number
}

interface Props {
  hobbies: Hobby[]
}

export default function HobbiesSection({ hobbies }: Props) {
  if (hobbies.length === 0) return null

  return (
    <section
      id="hobbies"
      className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-blush/20 via-cream to-lavender/20 border-y-2 border-dashed border-blush-dark/30 cursor-default"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <Palette size={32} className="inline-block w-8 h-8 mr-3 pastel-float align-middle" />
          <h2 className="pastel-heading text-3xl md:text-4xl inline-block">Hobbies</h2>
          <Palette size={32} className="inline-block w-8 h-8 ml-3 pastel-float align-middle" style={{ animationDelay: '1s' }} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {hobbies.map((hobby) => (
            <div key={hobby.id} className="pastel-card p-4 flex flex-col items-center text-center gap-3 cursor-default">
              {hobby.image_url ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-cream-dark">
                  <CuteImage
                    src={hobby.image_url}
                    alt={hobby.name}
                    width={80}
                    height={80}
                    wrapperClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 rounded-full bg-cream-dark border-2 border-cream flex items-center justify-center">
                  <Smile size={32} className="text-brown-light" aria-hidden="true" />
                </div>
              )}
              <h3 className="font-extrabold text-ink text-sm">{hobby.name}</h3>
              {hobby.description && (
                <p className="text-ink/60 text-xs leading-relaxed">{hobby.description}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 gap-3" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <Heart key={i} size={24} className="w-6 h-6 opacity-40" aria-hidden="true" />
          ))}
        </div>
      </div>
    </section>
  )
}
