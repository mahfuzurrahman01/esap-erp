import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface StockReplanishmentApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  stockReplenishmentId?: number
  approvalStatus?: string
  approvedBy?: string
  approvalDate?: string
  approvalNotes?: string
}

export interface StockReplanishmentApprovalQueryOptions extends QueryOptions {
  approvalDate?: string
  approvalStatus?: string
}

export type StockReplanishmentApprovalPaginator =
  PaginatedResponse<StockReplanishmentApproval>
