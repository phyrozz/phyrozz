import Image from 'next/image'
import { Briefcase, Building2 } from 'lucide-react'

interface WorkExp {
  id: number
  company: string
  role: string
  description: string | null
  start_date: string
  end_date: string | null
  logo_url: string | null
  company_url: string | null
  sort_order: number
}

interface Props {
  experiences: WorkExp[]
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return 'Present'
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export default function WorkExperienceSection({ experiences }: Props) {
  if (experiences.length === 0) return null

  return (
    <section id="work" className="py-16 px-4 bg-gradient-to-br from-lavender/30 to-sky/20 cursor-default">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10 flex items-center justify-center gap-3">
          <Briefcase size={28} className="text-brown-light pastel-bounce" aria-hidden="true" />
          <h2 className="pastel-heading text-3xl md:text-4xl inline-block">Work Experience</h2>
          <Briefcase size={28} className="text-brown-light pastel-bounce" style={{ animationDelay: '0.3s' }} aria-hidden="true" />
        </div>

        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-blush-dark rounded-full" aria-hidden="true" />
          <div className="flex flex-col gap-8">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex gap-6 pl-14">
                <div className="absolute left-2.5 top-3 w-5 h-5 rounded-full bg-honey border-2 border-honey-dark shadow-sm" aria-hidden="true" />
                <div className="pastel-card flex-1 p-5 flex gap-4">
                  {exp.logo_url ? (
                    <div className="w-12 h-12 shrink-0 rounded-xl overflow-hidden border border-cream-dark bg-white flex items-center justify-center">
                      <Image src={exp.logo_url} alt={`${exp.company} logo`} width={48} height={48} className="object-contain w-full h-full p-1" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-cream-dark border border-cream flex items-center justify-center">
                      <Building2 size={22} className="text-brown-light" aria-hidden="true" />
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-1">
                      <div>
                        <h3 className="font-extrabold text-ink text-base">{exp.role}</h3>
                        {exp.company_url ? (
                          <a href={exp.company_url} target="_blank" rel="noopener noreferrer" className="text-brown-light font-semibold text-sm hover:underline">
                            {exp.company}
                          </a>
                        ) : (
                          <p className="text-brown-light font-semibold text-sm">{exp.company}</p>
                        )}
                      </div>
                      <span className="pastel-badge whitespace-nowrap shrink-0">
                        {formatDate(exp.start_date)} – {formatDate(exp.end_date)}
                      </span>
                    </div>
                    {exp.description && (
                      <p className="text-ink/70 text-sm leading-relaxed mt-2">{exp.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
