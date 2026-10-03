import type { PropertyHealth } from '../types/health'

export const propertyHealthData: PropertyHealth[] = [
  {
    id: 'HLT-3001',
    name: 'Brand Knowledge Hub',
    platform: 'WordPress',
    score: 100,
    lastAudit: '2026-10-03 15:30',
    checks: [
      {
        id: 'availability',
        label: 'Property reachable',
        status: 'pass',
      },
      {
        id: 'metadata',
        label: 'Metadata complete',
        status: 'pass',
      },
      {
        id: 'canonical',
        label: 'Canonical URL configured',
        status: 'pass',
      },
      {
        id: 'links',
        label: 'Outbound links valid',
        status: 'pass',
      },
      {
        id: 'entity',
        label: 'Entity information consistent',
        status: 'pass',
      },
    ],
  },

  {
    id: 'HLT-3002',
    name: 'Executive Commentary',
    platform: 'Blogger',
    score: 82,
    lastAudit: '2026-10-03 14:52',
    checks: [
      {
        id: 'availability',
        label: 'Property reachable',
        status: 'pass',
      },
      {
        id: 'metadata',
        label: 'Metadata complete',
        status: 'warning',
      },
      {
        id: 'canonical',
        label: 'Canonical URL configured',
        status: 'pass',
      },
      {
        id: 'links',
        label: 'Outbound links valid',
        status: 'warning',
      },
      {
        id: 'entity',
        label: 'Entity information consistent',
        status: 'pass',
      },
    ],
  },

  {
    id: 'HLT-3003',
    name: 'Brand Overview',
    platform: 'Tumblr',
    score: 78,
    lastAudit: '2026-10-03 13:40',
    checks: [
      {
        id: 'availability',
        label: 'Property reachable',
        status: 'pass',
      },
      {
        id: 'metadata',
        label: 'Metadata complete',
        status: 'warning',
      },
      {
        id: 'canonical',
        label: 'Canonical URL configured',
        status: 'fail',
      },
      {
        id: 'links',
        label: 'Outbound links valid',
        status: 'pass',
      },
      {
        id: 'entity',
        label: 'Entity information consistent',
        status: 'pass',
      },
    ],
  },
]