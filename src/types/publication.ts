export type PublicationStage =
  | 'Draft'
  | 'Entity Check'
  | 'SEO Review'
  | 'Approved'
  | 'Published'

export interface PublicationItem {
  id: string
  title: string
  entity: string
  platform: string
  stage: PublicationStage
  updatedAt: string

  checks: {
    primaryEntity: boolean
    organizationName: boolean
    location: boolean
    topicAssociation: boolean
    internalLinks: boolean
    authorityReferences: boolean
    metadata: boolean
  }
}