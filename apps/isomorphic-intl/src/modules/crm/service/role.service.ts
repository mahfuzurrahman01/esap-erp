import {
  RoleEditFormProps,
  RoleList,
  RolePaginator,
  RoleQueryOptions,
} from "@/modules/crm/types/role"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const role = {
  all: (params: Partial<RoleQueryOptions>) =>
    httpClient.get<RolePaginator>(ApiEndpoint.auth.roles, params),
  get: (id: string) =>
    httpClient.get<RoleList>(`${ApiEndpoint.auth.roles}/${id}`),
  create: (input: RoleEditFormProps) =>
    httpClient.post<RoleEditFormProps>(
      ApiEndpoint.auth.roleWithPermission,
      input
    ),
  update: (id: string, input: RoleEditFormProps) =>
    httpClient.put<RoleEditFormProps>(
      `${ApiEndpoint.auth.roleWithPermission}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.auth.roles}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.auth.bulkDeleteRole, ids)
  },
}
