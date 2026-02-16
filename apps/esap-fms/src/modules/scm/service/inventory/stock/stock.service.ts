import { Stock, StockAdjustment, StockPaginator, StockQueryOptions } from "@/modules/scm/types/inventory/stock-overview/stock-overview-types";
import { ApiEndpoint } from "@/server/client";
import HttpClient from "@/utils/axios";





export const StockService = {
  all: (params: Partial<StockQueryOptions>) =>
    HttpClient.get<StockPaginator>(ApiEndpoint.scm.getAllInventory, params),
  get: (id: number) =>
    HttpClient.get<Stock>(ApiEndpoint.scm.getInventoryById(id)),
  getDropdown: () =>
    HttpClient.get<Stock[]>(ApiEndpoint.scm.getInventoryDropdown),
  create: (input: Stock) =>
    HttpClient.post<Stock>(ApiEndpoint.scm.createInventory, input),
  update: (input: Stock) =>
    HttpClient.put<Stock>(ApiEndpoint.scm.updateInventory, input),
  patch: (input: StockAdjustment[]) =>
    HttpClient.patch<StockAdjustment[]>(
      ApiEndpoint.scm.patchInventoryReceived,
      input
    ),
  updateStock: (input: StockAdjustment) =>
    HttpClient.patch<StockAdjustment>(
      ApiEndpoint.scm.patchInventoryUpdate,
      input
    ),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deleteInventory(id)),

  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteInventory, ids)
  },
  search: (params: Partial<StockQueryOptions> & { searchTerm: string }) =>
    HttpClient.get<StockPaginator>(ApiEndpoint.scm.getAllInventory, {
      params,
    }),
}