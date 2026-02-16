import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface BillOfMaterialsApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  billOfMaterialId?: number
  approvalStatus?: string
  approvedBy?: string
  approvedDate?: string
  approvedNotes?: string
}

export interface BillOfMaterialsApprovalQueryOptions extends QueryOptions {
  approvalStatus?: string
  approvedDate?: string
}

export type BillOfMaterialsApprovalPaginator =
  PaginatedResponse<BillOfMaterialsApproval>
