import { ApiEndpoint } from "@/server/client"
import HttpClient, { ApiEndpoint as ApiBase } from "@/utils/axios"

import { ProfitAndLossQueryOptions, ProfitAndLossResponse } from "../types"

export const ProfitAndLossService = {
  all: (params: Partial<ProfitAndLossQueryOptions>) => {
    return HttpClient.get<ProfitAndLossResponse>(
      ApiEndpoint.fms.profitAndLoss,
      params,
      ApiBase.FMS
    )
  },
}
