import { EvaluationCriteria, SupplierEvaluation } from "../types/supplier-relationship/supplier-evaluation/supplier-evaluation-types"

export const DEFAULT_EVALUATION_CRITERIA: EvaluationCriteria = {
  criteriaName: "",
  score: 0,
}

export const DEFAULT_SUPPLIER_EVALUATION_VALUES: SupplierEvaluation = {
  supplierId: 0,
  overallScore: 0,
  evaluationDate: new Date().toISOString(),
  evaluatorName: "",
  comments: "",
  evaluationCriteries: [],
}
