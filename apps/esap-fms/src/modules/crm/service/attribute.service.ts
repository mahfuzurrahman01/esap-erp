import {
  AttributeList,
  AttributePaginator,
  AttributeQueryOptions,
} from "@/modules/crm/types/attribute"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const attribute = {
  all: (params: Partial<AttributeQueryOptions>) =>
    httpClient.get<AttributePaginator>(ApiEndpoint.crm.attributes, params),
  get: (id: string) =>
    httpClient.get<AttributeList>(`${ApiEndpoint.crm.attributes}/${id}`),
  create: (input: AttributeList) =>
    httpClient.post<AttributeList>(ApiEndpoint.crm.attributes, input),
  update: (id: string, input: AttributeList) =>
    httpClient.patch<AttributeList>(
      `${ApiEndpoint.crm.attributes}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.attributes}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteAttribute, ids)
  },
}
