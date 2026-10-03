export interface ProjectCaseStudy {
  id: string
  title: string
  summary: string
  problem: string
  solution: string
  impact: string[]
  stack: string[]
}

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    id: 'asset-hub',
    title: 'Campaign Asset Hub',
    summary:
      'Centralized workflow for provisioning, cataloging, and auditing Web 2.0 properties and social profiles.',
    problem:
      'ORM campaigns can involve many distributed properties across different platforms. Without centralized tracking, teams can lose visibility into ownership, configuration status, entity alignment, and publishing readiness.',
    solution:
      'I designed a PHP and WordPress-based workflow backed by structured Supabase records. Each asset receives a unique identifier, entity association, platform metadata, status, audit history, and readiness checks.',
    impact: [
      'Centralized campaign asset metadata',
      'Standardized property setup procedures',
      'Improved visibility into incomplete assets',
      'Created reliable records for downstream tracking and schema updates',
    ],
    stack: [
      'PHP',
      'WordPress',
      'Supabase',
      'PostgreSQL',
      'REST API',
    ],
  },
  {
    id: 'publishing',
    title: 'Authority Content Publishing Pipeline',
    summary:
      'Reusable workflow for preparing, validating, approving, and publishing entity-aligned authority content.',
    problem:
      'Publishing content across many ORM properties becomes difficult to manage when article status, entity alignment, metadata, and approval history are tracked manually.',
    solution:
      'I created reusable publishing templates and workflow stages for Draft, Entity Check, SEO Review, Approval, and Publication. Validation rules ensure required entity and metadata fields are complete before publishing.',
    impact: [
      'Created repeatable publishing procedures',
      'Reduced inconsistent article metadata',
      'Improved visibility into content status',
      'Supported consistent entity-aligned publishing',
    ],
    stack: [
      'PHP',
      'WordPress',
      'REST API',
      'Structured Metadata',
      'Content Operations',
    ],
  },
  {
    id: 'health-monitor',
    title: 'SEO Property Health Monitor',
    summary:
      'Automated monitoring for availability, metadata completeness, link integrity, and publishing readiness.',
    problem:
      'ORM properties can silently develop issues such as missing metadata, broken links, configuration drift, or inaccessible pages.',
    solution:
      'I implemented automated health checks that evaluate property availability, metadata, canonical configuration, entity consistency, and outbound-link structure. Results are normalized into health scores for operations teams.',
    impact: [
      'Surfaced asset issues earlier',
      'Reduced manual property verification',
      'Created consistent audit criteria',
      'Improved campaign-level operational visibility',
    ],
    stack: [
      'PHP',
      'Automation',
      'HTTP Validation',
      'SEO Metadata',
      'Supabase',
    ],
  },
]