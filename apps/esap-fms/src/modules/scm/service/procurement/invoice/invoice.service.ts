import { Invoice, InvoiceInput, InvoicePaginator, InvoiceQueryOptions, InvoiceUpdate, InvoiceUpdatePaymentStatus } from "@/modules/scm/types/procurement/invoice/invoice-types";
import { ApiEndpoint } from "@/server/client";
import HttpClient from "@/utils/axios";





export const InvoiceService = {
  all: (params: Partial<InvoiceQueryOptions>) =>
    HttpClient.get<InvoicePaginator>(ApiEndpoint.scm.getAllInvoice, params),
  get: (id: number) =>
    HttpClient.get<Invoice>(ApiEndpoint.scm.getInvoiceById(id)),
  create: (input: InvoiceInput) =>
    HttpClient.post<InvoiceInput>(ApiEndpoint.scm.createInvoice, input),
  update: (input: InvoiceUpdate) =>
    HttpClient.put<InvoiceUpdate>(ApiEndpoint.scm.updateInvoice, input),
  patch: (input: number) =>
    HttpClient.patch<number>(
      ApiEndpoint.scm.updatePaymentStatus,
      input
    ),
  delete: (id: number) => HttpClient.delete(ApiEndpoint.scm.deleteInvoice(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeleteInvoice, ids)
  },
}