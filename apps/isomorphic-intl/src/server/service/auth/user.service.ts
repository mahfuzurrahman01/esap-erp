import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"
import { default as httpClient1 } from "@/utils/crm/axios"

import { SingleUser, UserList, UserPaginator, UserQueryOptions } from "@/types/auth"

export const user = {
  all: (params: Partial<UserQueryOptions>) => {
    return httpClient.get<UserPaginator>(ApiEndpoint.crm.users, params)
  },
  get: (id: string) =>
    httpClient.get<SingleUser>(`${ApiEndpoint.crm.users}/${id}`),
  getByEmail: (email: string) =>
    httpClient.get<SingleUser>(`${ApiEndpoint.crm.usersByEmail}/${email}`),
  create: (input: UserList) => {
    return httpClient.post<UserList>(ApiEndpoint.crm.users, input, true)
  },
  update: (id: string, input: UserList) => {
    return httpClient.put<UserList>(`${ApiEndpoint.crm.users}`, input, true)
  },
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.users}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteUser, ids)
  },
  verify2fa: (input: { email: string; otp: number }) =>
    httpClient.post<any>(ApiEndpoint.crm.verify2fa, input),
  enable2fa: (data: { email: string }) => {
    return httpClient1.getBlob(ApiEndpoint.crm.enable2fa, {
      email: data.email,
      responseType: "blob",
    })
  },
}
