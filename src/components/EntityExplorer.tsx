import { useMemo, useState } from 'react'
import {
  CheckCircle2,
  CircleAlert,
  Network,
  X,
} from 'lucide-react'

import {
  entityConnections,
  entityNodes,
} from '../data/entities'

import type { EntityNode } from '../types/entity'

function EntityExplorer() {
  const [selectedNode, setSelectedNode] =
    useState<EntityNode | null>(entityNodes[0])

  const selectedConnections = useMemo(() => {
    if (!selectedNode) return []

    return entityConnections.filter(
      (connection) =>
        connection.source === selectedNode.id ||
        connection.target === selectedNode.id,
    )
  }, [selectedNode])

  return (
    <section
      id="entities"
      className="mt-20 scroll-mt-8"
    >
      <div className="mb-7">
        <div className="flex items-center gap-2 text-emerald-400">
          <Network size={17} />

          <span className="text-sm font-medium">
            Entity Ecosystem Explorer
          </span>
        </div>

        <h2 className="mt-2 text-3xl font-semibold tracking-tight">
          Structured Link Ecosystem
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
          Interactive visualization of how owned properties,
          Web 2.0 assets, social profiles, and authority content
          reinforce a primary entity.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_0.7fr]">
        <div className="relative min-h-[620px] overflow-hidden rounded-xl border border-white/10 bg-[#0d1219]">

          <div className="absolute left-5 top-5 z-20">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-600">
              Entity Graph
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Click any node to inspect its relationship.
            </p>
          </div>

          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {entityConnections.map((connection) => {
              const source = entityNodes.find(
                (node) => node.id === connection.source,
              )

              const target = entityNodes.find(
                (node) => node.id === connection.target,
              )

              if (!source || !target) return null

              return (
                <line
                  key={`${connection.source}-${connection.target}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(255,255,255,0.13)"
                  strokeWidth="0.35"
                  strokeDasharray={
                    connection.relation.includes('Link')
                      ? '1 1'
                      : undefined
                  }
                />
              )
            })}
          </svg>

          {entityNodes.map((node) => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
              }}
              className={`absolute z-10 w-36 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-3 text-left shadow-xl transition hover:scale-105 ${
                selectedNode?.id === node.id
                  ? 'border-emerald-400/50 bg-emerald-400/10'
                  : node.type === 'Primary Entity'
                    ? 'border-emerald-400/30 bg-[#111922]'
                    : 'border-white/10 bg-[#11161e] hover:border-white/20'
              }`}
            >
              <p className="truncate text-xs font-medium">
                {node.label}
              </p>

              <p className="mt-1 truncate text-[10px] text-gray-600">
                {node.platform}
              </p>

              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`h-2 w-2 rounded-full ${
                    node.status === 'Active'
                      ? 'bg-emerald-400'
                      : 'bg-amber-400'
                  }`}
                />

                <span className="font-mono text-[10px] text-gray-500">
                  {node.health}%
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-white/10 bg-[#0d1219]">
          {selectedNode ? (
            <NodeDetails
              node={selectedNode}
              connections={selectedConnections}
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center p-8 text-center">
              <p className="text-sm text-gray-600">
                Select a node to inspect its details.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.03] p-4">
        <p className="text-xs font-medium text-emerald-400">
          Demonstration Ecosystem
        </p>

        <p className="mt-2 text-xs leading-5 text-gray-500">
          Entities, relationships, URLs, and health scores
        </p>
      </div>
    </section>
  )
}

function NodeDetails({
  node,
  connections,
  onClose,
}: {
  node: EntityNode
  connections: typeof entityConnections
  onClose: () => void
}) {
  return (
    <div>
      <div className="flex items-start justify-between border-b border-white/10 p-6">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-gray-600">
            Selected Node
          </p>

          <p className="mt-2 font-mono text-xs text-emerald-400">
            {node.id}
          </p>
        </div>

        <button
          onClick={onClose}
          className="rounded-lg border border-white/10 p-2 text-gray-500 transition hover:bg-white/5 hover:text-white"
        >
          <X size={16} />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold">
          {node.label}
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          {node.platform}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <DetailBox
            label="Type"
            value={node.type}
          />

          <DetailBox
            label="Status"
            value={node.status}
          />

          <DetailBox
            label="Health"
            value={`${node.health}%`}
          />

          <DetailBox
            label="Relations"
            value={connections.length.toString()}
          />
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium">
            Relationships
          </p>

          <div className="mt-4 space-y-3">
            {connections.map((connection) => {
              const otherNodeId =
                connection.source === node.id
                  ? connection.target
                  : connection.source

              const otherNode = entityNodes.find(
                (item) => item.id === otherNodeId,
              )

              return (
                <div
                  key={`${connection.source}-${connection.target}`}
                  className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center gap-2">
                    {node.status === 'Active' ? (
                      <CheckCircle2
                        size={15}
                        className="text-emerald-400"
                      />
                    ) : (
                      <CircleAlert
                        size={15}
                        className="text-amber-400"
                      />
                    )}

                    <span className="text-xs text-gray-500">
                      {connection.relation}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-300">
                    {otherNode?.label ?? otherNodeId}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-medium">
            Entity Signals
          </p>

          <div className="mt-4 space-y-3">
            <Signal label="Identity consistency" />
            <Signal label="Topic association" />
            <Signal label="Structured metadata" />
            <Signal label="Cross-property attribution" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Signal({
  label,
}: {
  label: string
}) {
  return (
    <div className="flex items-center gap-3">
      <CheckCircle2
        size={15}
        className="text-emerald-400"
      />

      <span className="text-xs text-gray-400">
        {label}
      </span>
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
    <div className="rounded-lg border border-white/10 bg-white/[0.02] p-3">
      <p className="text-xs text-gray-600">
        {label}
      </p>

      <p className="mt-2 text-sm text-gray-300">
        {value}
      </p>
    </div>
  )
}

export default EntityExplorer