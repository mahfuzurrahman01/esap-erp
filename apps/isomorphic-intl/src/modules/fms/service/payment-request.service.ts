import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

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
      ApiBase.FMS
    )
  },
  get: (id: number) =>
    HttpClient.get<PaymentRequestList>(
      ApiEndpoint.fms.paymentRequestById(id),
      undefined,
      ApiBase.FMS
    ),
  create: (input: CreatePaymentRequest) =>
    HttpClient.post<PaymentRequestList>(
      ApiEndpoint.fms.createPaymentRequest,
      input,
      false,
      ApiBase.FMS
    ),
  update: (input: CreatePaymentRequest) =>
    HttpClient.put<PaymentRequestList>(
      ApiEndpoint.fms.updatePaymentRequest,
      input,
      false,
      ApiBase.FMS
    ),
  updateStatus: (input: { id: number; status: string }) =>
    HttpClient.patch<PaymentRequestList>(
      ApiEndpoint.fms.updatePaymentRequestStatus,
      { id: input.id, status: input.status },
      false,
      ApiBase.FMS
    ),
  delete: (id: number) =>
    HttpClient.delete<PaymentRequestList>(
      ApiEndpoint.fms.deletePaymentRequest(id),
      ApiBase.FMS
    ),
  bulk: (ids: number[]) =>
    HttpClient.bulkDelete<PaymentRequestList>(
      ApiEndpoint.fms.bulkPaymentRequest,
      ids,
      ApiBase.FMS
    ),
}
