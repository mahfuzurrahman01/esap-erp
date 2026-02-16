import {
  RiskAssessment,
  RiskAssessmentPaginator,
  RiskAssessmentQueryOptions,
} from "@/modules/scm/types/supplier-relationship/risk-assessment/risk-assessment-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const RiskAssessmentService = {
  all: (params?: Partial<RiskAssessmentQueryOptions>) => {
    return HttpClient.get<RiskAssessmentPaginator>(
      ApiEndpoint.scm.getAllRiskAssessment,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<RiskAssessment>(ApiEndpoint.scm.getRiskAssessmentById(id)),
  create: (input: RiskAssessment) =>
    HttpClient.post<RiskAssessment>(
      ApiEndpoint.scm.createRiskAssessment,
      input
    ),
  update: (input: RiskAssessment) =>
    HttpClient.put<RiskAssessment>(ApiEndpoint.scm.updateRiskAssessment, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteRiskAssessment(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteRiskAssessment, ids)
  },
}
