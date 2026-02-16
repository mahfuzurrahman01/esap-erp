import {
  Supplier,
  SupplierCreateInput,
  SupplierPaginator,
  SupplierQueryOptions,
  SupplierUpdateInput,
} from "@/modules/scm/types/procurement/supplier/supplier-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const SupplierService = {
  all: (params?: Partial<SupplierQueryOptions>) => {
    return HttpClient.get<SupplierPaginator>(
      ApiEndpoint.scm.getAllSupplier,
      params
    )
  },
  dropdown: () =>
    HttpClient.get<Supplier[]>(ApiEndpoint.scm.getSupplierDropdown),
  get: (id: number) =>
    HttpClient.get<Supplier>(ApiEndpoint.scm.getSupplierById(id)),
  create: (input: SupplierCreateInput) =>
    HttpClient.post<SupplierCreateInput>(
      ApiEndpoint.scm.createSupplier,
      input,
      true
    ),
  update: (input: SupplierUpdateInput) =>
    HttpClient.put<SupplierUpdateInput>(
      ApiEndpoint.scm.updateSupplier,
      input,
      true
    ),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteSupplier(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteSupplier, ids)
  },
  search: (params: {
    pageIndex: number
    pageSize: number
    searchTerm: string
  }) =>
    HttpClient.get<SupplierPaginator>(ApiEndpoint.scm.searchSupplier(params), {
      params,
    }),
}
