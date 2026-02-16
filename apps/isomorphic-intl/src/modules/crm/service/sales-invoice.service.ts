import { ApiEndpoint } from "@/server/client"
import httpClient from "@/utils/axios"

import {
  SalesInvoice,
  SalesInvoicePaginator,
  SalesInvoiceQueryOptions,
} from "../types/sales-invoice"

export const salesInvoice = {
  all: (params: Partial<SalesInvoiceQueryOptions>) =>
    httpClient.get<SalesInvoicePaginator>(ApiEndpoint.crm.invoices, params),
  get: (id: string) =>
    httpClient.get<SalesInvoice>(`${ApiEndpoint.crm.invoices}/${id}`),
  create: (input: SalesInvoice) =>
    httpClient.post<SalesInvoice>(ApiEndpoint.crm.invoices, input, true),
  update: (id: string, input: SalesInvoice) =>
    httpClient.put<SalesInvoice>(
      `${ApiEndpoint.crm.invoices}/${id}`,
      input,
      true
    ),
  updateStatus: (input: { id: string; status: string }) =>
      httpClient.patch(`${ApiEndpoint.crm.invoiceStatusUpdate}/${input.id}`, input.status),
  delete: (id: string) =>
    httpClient.delete(`${ApiEndpoint.crm.invoices}/${id}`),
  bulkDelete: (ids: number[]): Promise<void> => {
    return httpClient.bulkDelete(ApiEndpoint.crm.bulkDeleteInvoices, ids)
  },
}
