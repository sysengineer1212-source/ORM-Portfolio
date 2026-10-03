import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  ChevronRight,
  CircleAlert,
  Database,
  Search,
  X,
} from 'lucide-react'

import { campaignAssets } from '../data/assets'

import type {
  AssetStatus,
  AssetType,
  CampaignAsset,
} from '../types/asset'

const assetTypes: Array<'All' | AssetType> = [
  'All',
  'Web 2.0',
  'Social',
  'Article',
  'Owned Property',
]

const statuses: Array<'All' | AssetStatus> = [
  'All',
  'Active',
  'Review',
  'Draft',
]

function AssetHub() {
  const [search, setSearch] = useState('')
  const [type, setType] = useState<'All' | AssetType>('All')
  const [status, setStatus] = useState<'All' | AssetStatus>('All')
  const [selectedAsset, setSelectedAsset] =
    useState<CampaignAsset | null>(null)

  const filteredAssets = useMemo(() => {
    return campaignAssets.filter((asset) => {
      const searchValue = search.toLowerCase()

      const matchesSearch =
        asset.name.toLowerCase().includes(searchValue) ||
        asset.platform.toLowerCase().includes(searchValue) ||
        asset.entity.toLowerCase().includes(searchValue) ||
        asset.id.toLowerCase().includes(searchValue)

      const matchesType =
        type === 'All' || asset.type === type

      const matchesStatus =
        status === 'All' || asset.status === status

      return matchesSearch && matchesType && matchesStatus
    })
  }, [search, type, status])

  return (
    <section
      id="assets"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-emerald-400">
            <Database size={17} />

            <span className="text-sm font-medium">
              Campaign Asset Hub
            </span>
          </div>

          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Digital Property Inventory
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Centralized tracking for Web 2.0 properties,
            social profiles, owned properties, and published
            authority content.
          </p>
        </div>

        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-2">
          <p className="text-xs text-emerald-400">
            Dataset · {campaignAssets.length} Assets
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d1219]">

        {/* Toolbar */}
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 lg:flex-row">

          <div className="relative flex-1">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search assets, platforms, entities..."
              className="w-full rounded-lg border border-white/10 bg-[#080b10] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-emerald-400/40"
            />
          </div>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value as 'All' | AssetType)
            }
            className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2.5 text-sm text-gray-300 outline-none"
          >
            {assetTypes.map((value) => (
              <option key={value} value={value}>
                {value === 'All'
                  ? 'All Asset Types'
                  : value}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as 'All' | AssetStatus,
              )
            }
            className="rounded-lg border border-white/10 bg-[#080b10] px-4 py-2.5 text-sm text-gray-300 outline-none"
          >
            {statuses.map((value) => (
              <option key={value} value={value}>
                {value === 'All'
                  ? 'All Statuses'
                  : value}
              </option>
            ))}
          </select>
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-gray-600">
                <th className="px-5 py-4 font-medium">Asset</th>
                <th className="px-5 py-4 font-medium">Platform</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Entity</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Health</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody>
              {filteredAssets.map((asset) => (
                <tr
                  key={asset.id}
                  onClick={() => setSelectedAsset(asset)}
                  className="cursor-pointer border-b border-white/5 transition last:border-0 hover:bg-white/[0.025]"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium">
                      {asset.name}
                    </p>

                    <p className="mt-1 font-mono text-xs text-gray-600">
                      {asset.id}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {asset.platform}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {asset.type}
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {asset.entity}
                  </td>

                  <td className="px-5 py-4">
                    <StatusBadge status={asset.status} />
                  </td>

                  <td className="px-5 py-4">
                    <HealthScore value={asset.health} />
                  </td>

                  <td className="px-5 py-4 text-right">
                    <ChevronRight
                      size={17}
                      className="text-gray-700"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="divide-y divide-white/5 md:hidden">
          {filteredAssets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => setSelectedAsset(asset)}
              className="w-full p-5 text-left transition hover:bg-white/[0.025]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {asset.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-600">
                    {asset.platform} · {asset.type}
                  </p>
                </div>

                <HealthScore value={asset.health} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <StatusBadge status={asset.status} />

                <span className="text-xs text-gray-600">
                  {asset.entity}
                </span>
              </div>
            </button>
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm text-gray-500">
              No assets match your filters.
            </p>
          </div>
        )}

        <div className="border-t border-white/10 px-5 py-3">
          <p className="text-xs text-gray-600">
            Showing {filteredAssets.length} of{' '}
            {campaignAssets.length} assets
          </p>
        </div>
      </div>

      {selectedAsset && (
        <AssetDrawer
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </section>
  )
}

function StatusBadge({
  status,
}: {
  status: AssetStatus
}) {
  const classes = {
    Active:
      'border-emerald-400/20 bg-emerald-400/10 text-emerald-400',
    Review:
      'border-amber-400/20 bg-amber-400/10 text-amber-400',
    Draft:
      'border-gray-500/20 bg-gray-500/10 text-gray-400',
  }

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs ${classes[status]}`}
    >
      {status}
    </span>
  )
}

function HealthScore({
  value,
}: {
  value: number
}) {
  const textClass =
    value >= 90
      ? 'text-emerald-400'
      : value >= 80
        ? 'text-amber-400'
        : 'text-orange-400'

  return (
    <div className="flex items-center gap-3">
      <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-white/5 xl:block">
        <div
          className="h-full rounded-full bg-emerald-400"
          style={{
            width: `${value}%`,
          }}
        />
      </div>

      <span
        className={`font-mono text-xs ${textClass}`}
      >
        {value}%
      </span>
    </div>
  )
}

interface AssetDrawerProps {
  asset: CampaignAsset
  onClose: () => void
}

function AssetDrawer({
  asset,
  onClose,
}: AssetDrawerProps) {
  const checks = [
    {
      label: 'Property reachable',
      value: asset.checks.reachable,
    },
    {
      label: 'Metadata complete',
      value: asset.checks.metadataComplete,
    },
    {
      label: 'Entity information consistent',
      value: asset.checks.entityConsistent,
    },
    {
      label: 'Canonical URL configured',
      value: asset.checks.canonicalConfigured,
    },
    {
      label: 'Outbound links validated',
      value: asset.checks.outboundLinksValid,
    },
    {
      label: 'Schema data logged',
      value: asset.checks.schemaLogged,
    },
  ]

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close asset details"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      <aside className="absolute right-0 top-0 h-full w-full max-w-lg overflow-y-auto border-l border-white/10 bg-[#0b0f15] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0b0f15]/95 px-6 py-5 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-600">
              Asset Details
            </p>

            <p className="mt-1 font-mono text-xs text-emerald-400">
              {asset.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg border border-white/10 p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-semibold">
            {asset.name}
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            {asset.platform} · {asset.type}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <DetailBox
              label="Entity"
              value={asset.entity}
            />

            <DetailBox
              label="Status"
              value={asset.status}
            />

            <DetailBox
              label="Health"
              value={`${asset.health}%`}
            />

            <DetailBox
              label="Last Audit"
              value={asset.lastAudit}
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-medium">
              Readiness Audit
            </p>

            <p className="mt-1 text-xs text-gray-600">
              Automated validation checklist
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
                    {check.value
                      ? 'Passed'
                      : 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
            <p className="text-xs font-medium text-emerald-400">
              Sanitized Asset
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              This record demonstrates campaign asset
              tracking and auditing behavior. It does not
              represent a real client property.
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

export default AssetHub