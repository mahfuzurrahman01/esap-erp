import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface StockTransferApproval {
  id?: number
  stockTransferId?: number
  approvalStatus?: string
  approvedBy?: string
  approvalDate?: string
  approvalNotes?: string
}

export interface StockTransferApprovalQueryOptions extends QueryOptions {
  approvalDate?: string
  approvalStatus?: string
}

export type StockTransferApprovalPaginator =
  PaginatedResponse<StockTransferApproval>
