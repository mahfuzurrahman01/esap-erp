import {
  StockReplanishmentApproval,
  StockReplanishmentApprovalPaginator,
  StockReplanishmentApprovalQueryOptions,
} from "@/modules/scm/types/inventory/stock-replanishment/stock-replanishment-approval-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const StockReplanishmentApprovalService = {
  all: (params?: Partial<StockReplanishmentApprovalQueryOptions>) => {
    return HttpClient.get<StockReplanishmentApprovalPaginator>(
      ApiEndpoint.scm.getAllStockReplenishmentApproval,
      params
    )
  },
  get: (id: number) =>
    HttpClient.get<StockReplanishmentApproval>(
      ApiEndpoint.scm.getStockReplenishmentApprovalById(id)
    ),
  create: (input: StockReplanishmentApproval) =>
    HttpClient.post<StockReplanishmentApproval>(
      ApiEndpoint.scm.createStockReplenishmentApproval,
      input
    ),
  update: (input: StockReplanishmentApproval) =>
    HttpClient.put<StockReplanishmentApproval>(
      ApiEndpoint.scm.updateStockReplenishmentApproval,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteStockReplenishmentApproval(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(
      ApiEndpoint.scm.bulkDeleteStockReplenishmentApproval,
      ids
    )
  },
}
