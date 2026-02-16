import {
  StockTransferApproval,
  StockTransferApprovalPaginator,
  StockTransferApprovalQueryOptions,
} from "@/modules/scm/types/inventory/stock-transfer/stock-transfer-approval"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const StockTransferApprovalService = {
  all: (params: Partial<StockTransferApprovalQueryOptions>) =>
    HttpClient.get<StockTransferApprovalPaginator>(
      ApiEndpoint.scm.getAllStockTransferApproval,
      params
    ),
  get: (id: number) =>
    HttpClient.get<StockTransferApproval>(
      ApiEndpoint.scm.getStockTransferApprovalById(id)
    ),
  create: (input: StockTransferApproval) =>
    HttpClient.post<StockTransferApproval>(
      ApiEndpoint.scm.createStockTransferApproval,
      input
    ),
  update: (input: StockTransferApproval) =>
    HttpClient.put<StockTransferApproval>(
      ApiEndpoint.scm.updateStockTransferApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteStockTransferApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteStockTransferApproval,
      ids
    )
  },
  search: (
    params: Partial<StockTransferApprovalQueryOptions> & { searchTerm: string }
  ) =>
    HttpClient.get<StockTransferApprovalPaginator>(
      ApiEndpoint.scm.getAllStockTransferApproval,
      {
        params,
      }
    ),
}
