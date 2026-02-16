import {
  SalesOrder,
  SalesOrderList,
  SalesOrderPaginator,
  SalesOrderQueryOptions,
} from "@/modules/crm/types/sales-order"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const salesOrder = {
  all: (params: Partial<SalesOrderQueryOptions>) =>
    httpClient.get<SalesOrderPaginator>(ApiEndpoint.crm.salesOrder, params),
  get: (id: string) =>
    httpClient.get<SalesOrderList>(`${ApiEndpoint.crm.salesOrder}/${id}`),
  create: (input: SalesOrder) =>
    httpClient.post<SalesOrder>(ApiEndpoint.crm.salesOrder, input, true),
  update: (id: string, input: SalesOrderList) =>
    httpClient.patch<SalesOrderList>(
      `${ApiEndpoint.crm.salesOrder}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.salesOrder}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteSalesOrder, ids)
  },
}
