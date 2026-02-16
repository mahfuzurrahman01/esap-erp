import {
  ProductList,
  ProductPaginator,
  ProductQueryOptions,
} from "@/modules/crm/types/product"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const product = {
  all: (params: Partial<ProductQueryOptions>) =>
    httpClient.get<ProductPaginator>(ApiEndpoint.crm.products, params),
  get: (id: string) =>
    httpClient.get<ProductList>(`${ApiEndpoint.crm.products}/${id}`),
  create: (input: ProductList) =>
    httpClient.post<ProductList>(ApiEndpoint.crm.products, input, true),
  update: (id: string, input: ProductList) =>
    httpClient.patch<ProductList>(
      `${ApiEndpoint.crm.products}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.products}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteProduct, ids)
  },
}
