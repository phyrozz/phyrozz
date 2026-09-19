import { ArrowUpRight, Download, GitBranch, Link, Mail, MapPin } from 'lucide-react'
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

export default function HeroSection({ info, socials }: { info: PersonalInfo | null; socials: Social[] }) {
  const displayName = info?.full_name ?? 'Reimu Dev'

  return (
    <section id="hero" className="portfolio-hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="hero-status" /> THE PERSON BEHIND THE PIXELS</div>
          <h1>Hey, I&apos;m <em>{info?.nickname ?? displayName}.</em></h1>
          <p className="hero-tagline">{info?.tagline ?? 'Building thoughtful things for the web.'}</p>
          {info?.bio && <p className="hero-bio">{info.bio}</p>}

          <div className="hero-actions">
            <a className="hero-primary" href="#projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
            {info?.email && <a className="hero-secondary" href={`mailto:${info.email}`}>Get in touch <Mail size={17} aria-hidden="true" /></a>}
          </div>

          <div className="hero-meta">
            {(info?.city || info?.country) && <span><MapPin size={15} aria-hidden="true" /> {[info.city, info.country].filter(Boolean).join(', ')}</span>}
            <span>DESIGN • DEVELOPMENT • EVERYTHING IN BETWEEN</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            {info?.banner_url ? (
              <CuteImage src={info.banner_url} alt="A glimpse into my world" fill priority wrapperClassName="hero-cover" className="object-cover" />
            ) : info?.avatar_url ? (
              <CuteImage src={info.avatar_url} alt={displayName} fill priority wrapperClassName="hero-cover" className="object-cover" />
            ) : (
              <div className="hero-image-fallback"><span>R</span><span>✳</span></div>
            )}
          </div>
          {info?.avatar_url && info?.banner_url && (
            <div className="hero-portrait"><CuteImage src={info.avatar_url} alt={displayName} fill wrapperClassName="h-full w-full" className="object-cover" /></div>
          )}
        </div>
      </div>

      {(socials.length > 0 || info?.resume_url) && (
        <div className="hero-links">
          <span className="hero-links-label">FIND ME ELSEWHERE</span>
          <div className="hero-links-list">
            {socials.map((social) => (
              <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer">
                {social.platform.toLowerCase() === 'github' ? <GitBranch size={15} aria-hidden="true" /> : <Link size={15} aria-hidden="true" />}
                {social.platform}<ArrowUpRight size={14} aria-hidden="true" />
              </a>
            ))}
            {info?.resume_url && <a href={info.resume_url} download><Download size={15} aria-hidden="true" /> Résumé <ArrowUpRight size={14} aria-hidden="true" /></a>}
          </div>
        </div>
      )}
    </section>
  )
}
