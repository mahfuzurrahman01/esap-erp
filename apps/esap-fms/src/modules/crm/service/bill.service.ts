import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import { Bill, BillList, BillPaginator, BillQueryOptions } from "../types/bill"

export const bill = {
  all: (params: Partial<BillQueryOptions>) =>
    httpClient.get<BillPaginator>(ApiEndpoint.crm.bills, params),
  get: (id: string) =>
    httpClient.get<BillList>(`${ApiEndpoint.crm.bills}/${id}`),
  create: (input: Bill) => {
    return httpClient.post<Bill>(ApiEndpoint.crm.bills, input, true)
  },
  update: (id: string, input: BillList) =>
    httpClient.put<BillList>(`${ApiEndpoint.crm.bills}/${id}`, input, true),
  delete: (id: string) => httpClient.delete(`${ApiEndpoint.crm.bills}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteBills, ids)
  },
}
