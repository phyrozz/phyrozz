import {
  MapPin, Mail, Phone, Cake, Download, Important,
  GitBranch, Link, WindowsUpdate
} from '@/components/XPIcon'
import { StarDeco, HeartDeco, FlowerDeco, PawDeco } from '@/components/Decos'
import CuteImage from '@/components/CuteImage'

interface PersonalInfo {
  id: number
  full_name: string
  nickname: string | null
  tagline: string | null
  bio: string | null
  email: string | null
  mobile: string | null
  city: string | null
  country: string | null
  birthdate: string | null
  avatar_url: string | null
  banner_url: string | null
  resume_url: string | null
}

interface Social {
  id: number
  platform: string
  url: string
  icon_url: string | null
}

interface Props {
  info: PersonalInfo | null
  socials: Social[]
}

function formatBirthdate(dateStr: string | null) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

const PLATFORM_ICON_MAP: Record<string, React.ReactNode> = {
  github:    <GitBranch size={14} aria-hidden="true" />,
  default:   <Link      size={14} aria-hidden="true" />,
}

function getPlatformIcon(platform: string) {
  return PLATFORM_ICON_MAP[platform.toLowerCase()] ?? PLATFORM_ICON_MAP.default
}

export default function HeroSection({ info, socials }: Props) {
  return (
    <section id="hero" className="relative overflow-hidden cursor-default">

      {/* ── Banner / cover photo ───────────────────────────────── */}
      <div className="relative w-full h-48 md:h-64">
        {info?.banner_url ? (
          <CuteImage
            src={info.banner_url}
            alt="Profile banner"
            fill
            priority
            wrapperClassName="w-full h-full"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blush via-cream to-lavender relative overflow-hidden">
            <StarDeco   className="absolute top-4  left-8    w-8  h-8  pastel-float opacity-70" />
            <HeartDeco  className="absolute top-6  right-12  w-7  h-7  pastel-float opacity-60" style={{ animationDelay: '0.8s' }} />
            <FlowerDeco className="absolute bottom-4 left-20 w-10 h-10 pastel-float opacity-50" style={{ animationDelay: '1.4s' }} />
            <PawDeco    className="absolute bottom-3 right-16 w-10 h-10 pastel-float opacity-50" style={{ animationDelay: '0.4s' }} />
            <StarDeco   className="absolute top-10 right-40  w-5  h-5  pastel-wiggle opacity-50" />
            <HeartDeco  className="absolute top-16 left-44   w-5  h-5  pastel-wiggle opacity-40" style={{ animationDelay: '0.6s' }} />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cream to-transparent" />
      </div>

      {/* ── Profile content ────────────────────────────────────── */}
      <div className="bg-cream pb-12 px-4">
        <div className="max-w-2xl mx-auto">

          {/* Avatar */}
          <div className="xp-start-avatar-wrap flex justify-center -mt-16 mb-4 relative z-10">
            {info?.avatar_url ? (
              <div className="xp-start-avatar relative">
                <div className="xp-start-avatar-frame w-32 h-32 rounded-full overflow-hidden border-4 border-honey shadow-lg bg-cream">
                  <CuteImage
                    src={info.avatar_url}
                    alt={`${info.full_name} avatar`}
                    width={128}
                    height={128}
                    wrapperClassName="w-full h-full"
                    className="object-cover w-full h-full"
                  />
                </div>
                <StarDeco className="absolute -top-2 -right-2 w-7 h-7 pastel-wiggle" />
              </div>
            ) : (
              <div className="xp-start-avatar-frame w-32 h-32 rounded-full bg-cream-dark border-4 border-honey shadow-lg flex items-center justify-center">
                <Important size={48} className="text-honey" aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Name & tagline */}
          <div className="text-center">
            <h1 className="pastel-heading text-4xl md:text-5xl">
              {info?.full_name ?? 'Hello World!'}
            </h1>

            {info?.nickname && (
              <p className="mt-2 text-sm font-extrabold uppercase tracking-[0.28em] text-brown-light">
                aka {info.nickname}
              </p>
            )}

            {info?.tagline && (
              <p className="text-brown-light text-lg font-semibold mt-4 flex items-center justify-center gap-2">
                <WindowsUpdate size={16} className="text-honey" aria-hidden="true" />
                {info.tagline}
                <WindowsUpdate size={16} className="text-honey" aria-hidden="true" />
              </p>
            )}

            {info?.bio && (
              <p className="text-ink/80 leading-relaxed mt-4 max-w-prose mx-auto">
                {info.bio}
              </p>
            )}

            {/* Personal detail pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {info?.city && (
                <span className="pastel-badge flex items-center gap-1">
                  <MapPin size={11} aria-hidden="true" />
                  {info.city}{info.country ? `, ${info.country}` : ''}
                </span>
              )}
              {info?.email && (
                <a href={`mailto:${info.email}`} className="pastel-badge flex items-center gap-1 hover:bg-blush transition-colors">
                  <Mail size={11} aria-hidden="true" />
                  {info.email}
                </a>
              )}
              {info?.mobile && (
                <a href={`tel:${info.mobile}`} className="pastel-badge flex items-center gap-1 hover:bg-blush transition-colors">
                  <Phone size={11} aria-hidden="true" />
                  {info.mobile}
                </a>
              )}
              {info?.birthdate && (
                <span className="pastel-badge flex items-center gap-1">
                  <Cake size={11} aria-hidden="true" />
                  {formatBirthdate(info.birthdate)}
                </span>
              )}
            </div>

            {/* Socials */}
            {socials.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                {socials.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border-2 border-brown-light text-brown font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    {s.icon_url ? (
                      <img src={s.icon_url} alt={s.platform} width={14} height={14} className="w-3.5 h-3.5 object-contain" />
                    ) : (
                      getPlatformIcon(s.platform)
                    )}
                    {s.platform}
                  </a>
                ))}
              </div>
            )}

            {/* Resume download */}
            {info?.resume_url && (
              <div className="mt-6">
                <a
                  href={info.resume_url}
                  download
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-honey text-brown font-bold border-2 border-honey-dark shadow hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <Download size={15} aria-hidden="true" />
                  Download Résumé
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}


