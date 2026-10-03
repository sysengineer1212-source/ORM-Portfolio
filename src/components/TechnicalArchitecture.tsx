import {
  Database,
  Globe2,
  Layers3,
  Server,
  Workflow,
} from 'lucide-react'

const architecture = [
  {
    title: 'Portfolio UI',
    description:
      'React and TypeScript interface for campaign operations, reporting, and interactive demonstrations.',
    icon: Globe2,
    technologies: 'React · TypeScript · Tailwind',
  },
  {
    title: 'Application Layer',
    description:
      'PHP services handle asset provisioning workflows, validation logic, and publishing operations.',
    icon: Server,
    technologies: 'PHP · WordPress · REST API',
  },
  {
    title: 'Workflow Engine',
    description:
      'Structured stages coordinate property setup, entity validation, publishing approval, and audits.',
    icon: Workflow,
    technologies: 'Validation · Automation · Status Tracking',
  },
  {
    title: 'Campaign Data',
    description:
      'Centralized relational records maintain assets, campaigns, publications, checks, and entity relationships.',
    icon: Database,
    technologies: 'Supabase · PostgreSQL',
  },
]

function TechnicalArchitecture() {
  return (
    <section
      id="architecture"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-8">
        <div className="flex items-center gap-2 text-emerald-400">
          <Layers3 size={17} />

          <span className="text-sm font-medium">
            Technical Architecture
          </span>
        </div>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          How the ORM Platform Fits Together
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
          The portfolio interface demonstrates the operational layer,
          while the underlying project architecture is designed around
          PHP, WordPress, Supabase, structured validation, and automated
          campaign workflows.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {architecture.map((item, index) => {
          const Icon = item.icon

          return (
            <div
              key={item.title}
              className="relative rounded-xl border border-white/10 bg-[#0d1219] p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10">
                <Icon
                  size={19}
                  className="text-emerald-400"
                />
              </div>

              <p className="mt-6 text-xs font-mono text-gray-600">
                LAYER / 0{index + 1}
              </p>

              <h3 className="mt-2 font-medium">
                {item.title}
              </h3>

              <p className="mt-3 min-h-24 text-sm leading-6 text-gray-500">
                {item.description}
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="font-mono text-xs text-gray-500">
                  {item.technologies}
                </p>
              </div>

              {index < architecture.length - 1 && (
                <div className="absolute -right-2 top-12 z-10 hidden h-px w-4 bg-emerald-400/30 lg:block" />
              )}
            </div>
          )
        })}
      </div>

      <ArchitectureFlow />

      <DataModel />
    </section>
  )
}

function ArchitectureFlow() {
  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-[#0d1219] p-6">
      <p className="text-sm font-medium">
        Example Asset Lifecycle
      </p>

      <p className="mt-1 text-xs text-gray-600">
        From campaign request to monitored production asset
      </p>

      <div className="mt-6 overflow-x-auto">
        <div className="flex min-w-[800px] items-center">
          <FlowStep
            number="01"
            title="Campaign Created"
          />

          <Connector />

          <FlowStep
            number="02"
            title="Asset Provisioned"
          />

          <Connector />

          <FlowStep
            number="03"
            title="Metadata Logged"
          />

          <Connector />

          <FlowStep
            number="04"
            title="Content Published"
          />

          <Connector />

          <FlowStep
            number="05"
            title="Health Audited"
          />
        </div>
      </div>
    </div>
  )
}

function FlowStep({
  number,
  title,
}: {
  number: string
  title: string
}) {
  return (
    <div className="min-w-32 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-4 text-center">
      <p className="font-mono text-xs text-emerald-400">
        {number}
      </p>

      <p className="mt-2 text-xs text-gray-300">
        {title}
      </p>
    </div>
  )
}

function Connector() {
  return (
    <div className="mx-3 h-px min-w-8 flex-1 bg-white/10" />
  )
}

function DataModel() {
  const tables = [
    {
      name: 'campaigns',
      fields: [
        'id',
        'name',
        'primary_entity',
        'status',
      ],
    },
    {
      name: 'assets',
      fields: [
        'id',
        'campaign_id',
        'platform',
        'type',
        'health_score',
      ],
    },
    {
      name: 'publications',
      fields: [
        'id',
        'asset_id',
        'stage',
        'title',
        'published_at',
      ],
    },
    {
      name: 'health_checks',
      fields: [
        'id',
        'asset_id',
        'check_type',
        'result',
        'checked_at',
      ],
    },
  ]

  return (
    <div className="mt-6 rounded-xl border border-white/10 bg-[#0d1219] p-6">
      <p className="text-sm font-medium">
        Simplified Campaign Data Model
      </p>

      <p className="mt-1 text-xs text-gray-600">
        Example relational structure for Supabase/PostgreSQL
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {tables.map((table) => (
          <div
            key={table.name}
            className="overflow-hidden rounded-lg border border-white/10 bg-[#080b10]"
          >
            <div className="border-b border-white/10 px-4 py-3">
              <p className="font-mono text-xs text-emerald-400">
                {table.name}
              </p>
            </div>

            <div className="divide-y divide-white/5">
              {table.fields.map((field) => (
                <div
                  key={field}
                  className="px-4 py-2.5 font-mono text-xs text-gray-500"
                >
                  {field}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechnicalArchitecture