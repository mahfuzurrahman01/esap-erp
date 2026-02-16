import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface ReturnProcessApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  returnRequestId?: number
  approvalStatus?: string
  approvalDate?: string
  approvalNotes?: string
}

export interface ReturnProcessApprovalQueryOptions extends QueryOptions {
  approvalDate: string
  approvalStatus: string
}

export type ReturnProcessApprovalPaginator =
  PaginatedResponse<ReturnProcessApproval>
