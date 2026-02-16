import {
  PaymentMethod,
  PaymentMethodPaginator,
  PaymentMethodQueryOptions,
} from "@/modules/scm/types/procurement/supplier/payment-method-types"
import { ApiEndpoint } from "@/server/client"
import HttpClient from "@/utils/axios"

export const PaymentMethodService = {
  all: (params: Partial<PaymentMethodQueryOptions>) =>
    HttpClient.get<PaymentMethodPaginator>(
      ApiEndpoint.scm.getAllPaymentMethod,
      params
    ),
  get: (id: number) =>
    HttpClient.get<PaymentMethod>(ApiEndpoint.scm.getPaymentMethodById(id)),
  create: (input: PaymentMethod) =>
    HttpClient.post<PaymentMethod>(ApiEndpoint.scm.createPaymentMethod, input),
  update: (input: PaymentMethod) =>
    HttpClient.put<PaymentMethod>(ApiEndpoint.scm.updatePaymentMethod, input),
  delete: (id: number) =>
    HttpClient.delete(ApiEndpoint.scm.deletePaymentMethod(id)),
  bulkDelete: (ids: number[]): Promise<void> => {
    return HttpClient.bulkDelete(ApiEndpoint.scm.bulkDeletePaymentMethod, ids)
  },
}
