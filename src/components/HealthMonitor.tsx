import { useMemo, useState } from 'react'
import {
  Activity,
  CheckCircle2,
  CircleAlert,
  CircleX,
  RefreshCw,
} from 'lucide-react'

import { propertyHealthData } from '../data/health'

import type {
  HealthCheck,
  PropertyHealth,
} from '../types/health'

function HealthMonitor() {
  const [properties, setProperties] =
    useState<PropertyHealth[]>(propertyHealthData)

  const [isAuditing, setIsAuditing] =
    useState(false)

  const [auditMessage, setAuditMessage] =
    useState('Ready to run automated health checks.')

  const overallHealth = useMemo(() => {
    if (!properties.length) return 0

    const total = properties.reduce(
      (sum, property) => sum + property.score,
      0,
    )

    return Math.round(total / properties.length)
  }, [properties])

  const totalChecks = properties.reduce(
    (total, property) =>
      total + property.checks.length,
    0,
  )

  const passedChecks = properties.reduce(
    (total, property) =>
      total +
      property.checks.filter(
        (check) => check.status === 'pass',
      ).length,
    0,
  )

  const warnings = properties.reduce(
    (total, property) =>
      total +
      property.checks.filter(
        (check) => check.status === 'warning',
      ).length,
    0,
  )

  const failures = properties.reduce(
    (total, property) =>
      total +
      property.checks.filter(
        (check) => check.status === 'fail',
      ).length,
    0,
  )

  const runAudit = async () => {
    if (isAuditing) return

    setIsAuditing(true)

    setAuditMessage(
      'Checking property availability...',
    )

    await delay(650)

    setAuditMessage(
      'Validating metadata and canonical URLs...',
    )

    await delay(650)

    setAuditMessage(
      'Reviewing outbound links...',
    )

    await delay(650)

    setAuditMessage(
      'Checking entity consistency...',
    )

    await delay(650)

    const updatedProperties =
      properties.map((property) =>
        createDemoAuditResult(property),
      )

    setProperties(updatedProperties)

    setAuditMessage(
      'Audit completed successfully.',
    )

    setIsAuditing(false)
  }

  return (
    <section
      id="health"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Activity size={17} />

            <span className="text-sm font-medium">
              SEO Property Health Monitor
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Campaign Readiness Monitoring
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Automated checks for property availability,
            metadata completeness, entity consistency,
            canonical configuration, and outbound-link
            integrity.
          </p>
        </div>

        <button
          onClick={runAudit}
          disabled={isAuditing}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-400/10 px-4 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-400/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              isAuditing
                ? 'animate-spin'
                : ''
            }
          />

          {isAuditing
            ? 'Running Audit'
            : 'Run Audit'}
        </button>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Overall Health"
          value={`${overallHealth}%`}
        />

        <MetricCard
          label="Checks Passed"
          value={`${passedChecks}/${totalChecks}`}
        />

        <MetricCard
          label="Warnings"
          value={warnings.toString()}
        />

        <MetricCard
          label="Failures"
          value={failures.toString()}
        />
      </div>

      {/* Audit status */}
      <div className="mt-5 rounded-xl border border-white/10 bg-[#0d1219] px-5 py-4">
        <div className="flex items-center gap-3">
          <div
            className={`h-2 w-2 rounded-full ${
              isAuditing
                ? 'animate-pulse bg-amber-400'
                : 'bg-emerald-400'
            }`}
          />

          <p className="text-sm text-gray-400">
            {auditMessage}
          </p>
        </div>
      </div>

      {/* Properties */}
      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyHealthCard
            key={property.id}
            property={property}
          />
        ))}
      </div>

      <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
        <p className="text-xs font-medium text-emerald-400">
          Simulated Monitoring Environment
        </p>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          Audit results are generated locally for portfolio
          demonstration purposes. No external websites or
          client properties are queried.
        </p>
      </div>
    </section>
  )
}

function MetricCard({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0d1219] p-5">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="mt-3 text-3xl font-semibold tracking-tight">
        {value}
      </p>
    </div>
  )
}

function PropertyHealthCard({
  property,
}: {
  property: PropertyHealth
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-[#0d1219] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-medium">
            {property.name}
          </p>

          <p className="mt-1 text-xs text-gray-600">
            {property.platform} · {property.id}
          </p>
        </div>

        <HealthBadge
          score={property.score}
        />
      </div>

      <div className="mt-5">
        <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-700"
            style={{
              width: `${property.score}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {property.checks.map((check) => (
          <CheckRow
            key={check.id}
            check={check}
          />
        ))}
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="text-xs text-gray-600">
          Last audit
        </p>

        <p className="mt-1 font-mono text-xs text-gray-500">
          {property.lastAudit}
        </p>
      </div>
    </article>
  )
}

function HealthBadge({
  score,
}: {
  score: number
}) {
  const classes =
    score >= 90
      ? 'border-emerald-400/20 bg-emerald-400/10 text-emerald-400'
      : score >= 80
        ? 'border-amber-400/20 bg-amber-400/10 text-amber-400'
        : 'border-orange-400/20 bg-orange-400/10 text-orange-400'

  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-xs ${classes}`}
    >
      {score}%
    </span>
  )
}

function CheckRow({
  check,
}: {
  check: HealthCheck
}) {
  return (
    <div className="flex items-center gap-3">
      {check.status === 'pass' && (
        <CheckCircle2
          size={16}
          className="shrink-0 text-emerald-400"
        />
      )}

      {check.status === 'warning' && (
        <CircleAlert
          size={16}
          className="shrink-0 text-amber-400"
        />
      )}

      {check.status === 'fail' && (
        <CircleX
          size={16}
          className="shrink-0 text-red-400"
        />
      )}

      <span className="text-xs text-gray-400">
        {check.label}
      </span>
    </div>
  )
}

function createDemoAuditResult(
  property: PropertyHealth,
): PropertyHealth {
  const checks = property.checks.map(
    (check) => {
      const random = Math.random()

      let status: HealthCheck['status']

      if (random > 0.18) {
        status = 'pass'
      } else if (random > 0.05) {
        status = 'warning'
      } else {
        status = 'fail'
      }

      return {
        ...check,
        status,
      }
    },
  )

  const score = calculateScore(checks)

  return {
    ...property,
    score,
    lastAudit: new Date().toLocaleString(),
    checks,
  }
}

function calculateScore(
  checks: HealthCheck[],
) {
  if (!checks.length) return 0

  const score = checks.reduce(
    (total, check) => {
      if (check.status === 'pass') {
        return total + 100
      }

      if (check.status === 'warning') {
        return total + 60
      }

      return total + 20
    },
    0,
  )

  return Math.round(score / checks.length)
}

function delay(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

export default HealthMonitor