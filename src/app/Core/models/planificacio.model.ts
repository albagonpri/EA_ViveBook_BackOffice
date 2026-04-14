export interface Milestone {
  description: string
  status: 'pending' | 'completed'
}

export interface Planificacio {
  _id?: string
  title: string
  book: string | { _id: string; title: string; isbn?: string }
  milestones: Milestone[]
  IsDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PaginatedPlanificacionsResponse {
  data: Planificacio[]
  total: number
  page: number
  limit: number
  totalPages: number
}