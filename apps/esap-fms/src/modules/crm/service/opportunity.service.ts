import {
  Opportunity,
  OpportunityList,
  OpportunityPaginator,
  OpportunityQueryOptions,
} from "@/modules/crm/types/opportunity"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const opportunity = {
  all: (params: Partial<OpportunityQueryOptions>) =>
    httpClient.get<OpportunityPaginator>(ApiEndpoint.crm.opportunities, params),
  get: (id: string) =>
    httpClient.get<OpportunityList>(`${ApiEndpoint.crm.opportunities}/${id}`),
  create: (input: Opportunity) =>
    httpClient.post<Opportunity>(ApiEndpoint.crm.opportunities, input),
  update: (id: string, input: OpportunityList) =>
    httpClient.patch<OpportunityList>(
      `${ApiEndpoint.crm.opportunities}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.opportunities}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteOpportunity, ids)
  },
}
