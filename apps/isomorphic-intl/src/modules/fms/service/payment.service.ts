import { ApiEndpoint } from "@/server/client"
import { ApiEndpoint as ApiRoutes } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { PaymentList, PaymentPaginator, PaymentQueryOptions } from "../types"

export const PaymentService = {
  all: (params: Partial<PaymentQueryOptions>) => {
    return HttpClient.get<PaymentPaginator>(
      ApiRoutes.fms.payment,
      params,
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<PaymentList>(
      ApiRoutes.fms.paymentById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: PaymentList) =>
    HttpClient.post<PaymentList>(
      ApiEndpoint.fms.createPayment,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: PaymentList) =>
    HttpClient.put<PaymentList>(
      ApiEndpoint.fms.updatePayment,
      input,
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<PaymentList>(
      ApiEndpoint.fms.deletePayment(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<PaymentList>(
      ApiEndpoint.fms.bulkPayment,
      ids,
      ApiBase.FMS
    ),
}
