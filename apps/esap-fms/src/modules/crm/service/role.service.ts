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
    httpClient.get<RolePaginator>(ApiEndpoint.crm.roles, params),
  get: (id: string) =>
    httpClient.get<RoleList>(`${ApiEndpoint.crm.roles}/${id}`),
  create: (input: RoleEditFormProps) =>
    httpClient.post<RoleEditFormProps>(
      ApiEndpoint.crm.roleWithPermission,
      input
    ),
  update: (id: string, input: RoleEditFormProps) =>
    httpClient.put<RoleEditFormProps>(
      `${ApiEndpoint.crm.roleWithPermission}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.roles}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteRole, ids)
  },
}
