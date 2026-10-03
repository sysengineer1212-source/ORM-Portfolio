import {
  ArrowUpRight,
  CheckCircle2,
  FolderKanban,
} from 'lucide-react'

import { projectCaseStudies } from '../data/projects'

function ProjectCaseStudies() {
  return (
    <section
      id="case-studies"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 text-emerald-400">
          <FolderKanban size={17} />

          <span className="text-sm font-medium">
            Project Case Studies
          </span>
        </div>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          ORM Engineering
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
          These case studies describe the engineering approach
          behind the three portfolio projects and how each solves
          an operational problem in ORM and SEO workflows.
        </p>
      </div>

      <div className="space-y-6">
        {projectCaseStudies.map(
          (project, index) => (
            <article
              key={project.id}
              className="rounded-xl border border-white/10 bg-[#0d1219] p-6 md:p-8"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                <div className="max-w-3xl">
                  <p className="font-mono text-xs text-gray-600">
                    CASE STUDY / 0{index + 1}
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {project.title}
                  </h3>

                  <p className="mt-3 leading-7 text-gray-400">
                    {project.summary}
                  </p>
                </div>

                <ArrowUpRight
                  size={22}
                  className="text-gray-700"
                />
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                <CaseSection
                  title="Problem"
                  content={project.problem}
                />

                <CaseSection
                  title="Solution"
                  content={project.solution}
                />
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium">
                  Operational Impact
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.impact.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-400"
                      />

                      <span className="text-sm text-gray-400">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 font-mono text-xs text-gray-500"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  )
}

function CaseSection({
  title,
  content,
}: {
  title: string
  content: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b10] p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-emerald-400">
        {title}
      </p>

      <p className="mt-3 text-sm leading-7 text-gray-400">
        {content}
      </p>
    </div>
  )
}

export default ProjectCaseStudies