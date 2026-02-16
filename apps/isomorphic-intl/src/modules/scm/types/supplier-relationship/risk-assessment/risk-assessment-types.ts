import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface RiskAssessment {
  id?: number
  supplierId?: number
  supplierName?: string
  riskType?: string
  riskDescription?: string
  mitigationPlan?: string
  riskStatus?: string
}

export interface RiskAssessmentQueryOptions extends QueryOptions {
  supplierName?: string
  riskType?: string
  riskStatus?: string
}

export type RiskAssessmentPaginator = PaginatedResponse<RiskAssessment>
