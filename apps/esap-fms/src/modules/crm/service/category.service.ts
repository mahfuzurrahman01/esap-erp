import {
  CategoryList,
  CategoryPaginator,
  CategoryQueryOptions,
} from "@/modules/crm/types/category"
import { ApiEndpoint } from "@/server/client"
import httpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

export const category = {
  all: (params: Partial<CategoryQueryOptions>) =>
    httpClient.get<CategoryPaginator>(
      ApiEndpoint.crm.categories,
      params,
      EndpointType.DEFAULT
    ),
  get: (id: string) =>
    httpClient.get<CategoryList>(
      `${ApiEndpoint.crm.categories}/${id}`,
      undefined,
      EndpointType.DEFAULT
    ),
  create: (input: CategoryList) =>
    httpClient.post<CategoryList>(
      ApiEndpoint.crm.categories,
      input,
      false,
      EndpointType.DEFAULT
    ),
  update: (id: string, input: CategoryList) =>
    httpClient.patch<CategoryList>(
      `${ApiEndpoint.crm.categories}/${id}`,
      input,
      false,
      EndpointType.DEFAULT
    ),
  delete: (id: string) =>
    httpClient.delete(
      `${ApiEndpoint.crm.categories}/${id}`,
      EndpointType.DEFAULT
    ),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(
      ApiEndpoint.crm.bulkDeleteCategory,
      ids,
      EndpointType.DEFAULT
    )
  },
}
