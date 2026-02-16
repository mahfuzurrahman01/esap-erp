import {
  CampaignList,
  CampaignPaginator,
  CampaignQueryOptions,
} from "@/modules/crm/types/campaign"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const campaign = {
  all: (params: Partial<CampaignQueryOptions>) =>
    httpClient.get<CampaignPaginator>(ApiEndpoint.crm.campaigns, params),
  get: (id: string) =>
    httpClient.get<CampaignList>(`${ApiEndpoint.crm.campaigns}/${id}`),
  create: (input: CampaignList) =>
    httpClient.post<CampaignList>(ApiEndpoint.crm.campaigns, input, true),
  update: (id: string, input: CampaignList) =>
    httpClient.patch<CampaignList>(`${ApiEndpoint.crm.campaigns}/${id}`, input, true),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.campaigns}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteCampaign, ids)
  },
}
