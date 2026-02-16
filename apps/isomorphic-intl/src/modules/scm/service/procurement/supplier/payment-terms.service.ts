import {
  PaymentTerms,
  PaymentTermsPaginator,
  PaymentTermsQueryOptions,
} from "@/modules/scm/types/procurement/supplier/payment-terms-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const PaymentTermsService = {
  all: (params: Partial<PaymentTermsQueryOptions>) =>
    HttpClient.get<PaymentTermsPaginator>(
      ApiEndpoint.scm.getAllPaymentTerms,
      params
    ),
  get: (id: number) =>
    HttpClient.get<PaymentTerms>(ApiEndpoint.scm.getPaymentTermsById(id)),
  create: (input: PaymentTerms) =>
    HttpClient.post<PaymentTerms>(ApiEndpoint.scm.createPaymentTerms, input),
  update: (input: PaymentTerms) =>
    HttpClient.put<PaymentTerms>(ApiEndpoint.scm.updatePaymentTerms, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deletePaymentTerms(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeletePaymentTerms, ids)
  },
}
