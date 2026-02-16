import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as EndpointType } from "@/utils/axios"

import { TrialBalanceQueryOptions, TrialBalanceResponse } from "../types"

export const TrialBalanceService = {
  all: (params: Partial<TrialBalanceQueryOptions>) => {
    return HttpClient.get<TrialBalanceResponse>(
      ApiEndpoint.fms.trialBalance,
      params,
      EndpointType.FMS
    )
  },
}
