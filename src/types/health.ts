export interface HealthCheck {
  id: string
  label: string
  status: 'pass' | 'warning' | 'fail'
}

export interface PropertyHealth {
  id: string
  name: string
  platform: string
  score: number
  lastAudit: string
  checks: HealthCheck[]
}