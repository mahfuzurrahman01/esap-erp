import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface MaterialRequirementsPlanApproval {
  createdBy?: string
  createdDate?: string
  updatedBy?: string
  updatedDate?: string
  id?: number
  materialRequirementPlanId?: number
  approvalStatus?: string
  approvedBy?: string
  approvedDate?: string
  approvedNotes?: string
}

export interface MaterialRequirementsPlanApprovalQueryOptions
  extends QueryOptions {
  approvalStatus?: string
  approvedDate?: string
}

export type MaterialRequirementsPlanApprovalPaginator =
  PaginatedResponse<MaterialRequirementsPlanApproval>
