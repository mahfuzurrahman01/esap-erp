import {
  ProductCategory,
  ProductCategoryPaginator,
  ProductCategoryQueryOptions,
} from "@/modules/scm/types/inventory/products/product-category-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const ProductCategoryService = {
  all: (params: Partial<ProductCategoryQueryOptions>) =>
    HttpClient.get<ProductCategoryPaginator>(
      ApiEndpoint.scm.getAllProductCategory,
      params
    ),
  get: (id: number) =>
    HttpClient.get<ProductCategory>(ApiEndpoint.scm.getProductCategoryById(id)),
  create: (input: ProductCategory) =>
    HttpClient.post<ProductCategory>(
      ApiEndpoint.scm.createProductCategory,
      input
    ),
  update: (input: ProductCategory) =>
    HttpClient.put<ProductCategory>(
      ApiEndpoint.scm.updateProductCategory,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteProductCategory(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteProductCategory, ids)
  },
}
