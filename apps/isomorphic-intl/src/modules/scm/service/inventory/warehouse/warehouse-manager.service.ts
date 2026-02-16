import {
  WarehouseManager,
  WarehouseManagerInput,
  WarehouseManagerPaginator,
  WarehouseManagerQueryOptions,
} from "@/modules/scm/types/inventory/warehouse/warehouse-manager-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const WarehouseManagerService = {
  all: (params: Partial<WarehouseManagerQueryOptions>) =>
    HttpClient.get<WarehouseManagerPaginator>(
      ApiEndpoint.scm.getAllWarehouseManager,
      params
    ),
  get: (id: number) =>
    HttpClient.get<WarehouseManager>(
      ApiEndpoint.scm.getWarehouseManagerById(id)
    ),
  create: (input: WarehouseManagerInput) =>
    HttpClient.post<WarehouseManager>(
      ApiEndpoint.scm.createWarehouseManager,
      input
    ),
  update: (input: WarehouseManagerInput) =>
    HttpClient.put<WarehouseManager>(
      ApiEndpoint.scm.updateWarehouseManager,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteWarehouseManager(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteWarehouseManager,
      ids
    )
  },
  search: (
    params: Partial<WarehouseManagerQueryOptions> & { searchTerm: string }
  ) =>
    HttpClient.get<WarehouseManagerPaginator>(
      ApiEndpoint.scm.getAllWarehouseManager,
      {
        params,
      }
    ),
  // export: (params: Partial<SupplierQueryOptions>) =>
  //   HttpClient.get(ApiEndpoint.scm.getAllSupplier, {
  //     params,
  //     responseType: "blob",
  //   }),
}
