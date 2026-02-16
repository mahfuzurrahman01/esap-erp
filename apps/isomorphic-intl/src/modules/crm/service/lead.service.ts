import {
  LeadImportData,
  LeadList,
  LeadPaginator,
  LeadQueryOptions,
} from "@/modules/crm/types/lead"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const lead = {
  all: (params: Partial<LeadQueryOptions>) =>
    httpClient.get<LeadPaginator>(ApiEndpoint.crm.leads, params),
  get: (id: string) =>
    httpClient.get<LeadList>(`${ApiEndpoint.crm.leads}/${id}`),
  create: (input: LeadList) =>
    httpClient.post<LeadList>(ApiEndpoint.crm.leads, input),
  import: (input: LeadImportData) =>
    httpClient.post<LeadImportData>(ApiEndpoint.crm.leadImport, input, true),
  update: (id: string, input: LeadList) =>
    httpClient.patch<LeadList>(`${ApiEndpoint.crm.leads}/${id}`, input),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.leads}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteLead, ids)
  },
}
