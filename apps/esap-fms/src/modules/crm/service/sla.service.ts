import { SlaList, SlaPaginator, SlaQueryOptions } from "@/modules/crm/types/sla"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const sla = {
  all: (params: Partial<SlaQueryOptions>) =>
    httpClient.get<SlaPaginator>(ApiEndpoint.crm.sla, params),
  get: (id: string) => httpClient.get<SlaList>(`${ApiEndpoint.crm.sla}/${id}`),
  create: (input: SlaList) =>
    httpClient.post<SlaList>(ApiEndpoint.crm.sla, input),
  update: (id: string, input: SlaList) =>
    httpClient.patch<SlaList>(`${ApiEndpoint.crm.sla}/${id}`, input),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.sla}/${id}`),
}
