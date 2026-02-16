import {
  Warehouse,
  WarehouseInput,
  WarehousePaginator,
  WarehouseQueryOptions,
} from "@/modules/scm/types/inventory/warehouse/warehouse-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const WarehouseService = {
  all: (params: Partial<WarehouseQueryOptions>) =>
    HttpClient.get<WarehousePaginator>(ApiEndpoint.scm.getAllWarehouse, params),
  getDropdown: (params: Partial<any>) =>
    HttpClient.get<Warehouse[]>(ApiEndpoint.scm.getWarehouseDropdown, {
      params,
    }),
  get: (id: number) =>
    HttpClient.get<Warehouse>(ApiEndpoint.scm.getWarehouseById(id)),
  create: (input: WarehouseInput) =>
    HttpClient.post<WarehouseInput>(ApiEndpoint.scm.createWarehouse, input),
  update: (input: WarehouseInput) =>
    HttpClient.put<WarehouseInput>(ApiEndpoint.scm.updateWarehouse, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteWarehouse(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteWarehouse, ids)
  },
  search: (params: Partial<WarehouseQueryOptions> & { searchTerm: string }) =>
    HttpClient.get<WarehousePaginator>(ApiEndpoint.scm.getAllWarehouse, {
      params,
    }),
}
