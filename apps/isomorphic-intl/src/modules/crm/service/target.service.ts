import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  TargetList,
  TargetPaginator,
  TargetQueryOptions,
} from "../types/target"

export const target = {
  all: (params: Partial<TargetQueryOptions>) =>
    httpClient.get<TargetPaginator>(ApiEndpoint.crm.targets, params),
  get: (id: string) =>
    httpClient.get<TargetList>(`${ApiEndpoint.crm.targets}/${id}`),
  create: (input: TargetList) =>
    httpClient.post<TargetList>(ApiEndpoint.crm.targets, input),
  update: (id: string, input: TargetList) =>
    httpClient.put<TargetList>(`${ApiEndpoint.crm.targets}/${id}`, input),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.targets}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteTarget, ids)
  },
}
