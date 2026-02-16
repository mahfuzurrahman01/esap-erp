import {
  StockReplenishment,
  StockReplenishmentPaginator,
  StockReplenishmentQueryOptions,
} from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const StockReplenishmentService = {
  all: (params: Partial<StockReplenishmentQueryOptions>) =>
    HttpClient.get<StockReplenishmentPaginator>(
      ApiEndpoint.scm.getAllStockReplenishment,
      params
    ),
  get: (id: number) =>
    HttpClient.get<StockReplenishment>(
      ApiEndpoint.scm.getStockReplenishmentById(id)
    ),
  create: (input: StockReplenishment) =>
    HttpClient.post<StockReplenishment>(
      ApiEndpoint.scm.createStockReplenishment,
      input
    ),
  update: (input: StockReplenishment) =>
    HttpClient.put<StockReplenishment>(
      ApiEndpoint.scm.updateStockReplenishment,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteStockReplenishment(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteStockReplenishment,
      ids
    )
  },
  search: (
    params: Partial<StockReplenishmentQueryOptions> & { searchTerm: string }
  ) =>
    HttpClient.get<StockReplenishmentPaginator>(
      ApiEndpoint.scm.getAllStockReplenishment,
      {
        params,
      }
    ),
}
