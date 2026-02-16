import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"
import { PaymentSummaryPaginator, PaymentSummaryQueryOptions } from "../types/payment-summary"

export const paymentSummaryService = {
  all: (params: Partial<PaymentSummaryQueryOptions>) => {
    return HttpClient.get<PaymentSummaryPaginator>(
      ApiEndpoint.fms.paymentSummary,
      params,
      EndpointType.FMS
    )
  },
}
