import {
  Quotation,
  QuotationList,
  QuotationPaginator,
  QuotationQueryOptions,
} from "@/modules/crm/types/quotation"
import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

export const quotation = {
  all: (params: Partial<QuotationQueryOptions>) =>
    httpClient.get<QuotationPaginator>(ApiEndpoint.crm.quotation, params),
  get: (id: string) =>
    httpClient.get<QuotationList>(`${ApiEndpoint.crm.quotation}/${id}`),
  create: (input: Quotation) =>
    httpClient.post<Quotation>(ApiEndpoint.crm.quotation, input, true),
  update: (id: string, input: QuotationList) =>
    httpClient.patch<QuotationList>(
      `${ApiEndpoint.crm.quotation}/${id}`,
      input,
      true
    ),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.quotation}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteQuotation, ids)
  },
}
