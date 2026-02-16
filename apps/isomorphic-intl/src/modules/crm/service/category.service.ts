import {
  CategoryList,
  CategoryPaginator,
  CategoryQueryOptions,
} from "@/modules/crm/types/category"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const category = {
  all: (params: Partial<CategoryQueryOptions>) =>
    httpClient.get<CategoryPaginator>(ApiEndpoint.crm.categories, params),
  get: (id: string) =>
    httpClient.get<CategoryList>(`${ApiEndpoint.crm.categories}/${id}`),
  create: (input: CategoryList) =>
    httpClient.post<CategoryList>(ApiEndpoint.crm.categories, input),
  update: (id: string, input: CategoryList) =>
    httpClient.patch<CategoryList>(
      `${ApiEndpoint.crm.categories}/${id}`,
      input
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.categories}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteCategory, ids)
  },
}
