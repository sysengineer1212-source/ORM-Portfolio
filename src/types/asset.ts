export type AssetStatus = 'Active' | 'Review' | 'Draft'

export type AssetType =
  | 'Web 2.0'
  | 'Social'
  | 'Article'
  | 'Owned Property'

export interface CampaignAsset {
  id: string
  name: string
  platform: string
  type: AssetType
  entity: string
  status: AssetStatus
  health: number
  lastAudit: string
  url: string

  checks: {
    reachable: boolean
    metadataComplete: boolean
    entityConsistent: boolean
    canonicalConfigured: boolean
    outboundLinksValid: boolean
    schemaLogged: boolean
  }
}