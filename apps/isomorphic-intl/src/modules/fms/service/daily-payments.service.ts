import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import {
  DailyPaymentsPaginator,
  DailyPaymentsQueryOptions,
} from "../types/daily-payments"

export const dailyPaymentsService = {
  all: (params: Partial<DailyPaymentsQueryOptions>) => {
    return HttpClient.get<DailyPaymentsPaginator>(
      ApiEndpoint.fms.dailyPayments,
      params,
      ApiBase.FMS
    )
  },
}
