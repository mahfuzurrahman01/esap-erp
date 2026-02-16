import {
  StockList,
  StockPaginator,
  StockQueryOptions,
} from "@/modules/crm/types/stock"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const stock = {
  all: (params: Partial<StockQueryOptions>) =>
    httpClient.get<StockPaginator>(ApiEndpoint.crm.stocks, params),
  get: (id: string) =>
    httpClient.get<StockList>(`${ApiEndpoint.crm.stocks}/${id}`),
  create: (input: StockList) =>
    httpClient.post<StockList>(ApiEndpoint.crm.stocks, input),
  update: (id: string, input: StockList) =>
    httpClient.patch<StockList>(`${ApiEndpoint.crm.stocks}/${id}`, input),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.stocks}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteStock, ids)
  },
}
