import {
  ArrowUpRight,
  CheckCircle2,
  CircleAlert,
  Code2,
} from 'lucide-react'

import Sidebar from './components/Sidebar'
import StatCard from './components/StatCard'
import AssetHub from './components/AssetHub'
import PublishingPipeline from './components/PublishingPipeline'
import HealthMonitor from './components/HealthMonitor'
import EntityExplorer from './components/EntityExplorer'
import TechnicalArchitecture from './components/TechnicalArchitecture'
import ProjectCaseStudies from './components/ProjectCaseStudies'
import AboutSection from './components/AboutSection'

import {
  dashboardStats,
  healthStats,
  recentActivity,
} from './data/dashboard'

function App() {
  return (
    <div className="min-h-screen bg-[#080b10] text-white">
      <Sidebar />

      <main className="pt-20 lg:ml-64 lg:pt-0">
        <div className="mx-auto max-w-[1500px] px-5 py-10 sm:px-6 lg:px-10 xl:px-12">

          {/* HERO / OVERVIEW */}
          <header
            id="overview"
            className="relative overflow-hidden border-b border-white/10 pb-12 pt-4 md:pt-8"
          >
            {/* Background grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            <div className="relative z-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />

                    <span className="text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
                      ORM Asset Builder · PHP Engineer
                    </span>
                  </div>

                  <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
                    Building structured digital ecosystems for
                    <span className="text-emerald-400">
                      {' '}
                      reputation and SEO campaigns.
                    </span>
                  </h1>

                  <p className="mt-5 max-w-2xl leading-7 text-gray-400">
                    I build Web 2.0 properties, publishing workflows,
                    campaign infrastructure, and monitoring tools that
                    make ORM operations structured, trackable, and
                    repeatable.
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.7)]" />

                    Available for remote ORM / PHP opportunities
                  </div>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="#assets"
                      className="rounded-lg bg-emerald-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-emerald-300"
                    >
                      Explore
                    </a>

                    <a
                      href="#case-studies"
                      className="rounded-lg border border-white/10 bg-white/5 px-5 py-3 text-sm text-gray-300 transition hover:bg-white/10"
                    >
                      View Case Studies
                    </a>
                  </div>
                </div>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 self-start rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm transition hover:bg-white/10 md:self-auto"
                >
                  View Projects

                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </header>

          {/* DASHBOARD STATS */}
          <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <StatCard
                key={stat.label}
                {...stat}
              />
            ))}
          </section>

          {/* CAMPAIGN HEALTH + ACTIVITY */}
          <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">

            {/* Campaign Health */}
            <div className="rounded-xl border border-white/10 bg-[#0d1219] p-6">
              <div className="mb-7">
                <p className="font-medium">
                  Campaign Health
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Automated asset-readiness checks
                </p>
              </div>

              <div className="space-y-6">
                {healthStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span className="text-gray-400">
                        {stat.label}
                      </span>

                      <span>
                        {stat.value}%
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-emerald-400"
                        style={{
                          width: `${stat.value}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl border border-white/10 bg-[#0d1219]">
              <div className="border-b border-white/10 p-6">
                <p className="font-medium">
                  Recent Campaign Activity
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  Operational event stream
                </p>
              </div>

              <div>
                {recentActivity.map((activity) => (
                  <div
                    key={`${activity.asset}-${activity.time}`}
                    className="flex items-center gap-4 border-b border-white/5 px-6 py-4 last:border-0"
                  >
                    {activity.status === 'success' ? (
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-400"
                      />
                    ) : (
                      <CircleAlert
                        size={18}
                        className="shrink-0 text-amber-400"
                      />
                    )}

                    <div className="min-w-0 flex-1">
                      <p className="text-sm">
                        {activity.action}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {activity.asset}
                      </p>
                    </div>

                    <span className="text-xs text-gray-600">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CAMPAIGN ASSET HUB */}
          <AssetHub />

          {/* AUTHORITY CONTENT PIPELINE */}
          <PublishingPipeline />

          {/* SEO PROPERTY HEALTH MONITOR */}
          <HealthMonitor />

          {/* ENTITY ECOSYSTEM EXPLORER */}
          <EntityExplorer />

          {/* TECHNICAL ARCHITECTURE */}
          <TechnicalArchitecture />

          {/* PROJECT CASE STUDIES */}
          <ProjectCaseStudies />

          {/* SELECTED PROJECTS */}
          <section
            id="projects"
            className="mt-20 scroll-mt-8"
          >
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="text-sm font-medium text-emerald-400">
                  Selected Work
                </p>

                <h2 className="mt-2 text-2xl font-semibold">
                  ORM Engineering Projects
                </h2>
              </div>

              <Code2
                className="hidden text-gray-700 sm:block"
                size={28}
              />
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              <ProjectCard
                number="01"
                title="Campaign Asset Hub"
                description="PHP and WordPress workflow for provisioning, cataloging, and auditing Web 2.0 properties and social profiles."
                stack="PHP · WordPress · Supabase"
              />

              <ProjectCard
                number="02"
                title="Authority Publishing Pipeline"
                description="Reusable publishing and approval workflow for distributing entity-aligned authority content."
                stack="PHP · WordPress · Content Ops"
              />

              <ProjectCard
                number="03"
                title="SEO Property Health Monitor"
                description="Automated property checks covering availability, metadata, outbound links, and publishing readiness."
                stack="PHP · Automation · SEO"
              />
            </div>
          </section>

          {/* ABOUT + SKILLS + CONTACT */}
          <AboutSection />

          {/* FOOTER */}
          <footer className="mt-20 border-t border-white/10 py-8">
            <div className="flex flex-col gap-3 text-sm text-gray-600 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Nestor Ponte · ORM Asset Builder / PHP Engineer
              </span>

              <span>
                PHP · WordPress · ORM · SEO · Supabase
              </span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

interface ProjectCardProps {
  number: string
  title: string
  description: string
  stack: string
}

function ProjectCard({
  number,
  title,
  description,
  stack,
}: ProjectCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-xl border border-white/10 bg-[#0d1219] p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/30 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]">

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-gray-600">
          PROJECT / {number}
        </span>

        <ArrowUpRight
          size={18}
          className="text-gray-600 transition group-hover:text-emerald-400"
        />
      </div>

      <h3 className="mt-8 text-xl font-medium">
        {title}
      </h3>

      <p className="mt-3 min-h-20 text-sm leading-6 text-gray-400">
        {description}
      </p>

      <div className="mt-6 border-t border-white/10 pt-4">
        <span className="font-mono text-xs text-gray-500">
          {stack}
        </span>
      </div>
    </article>
  )
}

export default App