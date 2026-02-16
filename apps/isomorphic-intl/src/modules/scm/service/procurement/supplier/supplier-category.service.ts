import {
  SupplierCategory,
  SupplierCategoryPaginator,
  SupplierCategoryQueryOptions,
} from "@/modules/scm/types/procurement/supplier/supplier-category-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SupplierCategoryService = {
  all: (params: Partial<SupplierCategoryQueryOptions>) =>
    HttpClient.get<SupplierCategoryPaginator>(
      ApiEndpoint.scm.getAllSupplierCategory,
      params
    ),
  create: (input: SupplierCategory) =>
    HttpClient.post<SupplierCategory>(
      ApiEndpoint.scm.createSupplierCategory,
      input
    ),
  get: (id: number) =>
    HttpClient.get<SupplierCategory>(
      ApiEndpoint.scm.getSupplierCategoryById(id)
    ),
  update: (input: SupplierCategory) =>
    HttpClient.put<SupplierCategory>(
      ApiEndpoint.scm.updateSupplierCategory,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteSupplierCategory(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteSupplierCategory,
      ids
    )
  },
}
