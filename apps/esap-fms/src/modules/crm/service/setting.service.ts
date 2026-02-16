import {
  SettingList,
  SettingPaginator,
  SettingQueryOptions,
} from "@/modules/crm/types/setting"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const setting = {
  all: (params: Partial<SettingQueryOptions>) =>
    httpClient.get<SettingPaginator>(ApiEndpoint.crm.settings, params),
  get: (id: string) =>
    httpClient.get<SettingList>(`${ApiEndpoint.crm.settings}/${id}`),
  create: (input: SettingList) =>
    httpClient.post<SettingList>(ApiEndpoint.crm.settings, input),
  update: (id: string, input: SettingList) =>
    httpClient.put<SettingList>(`${ApiEndpoint.crm.settings}/${id}`, input),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.settings}/${id}`),
}
