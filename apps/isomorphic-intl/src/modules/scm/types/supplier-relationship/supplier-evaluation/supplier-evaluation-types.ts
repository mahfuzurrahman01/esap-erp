import { PaginatedResponse } from "@/modules/scm/types/common.types"
import { QueryOptions } from "@/types"

export interface EvaluationCriteriaForm {
  supplierId?: number
  overallScore?: number
  evaluationDate?: string
  evaluatorName?: string
  comments?: string
}

export interface EvaluationCriteria {
  id?: number
  supplierEvaluationId?: number
  criteriaName?: string
  score?: number
}

export interface CreateSupplierEvaluationInput extends SupplierEvaluation {
  evaluationCriteries?: EvaluationCriteria[]
}

export interface UpdateSupplierEvaluationInput extends SupplierEvaluation {
  id: number
  evaluationCriteries: EvaluationCriteria[]
}

export interface SupplierEvaluation {
  id?: number
  supplierId?: number
  supplierName?: string
  overallScore?: number
  evaluationDate?: string
  evaluatorName?: string
  comments?: string
  evaluationCriteries?: EvaluationCriteria[]
}

export interface SupplierEvaluationQueryOptions extends QueryOptions {
  supplierName?: string
  overallScore?: string
  evaluator?: string
}

export type SupplierEvaluationPaginator = PaginatedResponse<SupplierEvaluation>

// export type SupplierEvaluationPaginator = PaginatedResponse<SupplierEvaluation>
