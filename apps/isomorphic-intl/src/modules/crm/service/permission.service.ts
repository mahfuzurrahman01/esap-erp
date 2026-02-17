import {
  PermissionList,
  PermissionPaginator,
  PermissionQueryOptions,
} from "@/modules/crm/types/permission"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const permission = {
  all: (params: Partial<PermissionQueryOptions>) =>
    httpClient.get<PermissionPaginator>(
      ApiEndpoint.auth.permissions,
      params
    ),
  get: (id: string) =>
    httpClient.get<PermissionList>(`${ApiEndpoint.auth.permissions}/${id}`),
  create: (input: PermissionList) =>
    httpClient.post<PermissionList>(ApiEndpoint.auth.permissions, input),
  update: (id: string, input: PermissionList) =>
    httpClient.put<PermissionList>(
      `${ApiEndpoint.auth.permissions}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.auth.permissions}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.auth.bulkDeletePermission, ids)
  },
}
