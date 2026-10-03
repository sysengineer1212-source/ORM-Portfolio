import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  CircleAlert,
  FileText,
  X,
} from 'lucide-react'

import { publications } from '../data/publications'

import type {
  PublicationItem,
  PublicationStage,
} from '../types/publication'

const stages: PublicationStage[] = [
  'Draft',
  'Entity Check',
  'SEO Review',
  'Approved',
  'Published',
]

function PublishingPipeline() {
  const [selectedPublication, setSelectedPublication] =
    useState<PublicationItem | null>(null)

  const stageCounts = useMemo(() => {
    return stages.reduce<Record<PublicationStage, number>>(
      (acc, stage) => {
        acc[stage] = publications.filter(
          (item) => item.stage === stage,
        ).length

        return acc
      },
      {
        Draft: 0,
        'Entity Check': 0,
        'SEO Review': 0,
        Approved: 0,
        Published: 0,
      },
    )
  }, [])

  return (
    <section
      id="publishing"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-7">
        <div className="flex items-center gap-2 text-emerald-400">
          <FileText size={17} />

          <span className="text-sm font-medium">
            Authority Content Publishing Pipeline
          </span>
        </div>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Structured Publishing Workflow
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
          A repeatable content workflow for preparing, validating,
          reviewing, and publishing entity-aligned authority content.
        </p>
      </div>

      {/* Pipeline */}
      <div className="grid gap-3 md:grid-cols-5">
        {stages.map((stage, index) => (
          <div
            key={stage}
            className="relative rounded-xl border border-white/10 bg-[#0d1219] p-5"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
              Stage {index + 1}
            </p>

            <p className="mt-3 font-medium">
              {stage}
            </p>

            <p className="mt-5 text-3xl font-semibold">
              {stageCounts[stage]}
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Items
            </p>

            {index < stages.length - 1 && (
              <div className="absolute -right-2 top-1/2 z-10 hidden h-px w-4 bg-white/10 md:block" />
            )}
          </div>
        ))}
      </div>

      {/* Publication list */}
      <div className="mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#0d1219]">
        <div className="border-b border-white/10 px-6 py-5">
          <p className="font-medium">
            Content Queue
          </p>

          <p className="mt-1 text-sm text-gray-500">
            Sanitized demonstration records
          </p>
        </div>

        <div className="divide-y divide-white/5">
          {publications.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPublication(item)}
              className="flex w-full flex-col gap-4 px-6 py-5 text-left transition hover:bg-white/[0.025] md:flex-row md:items-center"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-gray-600">
                  {item.id} · {item.entity} · {item.platform}
                </p>
              </div>

              <StageBadge stage={item.stage} />

              <span className="text-xs text-gray-600">
                {item.updatedAt}
              </span>
            </button>
          ))}
        </div>
      </div>

      {selectedPublication && (
        <PublicationDrawer
          publication={selectedPublication}
          onClose={() => setSelectedPublication(null)}
        />
      )}
    </section>
  )
}

function StageBadge({
  stage,
}: {
  stage: PublicationStage
}) {
  const classes: Record<PublicationStage, string> = {
    Draft:
      'border-gray-500/20 bg-gray-500/10 text-gray-400',

    'Entity Check':
      'border-blue-400/20 bg-blue-400/10 text-blue-400',

    'SEO Review':
      'border-amber-400/20 bg-amber-400/10 text-amber-400',

    Approved:
      'border-violet-400/20 bg-violet-400/10 text-violet-400',

    Published:
      'border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${classes[stage]}`}
    >
      {stage}
    </span>
  )
}

interface PublicationDrawerProps {
  publication: PublicationItem
  onClose: () => void
}

function PublicationDrawer({
  publication,
  onClose,
}: PublicationDrawerProps) {
  const checks = [
    {
      label: 'Primary entity identified',
      value: publication.checks.primaryEntity,
    },
    {
      label: 'Organization name consistent',
      value: publication.checks.organizationName,
    },
    {
      label: 'Location information aligned',
      value: publication.checks.location,
    },
    {
      label: 'Topic association confirmed',
      value: publication.checks.topicAssociation,
    },
    {
      label: 'Internal links configured',
      value: publication.checks.internalLinks,
    },
    {
      label: 'Authority references included',
      value: publication.checks.authorityReferences,
    },
    {
      label: 'SEO metadata complete',
      value: publication.checks.metadata,
    },
  ]

  const passed = checks.filter(
    (check) => check.value,
  ).length

  const readiness = Math.round(
    (passed / checks.length) * 100,
  )

  return (
    <div className="fixed inset-0 z-50">
      <button
        onClick={onClose}
        aria-label="Close publication details"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#0b0f15]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0b0f15]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-600">
              Publication Details
            </p>

            <p className="mt-1 font-mono text-xs text-emerald-400">
              {publication.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-gray-500 hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold">
            {publication.title}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {publication.entity} · {publication.platform}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <DetailBox
              label="Stage"
              value={publication.stage}
            />

            <DetailBox
              label="Readiness"
              value={`${readiness}%`}
            />

            <DetailBox
              label="Entity"
              value={publication.entity}
            />

            <DetailBox
              label="Last Updated"
              value={publication.updatedAt}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium">
              Entity & SEO Alignment
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Publishing readiness checklist
            </p>

            <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
              {checks.map((check) => (
                <div
                  key={check.label}
                  className="flex items-center gap-3 border-b border-white/5 px-4 py-3 last:border-0"
                >
                  {check.value ? (
                    <CheckCircle2
                      size={17}
                      className="text-emerald-400"
                    />
                  ) : (
                    <CircleAlert
                      size={17}
                      className="text-amber-400"
                    />
                  )}

                  <span className="text-sm text-gray-400">
                    {check.label}
                  </span>

                  <span
                    className={`ml-auto text-xs ${
                      check.value
                        ? 'text-emerald-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {check.value ? 'Passed' : 'Required'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium">
              Publishing Flow
            </p>

            <div className="mt-4 space-y-3">
              {stages.map((stage, index) => {
                const currentIndex =
                  stages.indexOf(publication.stage)

                const completed =
                  index <= currentIndex

                return (
                  <div
                    key={stage}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs ${
                        completed
                          ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-400'
                          : 'border-white/10 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>

                    <span
                      className={`text-sm ${
                        completed
                          ? 'text-gray-300'
                          : 'text-gray-600'
                      }`}
                    >
                      {stage}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
            <p className="text-xs font-medium text-emerald-400">
              Publishing Workflow
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              This demonstrates the structure of a repeatable ORM
              publishing workflow using sanitized sample content.
            </p>
          </div>
        </div>
      </aside>
    </div>
  )
}

function DetailBox({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
      <p className="text-xs text-gray-600">
        {label}
      </p>

      <p className="mt-2 text-sm text-gray-300">
        {value}
      </p>
    </div>
  )
}

export default PublishingPipeline