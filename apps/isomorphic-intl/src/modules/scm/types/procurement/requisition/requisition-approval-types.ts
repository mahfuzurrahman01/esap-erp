import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface RequisitionApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  requisitionId?: number
  approvalStatus?: string
  approvedBy: string
  approvalDate?: string
  approvalNotes?: string
}

export interface RequisitionApprovalQueryOptions extends QueryOptions {}

export type RequisitionApprovalPaginator =
  PaginatedResponse<RequisitionApproval>
