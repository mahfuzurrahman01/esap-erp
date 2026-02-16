import {
  RiskEvaluation,
  RiskEvaluationPaginator,
  RiskEvaluationQueryOptions,
} from "@/modules/scm/types/compliance-and-risk/risk-evaluation"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const RiskEvaluationService = {
  all: (params?: Partial<RiskEvaluationQueryOptions>) => {
    return HttpClient.get<RiskEvaluationPaginator>(
      ApiEndpoint.scm.getAllRiskEvaluation,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<RiskEvaluation>(ApiEndpoint.scm.getRiskEvaluationById(id)),
  create: (input: RiskEvaluation) =>
    HttpClient.post<RiskEvaluation>(
      ApiEndpoint.scm.createRiskEvaluation,
      input
    ),
  update: (input: RiskEvaluation) =>
    HttpClient.put<RiskEvaluation>(ApiEndpoint.scm.updateRiskEvaluation, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteRiskEvaluation(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteRiskEvaluation, ids)
  },
}
