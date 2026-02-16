import {
  StockTransfer,
  StockTransferPaginator,
  StockTransferQueryOptions,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const StockTransferService = {
  all: (params: Partial<StockTransferQueryOptions>) =>
    HttpClient.get<StockTransferPaginator>(
      ApiEndpoint.scm.getAllStockTransfer,
      params
    ),
  get: (id: number) =>
    HttpClient.get<StockTransfer>(ApiEndpoint.scm.getStockTransferById(id)),
  getDropdown: () =>
    HttpClient.get<StockTransfer[]>(ApiEndpoint.scm.getStockTransferDropdown),
  create: (input: StockTransfer) =>
    HttpClient.post<StockTransfer>(ApiEndpoint.scm.createStockTransfer, input),
  update: (input: StockTransfer) =>
    HttpClient.put<StockTransfer>(ApiEndpoint.scm.updateStockTransfer, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteStockTransfer(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteStockTransfer, ids)
  },
  search: (
    params: Partial<StockTransferQueryOptions> & { searchTerm: string }
  ) =>
    HttpClient.get<StockTransferPaginator>(
      ApiEndpoint.scm.getAllStockTransfer,
      {
        params,
      }
    ),
}
