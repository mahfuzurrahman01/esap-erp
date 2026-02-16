import {
  SettingList,
  SettingPaginator,
  SettingQueryOptions,
} from "@/modules/crm/types/setting"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const emailSetting = {
  all: (params: Partial<SettingQueryOptions>) =>
    httpClient.get<SettingPaginator>(ApiEndpoint.crm.emailSettings, params),
  get: (id: string) =>
    httpClient.get<SettingList>(`${ApiEndpoint.crm.emailSettings}/${id}`),
  create: (input: SettingList) =>
    httpClient.post<SettingList>(ApiEndpoint.crm.emailSettings, input),
  update: (id: string, input: SettingList) =>
    httpClient.put<SettingList>(`${ApiEndpoint.crm.emailSettings}/${id}`, input),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.emailSettings}/${id}`),
}
