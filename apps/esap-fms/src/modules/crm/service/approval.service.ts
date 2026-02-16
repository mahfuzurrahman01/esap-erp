import {
  ApprovalList,
  ApprovalPaginator,
  ApprovalQueryOptions,
} from "@/modules/crm/types/approval"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const approval = {
  all: (params: Partial<ApprovalQueryOptions>) =>
    httpClient.get<ApprovalPaginator>(ApiEndpoint.crm.approval, params),
  get: (id: string) =>
    httpClient.get<ApprovalList>(`${ApiEndpoint.crm.approval}/${id}`),
  create: (input: ApprovalList) =>
    httpClient.post<ApprovalList>(ApiEndpoint.crm.approval, input),
  update: (input: ApprovalList) =>
    httpClient.patch<ApprovalList>(`${ApiEndpoint.crm.approvalUpdate}`, input),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.approval}/${id}`),
}
