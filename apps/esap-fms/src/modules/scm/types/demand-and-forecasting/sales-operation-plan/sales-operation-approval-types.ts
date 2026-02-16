import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface SalesOperationApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  forecastReviewId?: number
  approvalStatus?: string
  approvedBy?: string
  approvalDate?: string
  approvalNotes?: string
}

export interface SalesOperationApprovalQueryOptions extends QueryOptions {
  approvalStatus?: string
  approvalDate?: string
}

export type SalesOperationApprovalPaginator =
  PaginatedResponse<SalesOperationApproval>
