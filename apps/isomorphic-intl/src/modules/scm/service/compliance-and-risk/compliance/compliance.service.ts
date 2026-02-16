import {
  Compliance,
  CompliancePaginator,
} from "@/modules/scm/types/compliance-and-risk/compliance-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ComplianceService = {
  all: (params: Partial<CompliancePaginator>) =>
    HttpClient.get<CompliancePaginator>(
      ApiEndpoint.scm.getAllCompliance,
      params
    ),
  get: (id: number) =>
    HttpClient.get<Compliance>(ApiEndpoint.scm.getComplianceById(id)),
  create: (input: Compliance) =>
    HttpClient.post<Compliance>(ApiEndpoint.scm.createCompliance, input, true),
  update: (input: Compliance) =>
    HttpClient.put<Compliance>(ApiEndpoint.scm.updateCompliance, input, true),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteCompliance(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteCompliance, ids)
  },
}
