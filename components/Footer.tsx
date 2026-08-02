import { Heart } from 'lucide-react'
import { PawDeco } from '@/components/Decos'

export default function Footer() {
  return (
    <footer className="bg-cream-dark border-t-2 border-dashed border-brown-light/40 py-10 px-4 text-center">
      {/* <div className="flex justify-center gap-2 mb-3" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <PawDeco key={i} className="w-5 h-5 opacity-30" />
        ))}
      </div> */}

      <p className="text-brown-light text-sm font-semibold flex items-center justify-center gap-1.5">
        Built with <Heart size={14} className="text-blush-dark fill-blush-dark" aria-label="love" />
      </p>
      <p className="text-brown-light/60 text-xs mt-1">
        © {new Date().getFullYear()} — All rights reserved
      </p>
    </footer>
  )
}
