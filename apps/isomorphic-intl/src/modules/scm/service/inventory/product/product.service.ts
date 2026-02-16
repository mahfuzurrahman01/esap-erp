import {
  Product,
  ProductPaginator,
  ProductQueryOptions,
} from "@/modules/scm/types/inventory/products/products-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ProductService = {
  all: (params: Partial<ProductQueryOptions>) =>
    HttpClient.get<ProductPaginator>(ApiEndpoint.scm.getAllProduct, params),
  get: (id: number) =>
    HttpClient.get<Product>(ApiEndpoint.scm.getProductById(id)),
  getDropdown: () =>
    HttpClient.get<Product[]>(ApiEndpoint.scm.getProductDropdown),
  create: (input: Product) =>
    HttpClient.post<Product>(ApiEndpoint.scm.createProduct, input, true),
  update: (input: Product) =>
    HttpClient.put<Product>(ApiEndpoint.scm.updateProduct, input, true),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteProduct(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteProduct, ids)
  },
  search: (params: Partial<ProductQueryOptions> & { searchTerm: string }) =>
    HttpClient.get<ProductPaginator>(ApiEndpoint.scm.getAllProduct, {
      params,
    }),
}
