import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface Compliance {
  createdDate?: string
  updatedDate?: string
  id?: number
  complianceArea?: string
  regulationStandard?: string
  taskName?: string
  assignedToId?: number
  assignedToName?: string
  dueDate?: string
  completionStatus?: string
  proofDocumentUrl?: string
  comments?: string
}

export interface ComplianceQueryOptions extends QueryOptions {
  assignedTo?: string
  completionStatus?: string
}

export type CompliancePaginator = PaginatedResponse<Compliance>
