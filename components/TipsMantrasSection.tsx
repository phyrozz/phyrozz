import { Lightbulb, Quote } from '@/components/XPIcon'
import { StarDeco, HeartDeco } from '@/components/Decos'

interface TipMantra {
  id: number
  content: string
  category: string | null
  author: string | null
  sort_order: number
}

interface Props {
  items: TipMantra[]
}

const CATEGORY_COLORS: Record<string, string> = {
  engineering: 'bg-sky/40 border-sky-dark text-ink',
  life:        'bg-mint/40 border-mint-dark text-ink',
  mindset:     'bg-lavender/40 border-lavender-dark text-ink',
  default:     'bg-cream-dark border-brown-light text-brown',
}

function getCategoryStyle(category: string | null) {
  if (!category) return CATEGORY_COLORS.default
  return CATEGORY_COLORS[category.toLowerCase()] ?? CATEGORY_COLORS.default
}

export default function TipsMantrasSection({ items }: Props) {
  if (items.length === 0) return null

  return (
    <section id="tips" className="py-16 px-4 bg-gradient-to-br from-mint/20 to-lavender/20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 flex items-center justify-center gap-3">
          <Lightbulb size={28} className="text-honey pastel-bounce" aria-hidden="true" />
          <h2 className="pastel-heading text-3xl md:text-4xl inline-block">Tips &amp; Mantras</h2>
          <Lightbulb size={28} className="text-honey pastel-bounce" style={{ animationDelay: '0.4s' }} aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div key={item.id} className="pastel-card p-5 flex flex-col gap-2 relative overflow-hidden">
              <div className="absolute top-2 right-2" aria-hidden="true">
                {i % 2 === 0 ? <StarDeco className="w-5 h-5" /> : <HeartDeco className="w-5 h-5" />}
              </div>

              <Quote size={20} className="text-honey" aria-hidden="true" />

              <p className="text-ink font-semibold text-base leading-relaxed pr-6">
                {item.content}
              </p>

              <div className="flex items-center justify-between mt-auto pt-2">
                {item.author ? (
                  <span className="text-brown-light text-xs font-bold">— {item.author}</span>
                ) : (
                  <span className="text-brown-light text-xs italic">— personal mantra</span>
                )}
                {item.category && (
                  <span className={`pastel-badge ${getCategoryStyle(item.category)}`}>
                    {item.category}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
