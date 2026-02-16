import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import {
  CreatePaymentRequest,
  PaymentRequestList,
  PaymentRequestPaginator,
  PaymentRequestQueryOptions,
} from "../types"

export const PaymentRequestService = {
  all: (params: Partial<PaymentRequestQueryOptions>) => {
    return HttpClient.get<PaymentRequestPaginator>(
      ApiEndpoint.fms.paymentRequest,
      params,
      EndpointType.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<PaymentRequestList>(
      ApiEndpoint.fms.paymentRequestById(id),
      undefined,
      EndpointType.FMS
    ),
  create: (input: CreatePaymentRequest) =>
    HttpClient.post<PaymentRequestList>(
      ApiEndpoint.fms.createPaymentRequest,
      input,
      false,
      EndpointType.FMS
    ),
  update: (input: CreatePaymentRequest) =>
    HttpClient.put<PaymentRequestList>(
      ApiEndpoint.fms.updatePaymentRequest,
      input,
      false,
      EndpointType.FMS
    ),
  updateStatus: (input: { id: number; status: string }) =>
    HttpClient.patch<PaymentRequestList>(
      ApiEndpoint.fms.updatePaymentRequestStatus,
      { id: input.id, status: input.status },
      false,
      EndpointType.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<PaymentRequestList>(
      ApiEndpoint.fms.deletePaymentRequest(id),
      EndpointType.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<PaymentRequestList>(
      ApiEndpoint.fms.bulkPaymentRequest,
      ids,
      EndpointType.FMS
    ),
}
