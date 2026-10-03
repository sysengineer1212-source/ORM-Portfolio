import {
  Code2,
  Database,
  Globe2,
  Layers3,
  Mail,
  MapPin,
} from 'lucide-react'

import ContactForm from './ContactForm'

const skills = [
  'PHP',
  'WordPress',
  'ORM',
  'SEO',
  'Web 2.0',
  'Supabase',
  'PostgreSQL',
  'Entity Building',
  'Content Publishing',
  'REST APIs',
]

function AboutSection() {
  return (
    <section
      id="about"
      className="mt-20 scroll-mt-8"
    >
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">

        <div>
          <p className="text-sm font-medium text-emerald-400">
            About Me
          </p>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            ORM Asset Builder & PHP Engineer
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-400">
            I build structured digital assets and internal tools
            for SEO and online reputation management workflows.
            My focus is on repeatable property setup, content
            publishing, entity consistency, campaign tracking,
            and operational visibility.
          </p>

          <p className="mt-4 max-w-2xl leading-7 text-gray-400">
            I combine PHP and WordPress development with structured
            data, Supabase, PostgreSQL, and automation to make
            campaign operations easier to manage and audit.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <InfoChip
              icon={MapPin}
              text="Philippines · Remote"
            />

            <InfoChip
              icon={Globe2}
              text="US/AU Business Hours"
            />

            <InfoChip
              icon={Code2}
              text="PHP / WordPress"
            />
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0d1219] p-6">
          <p className="text-sm font-medium">
            Core Skills
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-gray-400"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <SkillCard
              icon={Layers3}
              title="Campaign Ops"
              description="Asset setup, tracking, publishing workflows"
            />

            <SkillCard
              icon={Database}
              title="Structured Data"
              description="Supabase, PostgreSQL, schema-driven records"
            />
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  )
}

function InfoChip({
  icon: Icon,
  text,
}: {
  icon: typeof Mail
  text: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
      <Icon
        size={15}
        className="text-emerald-400"
      />

      <span className="text-sm text-gray-400">
        {text}
      </span>
    </div>
  )
}

function SkillCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Database
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-[#080b10] p-4">
      <Icon
        size={18}
        className="text-emerald-400"
      />

      <p className="mt-3 text-sm font-medium">
        {title}
      </p>

      <p className="mt-2 text-xs leading-5 text-gray-600">
        {description}
      </p>
    </div>
  )
}

export default AboutSection