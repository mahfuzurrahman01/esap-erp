import {
  Customer,
  CustomerList,
  CustomerPaginator,
  CustomerQueryOptions,
} from "@/modules/crm/types/customer"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const customer = {
  all: (params: Partial<CustomerQueryOptions>) =>
    httpClient.get<CustomerPaginator>(ApiEndpoint.crm.customers, params),
  get: (id: string) =>
    httpClient.get<CustomerList>(`${ApiEndpoint.crm.customers}/${id}`),
  create: (input: Customer) => {
    return httpClient.post<Customer>(ApiEndpoint.crm.customers, input, true)
  },
  update: (id: string, input: CustomerList) =>
    httpClient.put<CustomerList>(
      `${ApiEndpoint.crm.customers}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.customers}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteCustomer, ids)
  },
}
