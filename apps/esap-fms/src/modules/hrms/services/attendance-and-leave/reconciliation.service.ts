import { ApiEndpoint } from "@/server/client"
import {
  ApprovalFormInput,
  ReconciliationDataResponse,
  ReconciliationQueryOptions,
  ReconciliationRequest,
} from "@/types/hrms/attendance-and-leave/reconciliation.types"
import httpClient from "@/utils/axios"

export const ReconciliationService = {
  all: (params: Partial<ReconciliationQueryOptions>) => {
    return httpClient.get<ReconciliationDataResponse>(
      ApiEndpoint.hr.fetchAllReconciliations,
      params
    )
  },
  get: (id: number) =>
    httpClient.get<ReconciliationRequest>(
      `${ApiEndpoint.hr.fetchReconciliationById(id)}`
    ),
  create: (input: ReconciliationRequest) =>
    httpClient.post<ReconciliationRequest>(
      ApiEndpoint.hr.createReconciliation,
      input
    ),
  update: (input: ApprovalFormInput) =>
    httpClient.put<ApprovalFormInput>(
      `${ApiEndpoint.hr.reviewReconciliation}`,
      input
    ),
  delete: (id: number) =>
    httpClient.delete(`${ApiEndpoint.hr.deleteReconciliation(id)}`),
  bulkDelete: (ids: number[]) =>
    httpClient.post(`${ApiEndpoint.hr.deleteAttendances}`, { ids }),
}
