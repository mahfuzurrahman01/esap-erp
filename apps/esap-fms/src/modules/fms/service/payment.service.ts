import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { PaymentList, PaymentPaginator, PaymentQueryOptions } from "../types"

export const PaymentService = {
  all: (params: Partial<PaymentQueryOptions>) => {
    return HttpClient.get<PaymentPaginator>(
      ApiEndpoint.fms.payment,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<PaymentList>(
      ApiEndpoint.fms.paymentById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: PaymentList) =>
    HttpClient.post<PaymentList>(
      ApiEndpoint.fms.createPayment,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: PaymentList) =>
    HttpClient.put<PaymentList>(
      ApiEndpoint.fms.updatePayment,
      input,
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<PaymentList>(
      ApiEndpoint.fms.deletePayment(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<PaymentList>(
      ApiEndpoint.fms.bulkPayment,
      ids,
      EndpointType.FMS
    ),
}
