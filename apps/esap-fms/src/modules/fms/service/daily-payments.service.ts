import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"
import { DailyPaymentsPaginator, DailyPaymentsQueryOptions } from "../types/daily-payments"

export const dailyPaymentsService = {
  all: (params: Partial<DailyPaymentsQueryOptions>) => {
    return HttpClient.get<DailyPaymentsPaginator>(
      ApiEndpoint.fms.dailyPayments,
      params,
      EndpointType.FMS
    )
  },
}
