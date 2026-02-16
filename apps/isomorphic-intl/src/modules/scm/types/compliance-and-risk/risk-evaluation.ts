import {
  PaginatedResponse,
  QueryOptions,
} from "@/modules/scm/types/common.types"

export interface RiskEvaluation {
  createdDate?: string
  updatedDate?: string
  id?: number
  riskType?: string
  riskImpact?: string
  riskProbability?: string
  residualRisk?: string
  followUpAction?: string
  riskDescription?: string
  mitigationAction?: string
  responsibleParty?: string
  mitigationDeadline?: string
  mitigationStatus?: string
  riskStatus?: string
  comments?: string
}

export interface RiskEvaluationQueryOptions extends QueryOptions {
  riskType?: string
  riskImpact?: string
  mitigationStatus?: string
}

export type RiskEvaluationPaginator = PaginatedResponse<RiskEvaluation>
