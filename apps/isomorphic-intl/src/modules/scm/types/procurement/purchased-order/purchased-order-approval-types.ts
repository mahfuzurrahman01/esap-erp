import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface PurchasedOrderApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  purchaseOrderId?: number
  approvalStatus?: string
  approvedBy?: string
  approvedDate?: string
  approveNotes?: string
}

export interface PurchasedOrderApprovalQueryOptions extends QueryOptions {}

export type PurchasedOrderApprovalPaginator =
  PaginatedResponse<PurchasedOrderApproval>
