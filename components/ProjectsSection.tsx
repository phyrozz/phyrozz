import { Star, GitBranch, Globe, Monitor } from 'lucide-react'
import { FlowerDeco } from '@/components/Decos'
import CuteImage from '@/components/CuteImage'

interface Project {
  id: number
  title: string
  description: string | null
  tech_stack: string[] | null
  github_url: string | null
  live_url: string | null
  image_url: string | null
  is_featured: boolean
  sort_order: number
}

interface Props {
  projects: Project[]
}

export default function ProjectsSection({ projects }: Props) {
  if (projects.length === 0) return null

  const featured = projects.filter((p) => p.is_featured)
  const rest = projects.filter((p) => !p.is_featured)

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-16 px-4 bg-gradient-to-br from-mint/20 via-cream to-sky/20 border-y-2 border-dashed border-mint-dark/30 cursor-default"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <FlowerDeco className="inline-block w-8 h-8 mr-3 pastel-float align-middle" />
          <h2 className="pastel-heading text-3xl md:text-4xl inline-block">Projects</h2>
          <FlowerDeco className="inline-block w-8 h-8 ml-3 pastel-float align-middle" style={{ animationDelay: '0.7s' }} />
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featured.map((p) => <ProjectCard key={p.id} project={p} featured />)}
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <div className={`pastel-card p-5 flex flex-col gap-3 ${featured ? 'border-honey-dark bg-gradient-to-br from-cream to-cream-dark' : ''}`}>
      {project.image_url ? (
        <div className="w-full h-44 rounded-xl overflow-hidden border border-cream-dark">
          <CuteImage
            src={project.image_url}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            wrapperClassName="w-full h-full"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-44 rounded-xl bg-cream-dark flex items-center justify-center border border-cream-dark">
          <Monitor size={40} className="text-brown-light" aria-hidden="true" />
        </div>
      )}

      <div className="flex items-center gap-2">
        {featured && <Star size={16} className="text-honey fill-honey shrink-0" aria-hidden="true" />}
        <h3 className="font-extrabold text-ink text-lg leading-tight">{project.title}</h3>
      </div>

      {project.description && (
        <p className="text-ink/70 text-sm leading-relaxed">{project.description}</p>
      )}

      {project.tech_stack && project.tech_stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {project.tech_stack.map((tech) => (
            <span key={tech} className="pastel-badge">{tech}</span>
          ))}
        </div>
      )}

      <div className="flex gap-2 mt-auto pt-1">
        {project.github_url && (
          <a
            href={project.github_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink text-cream text-xs font-bold hover:opacity-80 transition-opacity"
          >
            <GitBranch size={12} aria-hidden="true" /> GitHub
          </a>
        )}
        {project.live_url && (
          <a
            href={project.live_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-honey border border-honey-dark text-brown text-xs font-bold hover:opacity-80 transition-opacity"
          >
            <Globe size={12} aria-hidden="true" /> Live
          </a>
        )}
      </div>
    </div>
  )
}
